import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

// BASE_URL keeps the paths correct locally and on the GitHub Pages custom root
// domain. The dedicated idle avatar is preferred; the original static avatar is
// loaded automatically if the animated file is missing or broken.
const PREFERRED_MODEL_URL = `${import.meta.env.BASE_URL}models/zenan-avatar-idle.glb`;
const FALLBACK_MODEL_URL = `${import.meta.env.BASE_URL}models/zenan-avatar.glb`;
const MODEL_BASE_URL = `${import.meta.env.BASE_URL}models/`;

type AnimationId =
  | 'idle'
  | 'watch'
  | 'dance'
  | 'dance2'
  | 'backflip'
  | 'fighting'
  | 'kungfu'
  | 'sideflip'
  | 'landing';

type TrackingMode = 'idle' | 'off';

type AnimationOption = {
  id: AnimationId;
  label: string;
  file?: string;
  tracking: TrackingMode;
  subclip?: {
    name: string;
    startFrame: number;
    endFrame: number;
    fps: number;
  };
};

const ANIMATION_OPTIONS: AnimationOption[] = [
  { id: 'idle', label: 'Idle', tracking: 'idle' },
  {
    id: 'watch',
    label: 'Watch',
    file: 'zenan-avatar-looking-at-watch.glb',
    tracking: 'off',
    subclip: { name: 'Watch', startFrame: 0, endFrame: 345, fps: 30 },
  },
  { id: 'dance', label: 'Dance', file: 'zenan-avatar-dance.glb', tracking: 'off' },
  { id: 'dance2', label: 'Dance 2', file: 'zenan-avatar-dance-2.glb', tracking: 'off' },
  { id: 'backflip', label: 'Backflip', file: 'zenan-avatar-backflip.glb', tracking: 'off' },
  { id: 'fighting', label: 'Fighting', file: 'zenan-avatar-fighting.glb', tracking: 'off' },
  { id: 'kungfu', label: 'Kungfu', file: 'zenan-avatar-kungfu-pose.glb', tracking: 'off' },
  { id: 'sideflip', label: 'Side Flip', file: 'zenan-avatar-side-flip.glb', tracking: 'off' },
  {
    id: 'landing',
    label: 'Landing',
    file: 'zenan-avatar-superman-landing.glb',
    tracking: 'off',
  },
];

const ANIMATION_BY_ID = Object.fromEntries(
  ANIMATION_OPTIONS.map((option) => [option.id, option]),
) as Record<AnimationId, AnimationOption>;

const RANDOM_ANIMATION_IDS: Exclude<AnimationId, 'idle'>[] = [
  'watch',
  'dance',
  'dance2',
  'backflip',
  'fighting',
  'kungfu',
  'sideflip',
  'landing',
];

type AnimationRequest = {
  id: AnimationId;
  nonce: number;
};

type PlaybackState = {
  activeId: AnimationId;
  busyId: AnimationId | null;
};

const INITIAL_ANIMATION_REQUEST: AnimationRequest = { id: 'idle', nonce: 0 };
const INITIAL_PLAYBACK_STATE: PlaybackState = { activeId: 'idle', busyId: null };
const AUTO_ANIMATION_DELAY_MS = 30_000;

/* Motion tuning — angles in radians, distances in model units (meters) */
const HEAD_YAW = 0.24;
const HEAD_PITCH = 0.1;
const BODY_YAW = 0.04;
const BODY_YAW_FALLBACK = 0.28; // used only if the rig has no head/neck bone
const BODY_PITCH_FALLBACK = 0.1;
const AVATAR_X_OFFSET = -0.18;
const MODEL_ROOT_YAW_OFFSET = THREE.MathUtils.degToRad(12);
const FLOAT_AMPLITUDE = 0.03;
const FLOAT_SPEED = 1.1;
const HEAD_DAMPING = 5.5;
const BODY_DAMPING = 3;
// The model is normalized to MODEL_HEIGHT, then shifted down so the point at
// LOOK_HEIGHT (upper chest) sits at the world origin. R3F aims the default
// camera at the origin, so this guarantees a head-and-torso framing
// regardless of how the GLB was exported.
const MODEL_HEIGHT = 1.85;
const LOOK_HEIGHT = 1.46;

