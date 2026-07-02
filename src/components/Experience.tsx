import { useRef } from 'react';
import { experience } from '../content';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';

/**
 * Career timeline: the spine draws itself as you scroll and each milestone
 * scales in as the "camera" reaches it.
 */
export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.timeline__spine-fill',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '.timeline',
              start: 'top 75%',
              end: 'bottom 55%',
              scrub: true,
            },
          },
        );

        gsap.utils.toArray<HTMLElement>('.timeline__entry').forEach(entry => {
          gsap
            .timeline({ scrollTrigger: { trigger: entry, start: 'top 82%' } })
            .from(entry.querySelector('.timeline__marker'), {
              scale: 0,
              duration: 0.4,
              ease: 'back.out(2)',
            })
            .from(
              entry.querySelector('.timeline__card'),
              { autoAlpha: 0, y: 48, scale: 0.97, duration: 0.8, ease: 'power3.out' },
              '-=0.15',
            );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <SectionHeading
          kicker="05 · Experience"
          title="Where I've worked"
          lead="From QA to software engineering — building an understanding of how software fails before building software that doesn't."
        />
        <div className="timeline">
          <div className="timeline__spine" aria-hidden="true">
            <i className="timeline__spine-fill" />
          </div>
          {experience.map(entry => (
            <article className="timeline__entry" key={entry.role}>
              <div className="timeline__marker" aria-hidden="true" />
              <div className="timeline__card">
                <div className="timeline__heading">
                  <div>
                    <h3>{entry.role}</h3>
                    <p className="timeline__company">{entry.company}</p>
                  </div>
                  <span className="timeline__period">{entry.period}</span>
                </div>
                <p className="timeline__summary">{entry.summary}</p>
                <ul className="timeline__points">
                  {entry.points.map(point => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
