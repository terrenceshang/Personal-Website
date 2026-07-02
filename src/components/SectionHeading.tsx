import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';

interface SectionHeadingProps {
  /** Small accent label above the title, e.g. "03 · Skills". */
  kicker: string;
  title: string;
  lead?: string;
}

/** Section header with a masked title reveal driven by scroll. */
export default function SectionHeading({ kicker, title, lead }: SectionHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap
          .timeline({
            scrollTrigger: { trigger: ref.current, start: 'top 88%' },
            defaults: { ease: 'power3.out' },
          })
          .from('.section-head__kicker', { autoAlpha: 0, x: -24, duration: 0.6 })
          .from('.section-head__title', { yPercent: 110, duration: 0.9 }, 0.1);
        if (lead) {
          tl.from('.section-head__lead', { autoAlpha: 0, y: 20, duration: 0.7 }, 0.45);
        }
      });
    },
    { scope: ref },
  );

  return (
    <header className="section-head" ref={ref}>
      <p className="section-head__kicker">{kicker}</p>
      <div className="section-head__mask">
        <h2 className="section-head__title">{title}</h2>
      </div>
      {lead && <p className="section-head__lead">{lead}</p>}
    </header>
  );
}
