import { useRef } from 'react';
import { contact, outro, site } from '../content';
import { gsap, MOTION_OK, useGSAP } from '../lib/gsap';
import { FileIcon, GitHubIcon, GlobeIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons';

/** Cinematic outro: the closing statement rises out of a mask as it scrolls in. */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              end: 'top 15%',
              scrub: 0.5,
            },
            defaults: { ease: 'none' },
          })
          .from('.outro__glow', { scale: 0.5, autoAlpha: 0 }, 0)
          .from('.outro__kicker', { autoAlpha: 0, y: 24 }, 0)
          .from('.outro__line', { yPercent: 115, stagger: 0.25 }, 0.05)
          .from('.outro__lead', { autoAlpha: 0, y: 30 }, 0.5)
          .from('.outro__mail', { autoAlpha: 0, y: 30 }, 0.6)
          .from('.outro__links li', { autoAlpha: 0, y: 24, stagger: 0.08 }, 0.7)
          .from('.outro__meta', { autoAlpha: 0 }, 0.85);
      });
    },
    { scope: ref },
  );

  return (
    <section id="contact" className="outro" ref={ref}>
      <div className="outro__glow" aria-hidden="true" />
      <div className="container outro__inner">
        <p className="outro__kicker">{outro.kicker}</p>
        <h2 className="outro__title" aria-label={outro.titleLines.join(' ')}>
          {outro.titleLines.map(line => (
            <span className="outro__mask" key={line} aria-hidden="true">
              <span className="outro__line">{line}</span>
            </span>
          ))}
        </h2>
        <p className="outro__lead">{contact.lead}</p>

        <a className="outro__mail" href={`mailto:${site.email}`}>
          <MailIcon size={26} />
          {site.email}
        </a>

        <ul className="outro__links">
          <li>
            <a href={site.github} target="_blank" rel="noreferrer">
              <GitHubIcon size={18} />
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon size={18} />
              LinkedIn
            </a>
          </li>
          <li>
            {site.cvUrl ? (
              <a href={site.cvUrl} target="_blank" rel="noreferrer">
                <FileIcon size={18} />
                CV
              </a>
            ) : (
              <span className="outro__link-disabled" aria-disabled="true">
                <FileIcon size={18} />
                CV — coming soon
              </span>
            )}
          </li>
        </ul>

        <p className="outro__meta">
          <span>
            <PinIcon size={16} /> {site.location}
          </span>
          <span>
            <GlobeIcon size={16} /> {site.availability}
          </span>
        </p>
      </div>
    </section>
  );
}
