import { useRef } from 'react';
import { about, identity } from '../content';
import { DESKTOP_MOTION, gsap, MOBILE_MOTION, MOTION_OK, useGSAP } from '../lib/gsap';

/**
 * Pinned identity sequence: the section holds while scroll progress swaps
 * the statement, the code window pane, and the tech tags in sync.
 * On small screens / reduced motion the slides render as a static list
 * (layout handled by the media queries in index.css).
 */
export default function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(DESKTOP_MOTION, () => {
        const items = gsap.utils.toArray<HTMLElement>('.identity__item');
        const panes = gsap.utils.toArray<HTMLElement>('.code-window__pane');
        const tagsets = gsap.utils.toArray<HTMLElement>('.identity__tagset');
        const dots = gsap.utils.toArray<HTMLElement>('.identity__dot');

        gsap.set(items.slice(1), { autoAlpha: 0, y: 70 });
        gsap.set(panes.slice(1), { autoAlpha: 0, y: 24 });
        gsap.set(tagsets.slice(1), { autoAlpha: 0 });
        gsap.set(dots[0], { opacity: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.identity__pin',
            start: 'top top',
            end: `+=${items.length * 90}%`,
            pin: true,
            scrub: 0.5,
          },
          defaults: { ease: 'power2.inOut', duration: 1 },
        });

        items.forEach((item, i) => {
          if (i === 0) return;
          tl.to({}, { duration: 0.6 }) // hold the current slide before switching
            .to(items[i - 1], { autoAlpha: 0, y: -70 })
            .to(panes[i - 1], { autoAlpha: 0, y: -24 }, '<')
            .to(tagsets[i - 1], { autoAlpha: 0 }, '<')
            .to(dots[i - 1], { opacity: 0.25 }, '<')
            .to(item, { autoAlpha: 1, y: 0 }, '<0.35')
            .to(panes[i], { autoAlpha: 1, y: 0 }, '<')
            .to(dots[i], { opacity: 1 }, '<')
            .fromTo(
              tagsets[i],
              { autoAlpha: 0, y: 14 },
              { autoAlpha: 1, y: 0, duration: 0.5 },
              '<0.2',
            );
        });
        tl.to({}, { duration: 0.6 });
      });

      mm.add(MOBILE_MOTION, () => {
        gsap.utils.toArray<HTMLElement>('.identity__item, .identity__visual').forEach(el => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 40,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
          });
        });
      });

      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>('.identity__bio p').forEach(p => {
          gsap.from(p, {
            autoAlpha: 0,
            y: 32,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: p, start: 'top 88%' },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="about" className="identity" ref={ref}>
      <div className="identity__pin">
        <div className="container identity__grid">
          <div className="identity__copy">
            <p className="identity__kicker">01 · About</p>
            <div className="identity__stack">
              {identity.map(statement => (
                <div className="identity__item" key={statement.label}>
                  <p className="identity__label">{statement.label}</p>
                  <h2 className="identity__statement">{statement.text}</h2>
                </div>
              ))}
            </div>
            <div className="identity__progress" aria-hidden="true">
              {identity.map(statement => (
                <span className="identity__dot" key={statement.label} />
              ))}
            </div>
          </div>

          <div className="identity__visual" aria-hidden="true">
            <div className="code-window">
              <div className="code-window__bar">
                <i />
                <i />
                <i />
                <span>zenan.dev</span>
              </div>
              <div className="code-window__panes">
                {identity.map(statement => (
                  <pre className="code-window__pane" key={statement.label}>
                    <code>{statement.code}</code>
                  </pre>
                ))}
              </div>
            </div>
            <div className="identity__tags">
              {identity.map(statement => (
                <ul className="identity__tagset" key={statement.label}>
                  {statement.tags.map(tag => (
                    <li className="chip" key={tag}>
                      {tag}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container identity__bio">
        {about.paragraphs.map(paragraph => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