/** First bone whose name matches, e.g. /head$/i finds "Head" and "mixamorigHead". */
function findBone(scene: THREE.Object3D, suffix: RegExp): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  scene.traverse((obj) => {
    if (!found && (obj as THREE.Bone).isBone && suffix.test(obj.name)) found = obj;
  });
  return found;
}

/** Rotate `bone` so its direction toward `child` matches `targetDir` (world space). */
function aimBone(bone: THREE.Object3D, child: THREE.Object3D, targetDir: THREE.Vector3) {
  if (!bone.parent) return;
  const from = child
    .getWorldPosition(new THREE.Vector3())
    .sub(bone.getWorldPosition(new THREE.Vector3()))
    .normalize();
  const swing = new THREE.Quaternion().setFromUnitVectors(from, targetDir);
  const world = swing.multiply(bone.getWorldQuaternion(new THREE.Quaternion()));
  const parentInv = bone.parent.getWorldQuaternion(new THREE.Quaternion()).invert();
  bone.quaternion.copy(parentInv.multiply(world));
}

/** Bring one T-posed arm down to a relaxed pose with a slight elbow bend.
 *  Only matters for static renders (reduced motion, fallback model, no clip):
 *  while an animation clip plays, the mixer owns these bones. */
function relaxArm(scene: THREE.Object3D, upper: string, lower: string, hand: string) {
  const upperBone = findBone(scene, new RegExp(`${upper}$`, 'i'));
  const lowerBone = findBone(scene, new RegExp(`${lower}$`, 'i'));
  const handBone = findBone(scene, new RegExp(`${hand}$`, 'i'));
  if (!upperBone || !lowerBone) return;
  // Which side this arm extends toward, so the pose angles slightly outward.
  const side =
    Math.sign(
      lowerBone.getWorldPosition(new THREE.Vector3()).x -
        upperBone.getWorldPosition(new THREE.Vector3()).x,
    ) || 1;
  aimBone(upperBone, lowerBone, new THREE.Vector3(0.2 * side, -1, 0.06).normalize());
  scene.updateMatrixWorld(true);
  if (handBone) {
    aimBone(lowerBone, handBone, new THREE.Vector3(0.12 * side, -1, 0.24).normalize());
    scene.updateMatrixWorld(true);
  }
}

/** World-space bounds of the posed model (skinned meshes follow their bones). */
function measure(scene: THREE.Object3D): THREE.Box3 {
  const box = new THREE.Box3();
  scene.updateMatrixWorld(true);
  scene.traverse((obj) => {
    if ((obj as THREE.SkinnedMesh).isSkinnedMesh) {
      const mesh = obj as THREE.SkinnedMesh;
      mesh.computeBoundingBox();
      if (mesh.boundingBox) box.union(mesh.boundingBox.clone().applyMatrix4(mesh.matrixWorld));
    }
  });
  return box;
}

/** Rescale and recenter so the model stands MODEL_HEIGHT tall, centered on
 *  x/z, with its LOOK_HEIGHT point at the world origin. */
function normalize(scene: THREE.Object3D) {
  const box = measure(scene);
  const size = box.getSize(new THREE.Vector3());
  if (size.y < 1e-4) return;
  const center = box.getCenter(new THREE.Vector3());
  const s = MODEL_HEIGHT / size.y;
  scene.scale.setScalar(s);
  scene.position.set(-center.x * s, -box.min.y * s - LOOK_HEIGHT, -center.z * s);
  scene.updateMatrixWorld(true);
}

/** Pick the calmest clip. zenan-avatar-animated.glb currently ships exactly
 *  one: "IdleV4.2(maya_head)", an ~8s full-body standing idle. */
function pickIdleClip(names: string[]): string | null {
  if (names.length === 0) return null;
  for (const pattern of [/idle/i, /stand/i, /breath/i, /neutral/i, /default/i]) {
    const match = names.find((name) => pattern.test(name));
    if (match) return match;
  }
  return names[0];
}

