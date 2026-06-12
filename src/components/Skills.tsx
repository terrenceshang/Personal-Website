import { skillGroups } from '../content';
import Section from './Section';

export default function Skills() {
  return (
    <Section
      id="skills"
      kicker="02 — Skills"
      title="What I work with"
      lead="The tools and technologies I use day to day, from frontend and backend development to testing and AI-assisted workflows."
    >
      <div className="skills">
        {skillGroups.map(group => (
          <article key={group.title} className="card skills__card">
            <h3>{group.title}</h3>
            <ul className="chips">
              {group.skills.map(skill => (
                <li key={skill} className="chip">
                  {skill}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
