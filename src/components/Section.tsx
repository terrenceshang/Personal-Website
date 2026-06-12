import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  /** Small accent label above the title, e.g. "01 — About". */
  kicker: string;
  title: string;
  lead?: string;
  /** Alternate (tinted) background to visually separate sections. */
  alt?: boolean;
  children: ReactNode;
}

export default function Section({ id, kicker, title, lead, alt, children }: SectionProps) {
  return (
    <section id={id} className={alt ? 'section section--alt' : 'section'}>
      <div className="container">
        <header className="section__header">
          <p className="section__kicker">{kicker}</p>
          <h2 className="section__title">{title}</h2>
          {lead && <p className="section__lead">{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
