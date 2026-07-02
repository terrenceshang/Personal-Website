import { useRef } from 'react';
import { hero, site } from '../content';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';
import HeroAvatar from './HeroAvatar';
import { GitHubIcon, LinkedInIcon, PinIcon } from './Icons';

/** Split a word into per-letter spans so the title can animate like a film credit. */
function TitleWord({ word }: { word: string }) {
  return (
    <span className="hero__word" aria-hidden="true">
      {[...word].map((letter, index) => (
        <span className="hero__letter" key={`${letter}-${index}`}>
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Opening title sequence, played once on load.
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('.hero__bg-glow', { autoAlpha: 0, scale: 0.7, duration: 1.8, ease: 'power2.out' }, 0)
          .from('.hero__letter', { yPercent: 120, duration: 0.9, stagger: 0.045 }, 0.2)
          .from('.hero__badge', { autoAlpha: 0, y: 16, duration: 0.6 }, 0.9)
          .from('.hero__roleline span', { autoAlpha: 0, y: 18, stagger: 0.1, duration: 0.6 }, 1.0)
          .from('.hero__lead', { autoAlpha: 0, y: 18, duration: 0.7 }, 1.15)
          .from('.hero__sub', { autoAlpha: 0, y: 18, duration: 0.7 }, 1.25)
          .from('.hero__actions', { autoAlpha: 0, y: 18, duration: 0.7 }, 1.3)
          .from('.hero__avatar-slot', { autoAlpha: 0, x: 40, duration: 1 }, 1.1)
          .from('.hero__scrollcue', { autoAlpha: 0, duration: 0.8 }, 1.7);

        // Scroll "unlock": the hero recedes and the light drifts as the page opens.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
            defaults: { ease: 'none' },
          })
          .to('.hero__content', { yPercent: -18, autoAlpha: 0.15 }, 0)
          .to('.hero__name', { letterSpacing: '0.08em' }, 0)
          .to('.hero__avatar-slot', { yPercent: -10, autoAlpha: 0.3 }, 0)
          .to('.hero__bg-glow--a', { xPercent: 18, yPercent: 26, scale: 1.2 }, 0)
          .to('.hero__bg-glow--b', { xPercent: -14, yPercent: -12, scale: 1.15 }, 0)
          .to('.hero__scrollcue', { autoAlpha: 0 }, 0);
      });
    },
    { scope: ref },
  );

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-glow hero__bg-glow--a" />
        <div className="hero__bg-glow hero__bg-glow--b" />
        <div className="hero__bg-grid" />
        <div className="noise" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            {site.availability}
          </p>
          <h1 className="hero__name" aria-label={site.name}>
            {site.name.split(' ').map(word => (
              <TitleWord word={word} key={word} />
            ))}
          </h1>
          <div className="hero__roleline">
            <span>{site.role}</span>
            <span className="hero__roleline-divider" aria-hidden="true" />
            <span className="hero__roleline-location">
              <PinIcon size={16} />
              {site.location}
            </span>
          </div>
          <p className="hero__lead">{hero.headline}</p>
          <p className="hero__sub">{hero.lead}</p>
          <div className="hero__actions">
            <a className="button button--primary" href="#projects">
              View projects
            </a>
            <a className="button button--ghost" href="#contact">
              Get in touch
            </a>
            <span className="hero__socials">
              <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon size={22} />
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={22} />
              </a>
            </span>
          </div>
        </div>
        <div className="hero__avatar-slot">
          <HeroAvatar />
        </div>
      </div>

      <div className="hero__scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <i className="hero__scrollcue-line" />
      </div>
    </section>
  );
}
