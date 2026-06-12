/**
 * All site copy lives in this file — it is the single source of truth.
 * To change what the site says, edit the objects below; the components in
 * src/components/ only handle layout and read their text from here.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface Project {
  name: string;
  /** Short label shown above the title, e.g. "Personal project". */
  kind: string;
  /** Plain-language explanation of the business problem / setting. */
  context: string;
  /** What the work actually involves. */
  description: string;
  highlights: string[];
  tech: string[];
  /** Optional external link. Omitted while there is nothing real to link to. */
  link?: { label: string; url: string };
}

export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  summary: string;
  points: string[];
}

export const site = {
  name: 'Zenan Shang',
  role: 'Software Engineer',
  location: 'Midrand, Johannesburg, South Africa',
  availability: 'Open to remote, international, and overseas opportunities',
  email: 'zenanshang2@gmail.com',
  github: 'https://github.com/terrenceshang',
  linkedin: 'https://www.linkedin.com/in/zenan-shang-b99ab0237/',
  /** Set to a real URL (e.g. '/cv.pdf' placed in public/) when the CV is ready. */
  cvUrl: null as string | null,
  repo: 'https://github.com/terrenceshang/Personal-Website',
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  headline: 'Turning real business problems into simple, usable systems.',
  lead:
    'I build frontend and backend features for business software, with experience across React, Vue, TypeScript, Java, REST APIs, SQL databases, QA automation, and AI-assisted development workflows.',
};

export const about = {
  title: 'About',
  paragraphs: [
    'I am a software engineer at SOLIDiTech, working on Stage Zero customer-facing portal features, dashboards, Vue applications, Java backend APIs, telemetry data, and internal business systems.',
    'Before moving into software engineering, I worked in QA and automation QA, where I gained strong experience testing real user flows, finding edge cases, and understanding how software fails in production-like environments. I worked with Selenium and helped build the foundation for Appium-based mobile automation at SOLIDiTech.',
    'That background shapes how I build software today. I care about clear user flows, practical architecture, maintainable code, and features that solve real business problems instead of just looking good in isolation.',
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      'React',
      'Vue 3',
      'TypeScript',
      'JavaScript',
      'Vite',
      'Pinia',
      'Vue Router',
      'HTML',
      'CSS',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Backend',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'Maven', 'Hibernate', 'Jackson'],
  },
  {
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL'],
  },
  {
    title: 'Testing & QA',
    skills: [
      'Selenium',
      'Appium foundations',
      'Manual QA',
      'Automation QA',
      'Regression testing',
      'Edge case analysis',
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      'Git',
      'GitHub',
      'GitLab',
      'IntelliJ IDEA',
      'VS Code',
      'Docker',
      'Render',
      'Vercel',
      'GitHub Pages',
    ],
  },
  {
    title: 'AI-Assisted Development',
    skills: ['Codex', 'Claude Code', 'Gemini Code Assist', 'DeepSeek'],
  },
];

export const projects: Project[] = [
  {
    name: 'BookMyStay',
    kind: 'Personal project',
    context:
      'Small accommodation businesses — guesthouses, B&Bs, and multi-property operators — often juggle bookings, payments, and housekeeping across spreadsheets and paper. BookMyStay is a hotel and property management web application that brings those daily operations into one system.',
    description:
      'The project focuses on real operational problems: knowing which rooms are available, handling booking changes, spotting overdue guests, tracking payments, and managing more than one property from a single place.',
    highlights: [
      'Bookings, rooms, and guest management with check-in and check-out workflows',
      'Payments, reports, and housekeeping built around day-to-day hotel operations',
      'Admin permissions and tenant isolation for multi-property management',
    ],
    tech: ['Vue', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
    link: { label: 'View live site', url: 'https://www.bookmystayapp.co.za/' },
  },
  {
    name: 'Customer Portal Dashboard Work',
    kind: 'Professional work · SOLIDiTech',
    context:
      'Stage Zero is a platform that gives customers visibility into their energy systems and account information — it is where a customer goes to see how their system is performing and what is happening on their account.',
    description:
      'I work on the customer-facing side of this platform: dashboard features, live status information, usage graphs, battery information, weather data, telemetry-backed backend APIs, and frontend interfaces that help users understand system performance in a simple and useful way.',
    highlights: [
      'Dashboards with live status, usage graphs, battery, and weather information',
      'Telemetry-backed backend APIs with REST endpoints, DTOs, and domain models',
      'Integration between frontend dashboards and backend services',
    ],
    tech: ['Vue', 'TypeScript', 'Java', 'REST APIs', 'Telemetry data'],
  },
];

export const experience: ExperienceEntry[] = [
  {
    role: 'Software Engineer',
    company: 'SOLIDiTech',
    period: 'Current',
    summary:
      'Working on Stage Zero customer-facing portal features, dashboards, Vue applications, Java backend APIs, telemetry data, and internal business systems.',
    points: [
      'Building frontend components and implementing backend endpoints',
      'Connecting UI features to real data, including telemetry information',
      'Fixing production-related issues and reviewing QA feedback',
      'Improving user-facing workflows',
    ],
  },
  {
    role: 'QA & Automation QA',
    company: 'SOLIDiTech',
    period: 'Previously',
    summary:
      'Worked on manual QA and automation QA, including Selenium-based testing and helping build the foundation for Appium mobile automation.',
    points: [
      'Tested real user flows and ran regression testing across releases',
      'Found edge cases and studied how software fails in production-like environments',
      'Built a strong understanding of what makes software both usable and reliable',
    ],
  },
];

export const contact = {
  title: 'Contact',
  lead: "Whether it's a role, a project, or just a question about my work — my inbox is open.",
};
