import { useRef } from 'react';
import { projects, site } from '../content';
import { DESKTOP_MOTION, gsap, MOBILE_MOTION, useGSAP } from '../lib/gsap';
import ProjectMockup from './ProjectMockup';
import SectionHeading from './SectionHeading';
import { ExternalLinkIcon } from './Icons';

/**
 * Pinned horizontal showcase: vertical scroll drives the track sideways,
 * with a light counter-parallax on each mockup. On small screens / reduced
 * motion the cards stack vertically.
 */
export default function Projects() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION, () => {
        const track = ref.current!.querySelector<HTMLElement>('.showcase__track')!;
        const viewport = ref.current!.querySelector<HTMLElement>('.showcase__viewport')!;
        const distance = () => track.scrollWidth - viewport.clientWidth;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
          defaults: { ease: 'none' },
        });

        tl.to(track, { x: () => -distance() }, 0);
        tl.fromTo('.showcase__progress-fill', { scaleX: 0 }, { scaleX: 1 }, 0);
        gsap.utils.toArray<HTMLElement>('.showcase-card__visual').forEach(visual => {
          tl.fromTo(visual, { xPercent: -7 }, { xPercent: 7 }, 0);
        });
      });

      mm.add(MOBILE_MOTION, () => {
        gsap.utils.toArray<HTMLElement>('.showcase-card').forEach(card => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 48,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%' },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="projects" className="showcase" ref={ref}>
      <div className="container showcase__head">
        <SectionHeading
          kicker="02 · Projects"
          title="Selected work"
          lead="Projects built around real operational and business problems, not demos."
        />
        <div className="showcase__progress" aria-hidden="true">
          <i className="showcase__progress-fill" />
        </div>
      </div>

      <div className="showcase__viewport">
        <div className="showcase__track">
          {projects.map((project, index) => (
            <article className="showcase-card" key={project.name}>
              <div className="showcase-card__visual">
                <ProjectMockup kind={project.mockup} />
              </div>
              <div className="showcase-card__body">
                <p className="showcase-card__kind">
                  <span className="showcase-card__index">0{index + 1}</span>
                  {project.kind}
                </p>
                <h3 className="showcase-card__name">{project.name}</h3>
                <p className="showcase-card__context">{project.context}</p>
                <ul className="chips">
                  {project.tech.map(tech => (
                    <li className="chip chip--accent" key={tech}>
                      {tech}
                    </li>
                  ))}
                </ul>
                {project.link && (
                  <a
                    className="showcase-card__link"
                    href={project.link.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.link.label}
                    <ExternalLinkIcon size={15} />
                  </a>
                )}
              </div>
            </article>
          ))}

          <article className="showcase-card showcase-card--end">
            <p className="showcase-card__kind">And more</p>
            <h3 className="showcase-card__name">Explore the rest on GitHub</h3>
            <a className="showcase-card__link" href={site.github} target="_blank" rel="noreferrer">
              github.com/terrenceshang
              <ExternalLinkIcon size={15} />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
