import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

// Loaded lazily so mobile visitors never download three.js or the model.
const HeroAvatarCanvas = lazy(() => import('./HeroAvatarCanvas'));

// Must match the hero's two-column breakpoint in index.css.
const DESKTOP_QUERY = '(min-width: 900px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

/** If WebGL or the model fails, hide the avatar instead of breaking the hero. */
class AvatarErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroAvatar() {
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  // Pause the render loop while the hero is scrolled out of view.
  useEffect(() => {
    const container = containerRef.current;
    if (!isDesktop || !container) return;
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.05 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div ref={containerRef} className="hero__avatar" aria-hidden="true">
      <AvatarErrorBoundary>
        <Suspense fallback={<div className="hero__avatar-fallback" />}>
          <HeroAvatarCanvas animate={inView && !reducedMotion} />
        </Suspense>
      </AvatarErrorBoundary>
    </div>
  );
}