// Scratch objects reused every frame to avoid per-frame allocations.
const scratchEuler = new THREE.Euler();
const scratchOffset = new THREE.Quaternion();
const scratchParent = new THREE.Quaternion();
const scratchBase = new THREE.Quaternion();

const animationClipPromises = new Map<AnimationId, Promise<THREE.AnimationClip | null>>();

function keepAvatarFramed(clip: THREE.AnimationClip) {
  for (const track of clip.tracks) {
    if (track.name !== 'Hips.position' || track.ValueTypeName !== 'vector') continue;
    const values = track.values;
    const x = values[0] ?? 0;
    const z = values[2] ?? 0;
    for (let i = 0; i < values.length; i += 3) {
      values[i] = x;
      values[i + 2] = z;
    }
  }
}

function loadAnimationClip(option: AnimationOption) {
  if (!option.file) return Promise.resolve(null);
  const cached = animationClipPromises.get(option.id);
  if (cached) return cached;

  const promise = new GLTFLoader()
    .loadAsync(`${MODEL_BASE_URL}${option.file}`)
    .then((gltf) => {
      const source = gltf.animations[0];
      if (!source) return null;
      const clip = option.subclip
        ? THREE.AnimationUtils.subclip(
            source,
            option.subclip.name,
            option.subclip.startFrame,
            option.subclip.endFrame,
            option.subclip.fps,
          )
        : source.clone();
      clip.name = option.label;
      keepAvatarFramed(clip);
      clip.optimize();
      return clip;
    })
    .catch((error: unknown) => {
      console.warn(
        `Hero avatar: optional "${option.label}" animation unavailable.`,
        error instanceof Error ? error.message : error,
      );
      return null;
    });

  animationClipPromises.set(option.id, promise);
  return promise;
}

