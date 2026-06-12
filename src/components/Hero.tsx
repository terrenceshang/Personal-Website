import { hero, site } from '../content';
import HeroAvatar from './HeroAvatar';
import { GitHubIcon, LinkedInIcon, PinIcon } from './Icons';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__badge">
            <span className="hero__badge-dot" aria-hidden="true" />
            {site.availability}
          </p>
          <p className="hero__eyebrow">
            {site.name} · {site.role}
          </p>
          <h1 className="hero__title">{hero.headline}</h1>
          <p className="hero__lead">{hero.lead}</p>
          <p className="hero__meta">
            <PinIcon size={18} />
            {site.location}
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#projects">
              View projects
            </a>
            <a className="button button--secondary" href="#contact">
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
        <HeroAvatar />
      </div>
    </section>
  );
}
