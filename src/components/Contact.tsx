import { contact, site } from '../content';
import Section from './Section';
import { FileIcon, GitHubIcon, GlobeIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons';

export default function Contact() {
  return (
    <Section id="contact" kicker="05 — Contact" title={contact.title} lead={contact.lead} alt>
      <div className="contact">
        <a className="card contact__card" href={`mailto:${site.email}`}>
          <MailIcon />
          <div>
            <h3>Email</h3>
            <p>{site.email}</p>
          </div>
        </a>
        <a className="card contact__card" href={site.github} target="_blank" rel="noreferrer">
          <GitHubIcon />
          <div>
            <h3>GitHub</h3>
            <p>github.com/terrenceshang</p>
          </div>
        </a>
        <a className="card contact__card" href={site.linkedin} target="_blank" rel="noreferrer">
          <LinkedInIcon />
          <div>
            <h3>LinkedIn</h3>
            <p>Zenan Shang</p>
          </div>
        </a>
        {site.cvUrl ? (
          <a className="card contact__card" href={site.cvUrl} target="_blank" rel="noreferrer">
            <FileIcon />
            <div>
              <h3>CV</h3>
              <p>Download my CV</p>
            </div>
          </a>
        ) : (
          <div className="card contact__card contact__card--disabled" aria-disabled="true">
            <FileIcon />
            <div>
              <h3>CV</h3>
              <p>Coming soon</p>
            </div>
          </div>
        )}
      </div>
      <p className="contact__footnote">
        <span>
          <PinIcon size={18} /> {site.location}
        </span>
        <span>
          <GlobeIcon size={18} /> {site.availability}
        </span>
      </p>
    </Section>
  );
}