function Avatar({
  url,
  animate,
  animationRequest,
  onPlaybackState,
}: {
  url: string;
  animate: boolean;
  animationRequest: AnimationRequest;
  onPlaybackState?: (state: PlaybackState) => void;
}) {
  const { scene, animations } = useGLTF(url);
  const group = useRef<THREE.Group>(null);
  // useAnimations must come before our useFrame below so the mixer writes the
  // animated pose first and the head-tracking offset layers on top of it.
  const { actions, mixer, names } = useAnimations(animations, group);
  // Cursor position normalized to the viewport, in [-1, 1]; y is +1 at the top.
  const cursor = useRef({ x: 0, y: 0 });
  // Smoothed head-look angles; damping these scalars (rather than slerping the
  // bone) lets tracking compose with the playing animation.
  const look = useRef({ yaw: 0, pitch: 0 });
  const lastHandledRequest = useRef(0);
  const currentAction = useRef<THREE.AnimationAction | null>(null);
  const trackingMode = useRef<TrackingMode>('idle');
  const cleanupTimer = useRef<number | null>(null);

  const rig = useMemo(() => {
    // useGLTF caches the scene globally, so pose and capture rest data only once.
    if (!scene.userData.posed) {
      scene.updateMatrixWorld(true);
      relaxArm(scene, 'LeftArm', 'LeftForeArm', 'LeftHand');
      relaxArm(scene, 'RightArm', 'RightForeArm', 'RightHand');
      scene.traverse((obj) => {
        // Bone-driven motion can move the mesh outside its imported bounds.
        if ((obj as THREE.SkinnedMesh).isSkinnedMesh) obj.frustumCulled = false;
      });
      normalize(scene);
      const head = findBone(scene, /head$/i) ?? findBone(scene, /neck$/i);
      if (head?.parent) head.userData.restLocal = head.quaternion.clone();
      scene.userData.posed = true;
    }
    const head = findBone(scene, /head$/i) ?? findBone(scene, /neck$/i);
    if (head?.parent && head.userData.restLocal) {
      return {
        head,
        parent: head.parent,
        restLocal: head.userData.restLocal as THREE.Quaternion,
      };
    }
    return null;
  }, [scene]);

  const clipName = useMemo(() => pickIdleClip(names), [names]);
  // Whether the chosen clip animates the head bone itself — decides what the
  // tracking offset is applied on top of (mixer output vs captured rest pose).
  const clipDrivesHead = useMemo(() => {
    if (!clipName || !rig) return false;
    const clip = animations.find((c) => c.name === clipName);
    return !!clip?.tracks.some((track) => track.name === `${rig.head.name}.quaternion`);
  }, [animations, clipName, rig]);

  useEffect(() => {
    if (import.meta.env.DEV && names.length > 0) {
      console.info(`[HeroAvatar] animation clips in ${url}:`, names, '→ playing:', clipName);
    }
  }, [url, names, clipName]);

  useEffect(() => {
    if (!animate || !clipName) return;
    const action = actions[clipName];
    if (!action) return;
    action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.4).play();
    return () => {
      action.fadeOut(0.3);
    };
  }, [actions, clipName, animate]);

  const clearCleanupTimer = useCallback(() => {
    if (cleanupTimer.current !== null) {
      window.clearTimeout(cleanupTimer.current);
      cleanupTimer.current = null;
    }
  }, []);

  const returnToIdle = useCallback(
    (fadeDuration = 0.45) => {
      const action = currentAction.current;
      if (!action) {
        trackingMode.current = 'idle';
        onPlaybackState?.({ activeId: 'idle', busyId: null });
        return;
      }

      trackingMode.current = 'off';
      clearCleanupTimer();
      const idleAction = clipName ? actions[clipName] : null;
      if (idleAction) {
        idleAction.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(fadeDuration).play();
        action.crossFadeTo(idleAction, fadeDuration, false);
      } else {
        action.fadeOut(Math.min(fadeDuration, 0.25));
      }

      cleanupTimer.current = window.setTimeout(() => {
        action.stop();
        currentAction.current = null;
        trackingMode.current = 'idle';
        cleanupTimer.current = null;
        onPlaybackState?.({ activeId: 'idle', busyId: null });
      }, fadeDuration * 1000 + 80);
    },
    [actions, clearCleanupTimer, clipName, onPlaybackState],
  );

  const playAnimation = useCallback(
    (option: AnimationOption, clip: THREE.AnimationClip) => {
      if (!animate || !group.current || url !== PREFERRED_MODEL_URL) {
        returnToIdle(0.2);
        return;
      }
      if (currentAction.current?.isRunning()) return;

      clearCleanupTimer();
      const idleAction = clipName ? actions[clipName] : null;
      const action = mixer.clipAction(clip, group.current);
      action.reset();
      action.enabled = true;
      action.clampWhenFinished = true;
      action.timeScale = 1;
      action.setLoop(THREE.LoopOnce, 1);
      action.fadeIn(0.35).play();
      if (idleAction) idleAction.crossFadeTo(action, 0.35, false);
      currentAction.current = action;
      trackingMode.current = option.tracking;
      onPlaybackState?.({ activeId: option.id, busyId: option.id });
    },
    [actions, animate, clearCleanupTimer, clipName, mixer, onPlaybackState, returnToIdle, url],
  );

  useEffect(() => {
    const onFinished = (event: { action: THREE.AnimationAction }) => {
      if (event.action === currentAction.current) returnToIdle();
    };
    mixer.addEventListener('finished', onFinished);
    return () => mixer.removeEventListener('finished', onFinished);
  }, [mixer, returnToIdle]);

  useEffect(() => {
    if (animationRequest.nonce <= lastHandledRequest.current) {
      return;
    }
    lastHandledRequest.current = animationRequest.nonce;

    if (!animate || url !== PREFERRED_MODEL_URL) {
      returnToIdle(0.2);
      return;
    }

    const option = ANIMATION_BY_ID[animationRequest.id];
    if (option.id === 'idle') {
      returnToIdle(0.25);
      return;
    }

    let active = true;
    onPlaybackState?.({ activeId: option.id, busyId: option.id });
    loadAnimationClip(option).then((clip) => {
      if (!active) return;
      if (!clip) {
        returnToIdle(0.25);
        return;
      }
      playAnimation(option, clip);
    });

    return () => {
      active = false;
    };
  }, [animate, animationRequest, onPlaybackState, playAnimation, returnToIdle, url]);

  useEffect(() => {
    if (animate) return;
    clearCleanupTimer();
    currentAction.current?.stop();
    currentAction.current = null;
    trackingMode.current = 'idle';
    onPlaybackState?.({ activeId: 'idle', busyId: null });
  }, [animate, clearCleanupTimer, onPlaybackState]);

  useEffect(() => {
    return () => {
      clearCleanupTimer();
      currentAction.current?.stop();
    };
  }, [clearCleanupTimer]);

  useEffect(() => {
    if (!animate) return;
    const onMove = (event: MouseEvent) => {
      cursor.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursor.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    // When the cursor leaves the page, let the avatar settle back to center.
    const onLeave = () => {
      cursor.current.x = 0;
      cursor.current.y = 0;
    };
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [animate]);

  useFrame((state, delta) => {
    if (!animate || !group.current) return;
    const t = state.clock.elapsedTime;
    const { x, y } = cursor.current;

    // Procedural floating idle, only when there is no animation clip.
    if (!clipName) {
      group.current.position.y = Math.sin(t * FLOAT_SPEED) * FLOAT_AMPLITUDE;
    }

    if (trackingMode.current === 'off') {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        0,
        BODY_DAMPING,
        delta,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        0,
        BODY_DAMPING,
        delta,
      );
      look.current.yaw = THREE.MathUtils.damp(look.current.yaw, 0, HEAD_DAMPING, delta);
      look.current.pitch = THREE.MathUtils.damp(look.current.pitch, 0, HEAD_DAMPING, delta);
      return;
    }

    // Subtle whole-body sway toward the cursor (the full look if no head bone).
    const yawRange = rig ? BODY_YAW : BODY_YAW_FALLBACK;
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      x * yawRange,
      BODY_DAMPING,
      delta,
    );
    if (!rig) {
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -y * BODY_PITCH_FALLBACK,
        BODY_DAMPING,
        delta,
      );
      return;
    }

    // Smooth the look angles. The slow sine drift keeps the head alive while
    // the cursor is still, but only when no clip provides that life already.
    const k = 1 - Math.exp(-HEAD_DAMPING * delta);
    const driftYaw = clipDrivesHead ? 0 : Math.sin(t * 0.45) * 0.025;
    const driftPitch = clipDrivesHead ? 0 : Math.cos(t * 0.6) * 0.012;
    look.current.yaw += (x * HEAD_YAW + driftYaw - look.current.yaw) * k;
    look.current.pitch += (-y * HEAD_PITCH + driftPitch - look.current.pitch) * k;

    // Apply the look as a world-space yaw/pitch offset on top of this frame's
    // base pose: the mixer's output if the clip drives the head (it re-writes
    // the bone every frame), else the captured rest pose. Composing this way
    // keeps tracking and animation from fighting each other, and stays
    // correct for any rig orientation.
    scratchBase.copy(clipDrivesHead ? rig.head.quaternion : rig.restLocal);
    const parentQuat = rig.parent.getWorldQuaternion(scratchParent);
    scratchOffset.setFromEuler(scratchEuler.set(look.current.pitch, look.current.yaw, 0, 'YXZ'));
    rig.head.quaternion
      .copy(parentQuat)
      .invert()
      .multiply(scratchOffset)
      .multiply(parentQuat)
      .multiply(scratchBase);
  });

  return (
    <group position={[AVATAR_X_OFFSET, 0, 0]} rotation={[0, MODEL_ROOT_YAW_OFFSET, 0]}>
      <group ref={group}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

/** Renders the preferred (animated) model; if it fails to load, swaps in the
 *  fallback scene. A failure of the fallback itself propagates up to the
 *  boundary in HeroAvatar.tsx, which hides the avatar entirely. */
class ModelFallback extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn(
      'Hero avatar: animated model unavailable, falling back to the static model.',
      error instanceof Error ? error.message : error,
    );
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function AvatarScene({
  url,
  animate,
  animationRequest,
  onPlaybackState,
}: {
  url: string;
  animate: boolean;
  animationRequest: AnimationRequest;
  onPlaybackState?: (state: PlaybackState) => void;
}) {
  return (
    <Canvas
      frameloop={animate ? 'always' : 'demand'}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 2.85], fov: 30, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      {/* Cool key light plus blue rims to match the dark accent theme */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[1.5, 2.5, 2.5]} intensity={2.1} color="#dfe9ff" />
      <directionalLight position={[-2.5, 1.8, -2]} intensity={1.5} color="#4d8af0" />
      <directionalLight position={[2.2, 0.8, -1.6]} intensity={0.9} color="#2563eb" />
      <directionalLight position={[0, -1.5, 2.5]} intensity={0.3} color="#8ab2ff" />
      <Suspense fallback={null}>
        <Avatar
          url={url}
          animate={animate}
          animationRequest={animationRequest}
          onPlaybackState={onPlaybackState}
        />
      </Suspense>
    </Canvas>
  );
}

