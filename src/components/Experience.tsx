import { experience } from '../content';
import Section from './Section';

export default function Experience() {
  return (
    <Section
      id="experience"
      kicker="04 — Experience"
      title="Where I've worked"
      lead="From QA to software engineering — building an understanding of how software fails before building software that doesn't."
    >
      <div className="timeline">
        {experience.map(entry => (
          <article key={entry.role} className="timeline__entry">
            <div className="timeline__marker" aria-hidden="true" />
            <div className="card timeline__card">
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
    </Section>
  );
}
