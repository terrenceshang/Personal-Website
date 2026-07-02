/**
 * All site copy lives in this file — it is the single source of truth.
 * To change what the site says, edit the objects below; the components in
 * src/components/ only handle layout, animation, and read their text from here.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

/** Which hand-built CSS mockup a project card renders. Swap for a real screenshot later. */
export type ProjectMockupKind = 'booking' | 'dashboard' | 'mobile' | 'website';

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
  /** Selects the CSS/SVG mockup visual rendered in the showcase card. */
  mockup: ProjectMockupKind;
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

/** One slide of the pinned About sequence: statement + supporting code visual. */
export interface IdentityStatement {
  label: string;
  text: string;
  code: string;
  tags: string[];
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
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
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

/** Shown one at a time while the About section is pinned. */
export const identity: IdentityStatement[] = [
  {
    label: 'Frontend',
    text: 'I build clean, usable frontend experiences.',
    code: `const { data, loading } = useTelemetry(siteId);

return (
  <UsageChart
    series={data.usage}
    live={!loading}
  />
);`,
    tags: ['React', 'Vue 3', 'TypeScript', 'Vite'],
  },
  {
    label: 'Backend',
    text: 'I work across backend systems and APIs.',
    code: `@GetMapping("/api/sites/{id}/summary")
public SiteSummaryDto summary(@PathVariable long id) {
  var telemetry = telemetryService.latest(id);
  return SiteSummaryDto.from(telemetry);
}`,
    tags: ['Java', 'Spring Boot', 'REST APIs', 'PostgreSQL'],
  },
  {
    label: 'Product',
    text: 'I care about practical product work, performance, and maintainability.',
    code: `test('guest can check out', async () => {
  await bookRoom({ nights: 2 });
  await checkOut();
  expect(await invoiceTotal()).toBe('R2 400');
});`,
    tags: ['QA automation', 'Regression testing', 'Telemetry', 'Performance'],
  },
];

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
      'Small accommodation businesses — guesthouses, B&Bs, and multi-property operators — often juggle bookings, payments, and housekeeping across spreadsheets and paper. BookMyStay brings those daily operations into one system.',
    description:
      'The project focuses on real operational problems: knowing which rooms are available, handling booking changes, spotting overdue guests, tracking payments, and managing more than one property from a single place.',
    highlights: [
      'Bookings, rooms, and guest management with check-in and check-out workflows',
      'Payments, reports, and housekeeping built around day-to-day hotel operations',
      'Admin permissions and tenant isolation for multi-property management',
    ],
    tech: ['Vue', 'Java', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
    mockup: 'booking',
    link: { label: 'View live site', url: 'https://www.bookmystayapp.co.za/' },
  },
  {
    name: 'Customer Portal Dashboards',
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
    mockup: 'dashboard',
  },
  {
    name: 'Scan-to-Order',
    kind: 'Concept · placeholder content',
    context:
      'A QR scan-to-order concept for restaurants: guests scan a code at the table, browse the menu on their phone, and send orders straight to the kitchen without waiting for staff.',
    description:
      'Placeholder entry — replace this card with a real project by editing the projects array in src/content.ts. The phone mockup is pure CSS, so no screenshots are needed to make it look finished.',
    highlights: [
      'Mobile-first menu browsing designed for one-handed use at the table',
      'Order basket, table numbers, and kitchen-side order flow',
      'Replace or remove this entry in src/content.ts when a real project is ready',
    ],
    tech: ['React', 'TypeScript', 'REST APIs'],
    mockup: 'mobile',
  },
  {
    name: 'Personal Website',
    kind: 'Personal project',
    context:
      'This site — a cinematic, scroll-driven portfolio built from scratch with original CSS and SVG visuals instead of stock screenshots.',
    description:
      'GSAP ScrollTrigger drives the pinned About sequence, the horizontal project showcase, and the stacked project reel, while a three.js avatar and hand-built CSS mockups keep every visual original and lightweight.',
    highlights: [
      'Scroll-controlled cinematic sections with pinning and scrubbed timelines',
      'Interactive three.js avatar with selectable animations',
      'All project visuals are hand-built CSS/SVG — no image assets required',
    ],
    tech: ['React', 'TypeScript', 'Vite', 'GSAP', 'Three.js'],
    mockup: 'website',
    link: { label: 'Source on GitHub', url: 'https://github.com/terrenceshang/Personal-Website' },
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

/** Closing full-screen section. Each entry in titleLines animates as its own line. */
export const outro = {
  kicker: '06 · Contact',
  titleLines: ["LET'S BUILD", 'SOMETHING'],
};