function AnimationControls({
  activeId,
  autoAnimationsEnabled,
  busyId,
  disabled,
  onAutoAnimationsChange,
  onSelect,
  onStop,
}: {
  activeId: AnimationId;
  autoAnimationsEnabled: boolean;
  busyId: AnimationId | null;
  disabled: boolean;
  onAutoAnimationsChange: (enabled: boolean) => void;
  onSelect: (id: AnimationId) => void;
  onStop: () => void;
}) {
  const stopDisabled = disabled || busyId === null;

  return (
    <div className="hero__avatar-controls" aria-label="Avatar animation">
      <span className="hero__avatar-control-dot" aria-hidden="true" />
      <label className="hero__avatar-control-label" htmlFor="hero-avatar-animation">
        Motion
      </label>
      <span className="hero__avatar-select-wrap">
        <select
          id="hero-avatar-animation"
          className="hero__avatar-select"
          value={busyId ?? activeId}
          disabled={disabled || busyId !== null}
          aria-busy={busyId !== null}
          onChange={(event) => onSelect(event.target.value as AnimationId)}
        >
          {ANIMATION_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
      <button
        type="button"
        className="hero__avatar-control-button"
        disabled={stopDisabled}
        onClick={onStop}
      >
        Stop
      </button>
      <button
        type="button"
        className="hero__avatar-control-button hero__avatar-auto-toggle"
        aria-pressed={autoAnimationsEnabled}
        onClick={() => onAutoAnimationsChange(!autoAnimationsEnabled)}
      >
        Auto: {autoAnimationsEnabled ? 'On' : 'Off'}
      </button>
    </div>
  );
}

function isPageFocusedAndVisible() {
  return document.visibilityState === 'visible' && document.hasFocus();
}

export default function HeroAvatarCanvas({
  animate,
  reducedMotion,
}: {
  animate: boolean;
  reducedMotion: boolean;
}) {
  const [animationRequest, setAnimationRequest] = useState<AnimationRequest>(
    INITIAL_ANIMATION_REQUEST,
  );
  const [autoAnimationsEnabled, setAutoAnimationsEnabled] = useState(true);
  const [pageActive, setPageActive] = useState(isPageFocusedAndVisible);
  const [playbackState, setPlaybackState] = useState<PlaybackState>(INITIAL_PLAYBACK_STATE);
  const autoAnimationTimer = useRef<number | null>(null);

  const handlePlaybackState = useCallback((state: PlaybackState) => {
    setPlaybackState(state);
  }, []);

  const clearAutoAnimationTimer = useCallback(() => {
    if (autoAnimationTimer.current !== null) {
      window.clearTimeout(autoAnimationTimer.current);
      autoAnimationTimer.current = null;
    }
  }, []);

  const requestAnimation = useCallback(
    (id: AnimationId) => {
      clearAutoAnimationTimer();
      if (reducedMotion || !animate || playbackState.busyId) return;
      if (id === playbackState.activeId && id === 'idle') return;
      if (id !== 'idle') setPlaybackState({ activeId: id, busyId: id });
      setAnimationRequest((current) => ({ id, nonce: current.nonce + 1 }));
    },
    [
      animate,
      clearAutoAnimationTimer,
      playbackState.activeId,
      playbackState.busyId,
      reducedMotion,
    ],
  );

  const stopAnimation = useCallback(() => {
    clearAutoAnimationTimer();
    if (reducedMotion || !animate || playbackState.busyId === null) return;
    setAnimationRequest((current) => ({ id: 'idle', nonce: current.nonce + 1 }));
  }, [animate, clearAutoAnimationTimer, playbackState.busyId, reducedMotion]);

  const shouldRunAutoAnimationCounter =
    autoAnimationsEnabled &&
    !reducedMotion &&
    animate &&
    pageActive &&
    playbackState.activeId === 'idle' &&
    playbackState.busyId === null;

  const requestRandomAnimation = useCallback(() => {
    if (!shouldRunAutoAnimationCounter) return;
    const id = RANDOM_ANIMATION_IDS[Math.floor(Math.random() * RANDOM_ANIMATION_IDS.length)];
    requestAnimation(id);
  }, [requestAnimation, shouldRunAutoAnimationCounter]);

  const restartAutoAnimationCounter = useCallback(() => {
    clearAutoAnimationTimer();
    if (!shouldRunAutoAnimationCounter) return;
    autoAnimationTimer.current = window.setTimeout(() => {
      autoAnimationTimer.current = null;
      requestRandomAnimation();
    }, AUTO_ANIMATION_DELAY_MS);
  }, [clearAutoAnimationTimer, requestRandomAnimation, shouldRunAutoAnimationCounter]);

  const handleAutoAnimationsChange = useCallback(
    (enabled: boolean) => {
      clearAutoAnimationTimer();
      setAutoAnimationsEnabled(enabled);
    },
    [clearAutoAnimationTimer],
  );

  useEffect(() => {
    if (animate) return;
    clearAutoAnimationTimer();
    setPlaybackState(INITIAL_PLAYBACK_STATE);
  }, [animate, clearAutoAnimationTimer]);

  useEffect(() => {
    restartAutoAnimationCounter();
    return clearAutoAnimationTimer;
  }, [clearAutoAnimationTimer, restartAutoAnimationCounter]);

  useEffect(() => {
    const activityEvents: (keyof WindowEventMap)[] = ['click', 'keydown', 'scroll', 'touchstart'];
    for (const eventName of activityEvents) {
      window.addEventListener(eventName, restartAutoAnimationCounter, { passive: true });
    }

    return () => {
      for (const eventName of activityEvents) {
        window.removeEventListener(eventName, restartAutoAnimationCounter);
      }
    };
  }, [restartAutoAnimationCounter]);

  useEffect(() => {
    const updatePageActive = () => {
      const isActive = isPageFocusedAndVisible();
      if (!isActive) clearAutoAnimationTimer();
      setPageActive(isActive);
    };

    window.addEventListener('focus', updatePageActive);
    window.addEventListener('blur', updatePageActive);
    document.addEventListener('visibilitychange', updatePageActive);
    updatePageActive();

    return () => {
      clearAutoAnimationTimer();
      window.removeEventListener('focus', updatePageActive);
      window.removeEventListener('blur', updatePageActive);
      document.removeEventListener('visibilitychange', updatePageActive);
    };
  }, [clearAutoAnimationTimer]);

  return (
    <ModelFallback
      fallback={
        <AvatarScene
          url={FALLBACK_MODEL_URL}
          animate={animate}
          animationRequest={INITIAL_ANIMATION_REQUEST}
        />
      }
    >
      <AvatarScene
        url={PREFERRED_MODEL_URL}
        animate={animate}
        animationRequest={animationRequest}
        onPlaybackState={handlePlaybackState}
      />
      {!reducedMotion && (
        <AnimationControls
          activeId={playbackState.activeId}
          autoAnimationsEnabled={autoAnimationsEnabled}
          busyId={playbackState.busyId}
          disabled={!animate}
          onAutoAnimationsChange={handleAutoAnimationsChange}
          onSelect={requestAnimation}
          onStop={stopAnimation}
        />
      )}
    </ModelFallback>
  );
}

// Only the preferred model is preloaded. The fallback and optional interaction
// animation are fetched on demand, so the happy path never downloads both.
useGLTF.preload(PREFERRED_MODEL_URL);
