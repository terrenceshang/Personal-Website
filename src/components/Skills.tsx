import { useRef } from 'react';
import { skillGroups } from '../content';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';

/** Skills wall: each group card lifts in, then its tags cascade with a stagger. */
export default function Skills() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('.skills__group').forEach(group => {
          gsap
            .timeline({ scrollTrigger: { trigger: group, start: 'top 88%' } })
            .from(group, { autoAlpha: 0, y: 56, duration: 0.7, ease: 'power3.out' })
            .from(
              group.querySelectorAll('.chip'),
              {
                autoAlpha: 0,
                y: 14,
                scale: 0.9,
                stagger: 0.03,
                duration: 0.4,
                ease: 'power2.out',
              },
              '-=0.35',
            );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <SectionHeading
          kicker="04 · Skills"
          title="What I work with"
          lead="The tools and technologies I use day to day, from frontend and backend development to testing and AI-assisted workflows."
        />
        <div className="skills__grid">
          {skillGroups.map(group => (
            <article className="skills__group" key={group.title}>
              <header className="skills__group-head">
                <h3>{group.title}</h3>
                <span className="skills__count">{group.skills.length}</span>
              </header>
              <ul className="chips">
                {group.skills.map(skill => (
                  <li className="chip" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
