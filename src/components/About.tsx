import { about } from '../content';
import Section from './Section';

export default function About() {
  return (
    <Section id="about" kicker="01 — About" title={about.title} alt>
      <div className="about">
        {about.paragraphs.map(paragraph => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
