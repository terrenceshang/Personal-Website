import { projects } from '../content';
import Section from './Section';
import { CheckIcon, ExternalLinkIcon } from './Icons';

export default function Projects() {
  return (
    <Section
      id="projects"
      kicker="03 — Projects"
      title="Selected work"
      lead="Projects built around real operational and business problems, not demos."
      alt
    >
      <div className="projects">
        {projects.map(project => (
          <article key={project.name} className="card project">
            <div className="project__main">
              <p className="project__kind">{project.kind}</p>
              <h3 className="project__name">{project.name}</h3>
              <p className="project__context">{project.context}</p>
              <p className="project__description">{project.description}</p>
              {project.link && (
                <a
                  className="button button--primary button--small project__link"
                  href={project.link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.link.label}
                  <ExternalLinkIcon size={15} />
                </a>
              )}
            </div>
            <div className="project__aside">
              <h4>Highlights</h4>
              <ul className="project__highlights">
                {project.highlights.map(highlight => (
                  <li key={highlight}>
                    <CheckIcon />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <ul className="chips">
                {project.tech.map(tech => (
                  <li key={tech} className="chip chip--accent">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
