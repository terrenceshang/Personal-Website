import { useRef } from 'react';
import { projects } from '../content';
import { DESKTOP_MOTION, gsap, MOBILE_MOTION, useGSAP } from '../lib/gsap';
import SectionHeading from './SectionHeading';
import { CheckIcon, ExternalLinkIcon } from './Icons';

/**
 * Pinned deck: each scroll step slides the next project card over the
 * previous one, which settles back, scales down, and darkens — a cinematic
 * reel of the same projects the showcase introduces visually.
 */
export default function ProjectReel() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.reel-card');
        gsap.set(cards.slice(1), { yPercent: 120 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.reel__pin',
            start: 'top top',
            end: `+=${cards.length * 80}%`,
            pin: true,
            scrub: 0.5,
          },
          defaults: { ease: 'power1.inOut', duration: 1 },
        });

        cards.forEach((card, i) => {
          if (i === 0) return;
          tl.to({}, { duration: 0.35 }) // hold before the next card arrives
            .to(cards[i - 1], { scale: 0.92, y: -24 })
            .to(cards[i - 1].querySelector('.reel-card__shade'), { opacity: 0.65 }, '<')
            .to(card, { yPercent: 0 }, '<0.1');
        });
        tl.to({}, { duration: 0.4 });
      });

      mm.add(MOBILE_MOTION, () => {
        gsap.utils.toArray<HTMLElement>('.reel-card').forEach(card => {
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
    <section id="featured" className="reel" ref={ref}>
      <div className="reel__pin">
        <div className="container reel__inner">
          <SectionHeading
            kicker="03 · Featured reel"
            title="A closer look"
            lead="The same work, card by card — what each project actually delivers."
          />
          <div className="reel__stage">
            {projects.map((project, index) => (
              <article className="reel-card" key={project.name}>
                <header className="reel-card__head">
                  <span className="reel-card__index">0{index + 1}</span>
                  <span className="reel-card__kind">{project.kind}</span>
                </header>
                <h3 className="reel-card__name">{project.name}</h3>
                <p className="reel-card__description">{project.description}</p>
                <ul className="reel-card__highlights">
                  {project.highlights.map(highlight => (
                    <li key={highlight}>
                      <CheckIcon />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <footer className="reel-card__foot">
                  <ul className="chips">
                    {project.tech.map(tech => (
                      <li className="chip" key={tech}>
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {project.link && (
                    <a
                      className="reel-card__link"
                      href={project.link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.link.label}
                      <ExternalLinkIcon size={15} />
                    </a>
                  )}
                </footer>
                <div className="reel-card__shade" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
