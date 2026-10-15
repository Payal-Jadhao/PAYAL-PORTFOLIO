import React, { useState, useEffect } from 'react';

const NAV = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['education', 'Education'],
];

const SKILLS = [
  ['Languages', ['Java', 'Core Java', 'Java 8', 'TypeScript', 'JavaScript', 'NodeJS']],
  ['Backend & Architecture', ['Spring Boot', 'Spring Framework', 'Spring Data JPA', 'Spring Security', 'Hibernate', 'REST APIs', 'JWT', 'Microservices', 'Web Services']],
  ['Frontend', ['React.js', 'React Hooks', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Axios']],
  ['Databases', ['MySQL', 'MongoDB', 'PostgreSQL', 'SQL', 'Query Optimization']],
  ['DevOps & Cloud', ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Git', 'GitHub', 'Maven', 'Postman', 'Google Cloud']],
  ['AI & Practices', ['Gemini AI API', 'Prompt Engineering', 'LLM Integration', 'Design Thinking', 'OOP', 'Agile / Scrum', 'Code Reviews', 'Debugging & Troubleshooting']],
];

const PROJECTS = [
  {
    name: 'DevPrepPal',
    kind: 'AI-Powered Developer Preparation Platform · Final Year B.E. R&D Project',
    text: 'A secure Spring Boot backend architecture with JWT authentication and MongoDB, paired with a dynamic React.js interface for interview routing, live chat, quizzes, and score analytics. Explores context-aware interview preparation by generating up to 25 role-specific questions per session using the Gemini AI API.',
    points: [
      'Investigated and compared prompt-engineering strategies (structured vs. open-ended prompting, context-window design) to improve question relevance and accuracy',
      'Designed Spring Security & JWT backend with MongoDB, achieving ~5% improvement in interview lifecycle processing',
      'Built and iteratively tested React.js UI through feedback cycles, improving candidate engagement by ~10%',
      'Integrated containerization and deployment readiness with Docker and microservices architecture'
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'MongoDB', 'JWT', 'React.js', 'Gemini AI API', 'Microservices', 'Docker', 'REST APIs'],
  },
  {
    name: 'Student Management System',
    kind: 'Full-Stack CRUD Application',
    text: 'A layered Spring Boot application with Hibernate ORM and MySQL, exposing GET, POST, PUT, and DELETE endpoints tested via Postman. Features a modular React component architecture interacting via Axios.',
    points: [
      'Engineered structured Controller, Service, and Repository layers with robust validation',
      'Built reusable React components with responsive styling for complete student record workflows',
      'Implemented transactional database operations with MySQL and Hibernate ORM'
    ],
    stack: ['React.js', 'Spring Boot', 'Hibernate', 'MySQL', 'REST APIs', 'Postman', 'JavaScript'],
  },
];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600&display=swap');

:root, .pf {
  --bg: #f4f7f6; --surface: #ffffff; --ink: #10201d; --muted: #52645f;
  --line: #d9e2df; --accent: #0b6b61; --accent-ink: #ffffff; --tint: #e3f0ed;
  --code-bg: #10201d; --code-ink: #cfe3de; --code-key: #7fd8c6; --code-num: #f2c879;
  --display: 'Bricolage Grotesque', system-ui, sans-serif;
  --body: 'Hanken Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: var(--bg); color: var(--ink); font-family: var(--body);
  line-height: 1.6; min-height: 100vh; -webkit-font-smoothing: antialiased;
}
@media (prefers-color-scheme: dark) {
  :root, .pf {
    --bg: #0d1614; --surface: #142220; --ink: #e7f1ee; --muted: #9bb0aa;
    --line: #243633; --accent: #5fd0bd; --accent-ink: #062520; --tint: #1a2e2b;
    --code-bg: #08100f; --code-ink: #b8d3cc;
  }
}
/* global reset: overrides Vite/CRA default index.css that centers #root and darkens the sides */
html, body, #root { margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: none !important; min-width: 0 !important; display: block !important; text-align: left !important; place-items: initial !important; background: var(--bg) !important; color: var(--ink); }
html { color-scheme: light dark; overflow-x: hidden; }
body { overflow-x: hidden; }
.pf { width: 100%; text-align: left; overflow-x: clip; }
.pf img, .pf svg { max-width: 100%; }
.pf *, .pf *::before, .pf *::after { box-sizing: border-box; }
.pf h1, .pf h2, .pf h3, .pf p, .pf ul { margin: 0; }
.pf a { color: inherit; text-decoration: none; }
.pf :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 6px; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .pf * { animation: none !important; transition: none !important; } }
.pf section[id] { scroll-margin-top: 72px; }

.wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 48px); }
.sec { padding: clamp(56px, 9vw, 104px) 0; }
.sec-head { margin-bottom: clamp(28px, 5vw, 48px); max-width: 560px; }
.sec-head h2 { font-family: var(--display); font-weight: 800; font-size: clamp(1.75rem, 4vw, 2.5rem); letter-spacing: -0.02em; line-height: 1.1; }
.sec-head p { color: var(--muted); margin-top: 10px; }

/* nav */
.nav { position: fixed; inset: 0 0 auto 0; z-index: 50; background: color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
.nav-in { height: 64px; display: flex; align-items: center; justify-content: space-between; }
.brand { font-family: var(--display); font-weight: 800; font-size: 1.15rem; letter-spacing: -0.01em; }
.nav-links { display: flex; align-items: center; gap: 28px; font-size: 0.92rem; font-weight: 500; }
.nav-links a { color: var(--muted); transition: color .2s; }
.nav-links a:hover { color: var(--ink); }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 11px 20px; border-radius: 10px; font-weight: 600; font-size: 0.95rem; border: 1px solid transparent; transition: transform .15s, background .2s; cursor: pointer; font-family: var(--body); }
.btn-solid { background: var(--accent); color: var(--accent-ink) !important; }
.btn-solid:hover { transform: translateY(-1px); }
.btn-ghost { background: transparent; border-color: var(--line); color: var(--ink); }
.btn-ghost:hover { background: var(--tint); }
.nav-links .btn { padding: 8px 16px; color: var(--accent-ink); }
.burger { display: none; background: none; border: 1px solid var(--line); color: var(--ink); width: 42px; height: 42px; border-radius: 10px; cursor: pointer; align-items: center; justify-content: center; }
.burger svg { width: 20px; height: 20px; }
.drawer { display: none; }

/* hero */
.hero { padding: clamp(112px, 16vw, 168px) 0 clamp(48px, 8vw, 88px); }
.hero-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: clamp(32px, 6vw, 72px); align-items: center; }
.status { display: inline-flex; align-items: center; gap: 10px; padding: 6px 14px; border: 1px solid var(--line); border-radius: 999px; background: var(--surface); font-size: 0.85rem; color: var(--muted); margin-bottom: 22px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px rgba(34,197,94,.18); }
.hero h1 { font-family: var(--display); font-weight: 800; font-size: clamp(2.5rem, 7vw, 4.6rem); line-height: 1.02; letter-spacing: -0.035em; }
.hero .lead { color: var(--muted); font-size: clamp(1rem, 2vw, 1.15rem); max-width: 540px; margin: 22px 0 32px; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; }
.socials { display: flex; flex-wrap: wrap; gap: 22px; margin-top: 32px; font-size: 0.92rem; color: var(--muted); }
.socials a { border-bottom: 1px solid var(--line); padding-bottom: 2px; transition: color .2s, border-color .2s; }
.socials a:hover { color: var(--accent); border-color: var(--accent); }

.code { background: var(--code-bg); color: var(--code-ink); border-radius: 16px; border: 1px solid var(--line); overflow: hidden; font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace; font-size: 0.82rem; box-shadow: 0 24px 48px -24px rgba(8, 30, 26, .45); }
.code-bar { display: flex; align-items: center; gap: 7px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.08); color: #7f9892; font-size: 0.75rem; }
.code-bar i { width: 10px; height: 10px; border-radius: 50%; background: #3a4f4b; display: block; }
.code-bar span { margin-left: 8px; }
.code pre { margin: 0; padding: 18px 20px 22px; overflow-x: auto; line-height: 1.75; }
.k { color: var(--code-key); } .n { color: var(--code-num); }

.social-btns { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
.social-btns .btn { background: var(--surface); }
.snap { background: var(--surface); border: 1px solid var(--line); border-radius: 20px; padding: clamp(20px, 3vw, 28px); display: grid; gap: 14px; box-shadow: 0 24px 48px -28px rgba(8, 30, 26, .35); }
.snap-head { display: flex; align-items: center; gap: 14px; padding-bottom: 16px; border-bottom: 1px solid var(--line); }
.snap-head strong { display: block; font-family: var(--display); font-size: 1.1rem; }
.snap-head small { color: var(--muted); font-size: 0.88rem; }
.avatar { width: 48px; height: 48px; border-radius: 14px; background: var(--accent); color: var(--accent-ink); display: grid; place-items: center; font-family: var(--display); font-weight: 800; flex: none; }
.pillar { display: flex; gap: 14px; align-items: flex-start; padding: 14px; border-radius: 14px; background: var(--tint); }
.emo { font-size: 1.6rem; line-height: 1; flex: none; width: 40px; height: 40px; display: grid; place-items: center; background: var(--surface); border-radius: 12px; }
.pillar h3 { font-family: var(--display); font-weight: 700; font-size: 1rem; margin: 0 0 2px; }
.pillar p { color: var(--muted); font-size: 0.88rem; line-height: 1.5; }
.c-item small { margin-bottom: 2px; }

/* skills */
.skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 24px; }
.card h3 { font-family: var(--display); font-weight: 700; font-size: 1.05rem; margin-bottom: 14px; }
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag { font-size: 0.8rem; padding: 4px 11px; border-radius: 999px; background: var(--tint); color: var(--ink); border: 1px solid transparent; }

/* experience */
.job { display: grid; grid-template-columns: 220px 1fr; gap: clamp(20px, 5vw, 56px); padding-top: 28px; border-top: 1px solid var(--line); }
.job-meta p { color: var(--muted); font-size: 0.92rem; }
.job-meta strong { display: block; font-size: 1rem; margin-bottom: 4px; }
.job h3 { font-family: var(--display); font-weight: 700; font-size: 1.35rem; margin-bottom: 14px; }
.list { padding-left: 20px; display: grid; gap: 10px; color: var(--muted); }
.list li::marker { color: var(--accent); }

/* projects */
.projects { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.project { display: flex; flex-direction: column; gap: 16px; padding: 28px; transition: border-color .2s, transform .2s; }
.project:hover { border-color: var(--accent); }
.project h3 { font-size: 1.4rem; margin: 0; }
.kind { color: var(--accent); font-size: 0.85rem; font-weight: 600; }
.project > p { color: var(--muted); font-size: 0.95rem; }
.project .list { font-size: 0.92rem; }
.project .tags { margin-top: auto; padding-top: 4px; }
.p-top { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.p-top a { font-size: 0.88rem; color: var(--accent); font-weight: 600; white-space: nowrap; }
.p-top a:hover { text-decoration: underline; }

/* education */
.edu { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.edu h3.h { font-family: var(--display); font-weight: 700; font-size: 1.35rem; margin-bottom: 16px; }
.edu .card + .card { margin-top: 12px; }
.edu .card { padding: 20px 24px; }
.edu .card h4 { margin: 0 0 4px; font-size: 1rem; font-weight: 600; }
.edu .card p { color: var(--muted); font-size: 0.88rem; }
.edu .score { color: var(--accent); font-weight: 600; margin-top: 8px; }

/* contact */
.contact { background: var(--code-bg); color: var(--code-ink); border-radius: 24px; padding: clamp(32px, 6vw, 64px); display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: center; }
.contact h2 { font-family: var(--display); font-weight: 800; font-size: clamp(1.75rem, 4vw, 2.6rem); letter-spacing: -0.02em; line-height: 1.1; color: #fff; }
.contact p { margin-top: 12px; color: #a9c2bc; max-width: 440px; }
.c-list { display: grid; gap: 10px; }
.c-item { display: flex; gap: 14px; align-items: center; padding: 14px 18px; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; color: #e7f1ee; font-size: 0.95rem; word-break: break-word; transition: background .2s; }
a.c-item:hover { background: rgba(255,255,255,.07); }
.c-item small { display: block; color: #8fa8a2; font-size: 0.78rem; }

.foot { padding: 28px 0 36px; color: var(--muted); font-size: 0.85rem; text-align: center; }

.hero-grid > * { min-width: 0; }
.hero .lead { max-width: 560px; }
.sec-head { max-width: 620px; }
.skills, .projects, .edu { align-items: stretch; }
.edu > div { display: flex; flex-direction: column; }
.contact > * { min-width: 0; }
@media (min-width: 1100px) {
  .hero-grid { grid-template-columns: 1.1fr 0.9fr; }
  .skills { grid-template-columns: repeat(3, 1fr); }
}

/* tablet */
@media (max-width: 960px) {
  .hero-grid { grid-template-columns: 1fr; }
  .skills { grid-template-columns: repeat(2, 1fr); }
  .contact { grid-template-columns: 1fr; }
}
/* mobile nav + layout */
@media (max-width: 820px) {
  .nav-links { display: none; }
  .burger { display: inline-flex; }
  .drawer.open { display: flex; flex-direction: column; padding: 8px clamp(20px, 5vw, 40px) 20px; border-top: 1px solid var(--line); background: var(--bg); }
  .drawer a { padding: 14px 0; border-bottom: 1px solid var(--line); font-weight: 500; }
  .drawer .btn { margin-top: 16px; border: 0; padding: 12px; }
  .projects, .edu { grid-template-columns: 1fr; }
  .job { grid-template-columns: 1fr; gap: 10px; }
}
@media (max-width: 560px) {
  .skills { grid-template-columns: 1fr; }
  .actions .btn { flex: 1 1 100%; }
  .p-top { flex-direction: column; gap: 4px; }
  .code { font-size: 0.76rem; }
}
`;

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => window.innerWidth > 820 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const close = () => setOpen(false);

  return (
    <div className="pf">
      <style>{CSS}</style>

      <header className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="brand">Payal Jadhao</a>
          <nav className="nav-links" aria-label="Primary">
            {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
            <a href="#contact" className="btn btn-solid">Contact me</a>
          </nav>
          <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        <div className={`drawer${open ? ' open' : ''}`}>
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={close}>{label}</a>)}
          <a href="#contact" className="btn btn-solid" onClick={close}>Contact me</a>
        </div>
      </header>

      <main id="top">
        <section id="about" className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="status"><span className="dot" />Open to Java full-stack roles</div>
              <h3>Java Full-Stack Developer | React.js Specialist | Generative & Agentic AI</h3>
              <p className="lead">
                Computer Science graduate and Developer experienced in Java full-stack engineering using Spring Boot, Microservices, REST APIs, React.js, and TypeScript. Skilled in architecting secure web systems, optimizing frontend rendering, containerizing with Docker and Kubernetes, and building AI-driven solutions using LLMs and the Gemini API.
              </p>
              <div className="actions">
                <a href="#projects" className="btn btn-solid">🚀 See my projects</a>
                <a href="#contact" className="btn btn-ghost">💬 Get in touch</a>
              </div>
              <div className="social-btns">
                <a className="btn btn-ghost" href="https://github.com/Payal-Jadhao" target="_blank" rel="noreferrer">🐙 GitHub</a>
                <a className="btn btn-ghost" href="https://linkedin.com/in/payaljadhao" target="_blank" rel="noreferrer">💼 LinkedIn</a>
                <a className="btn btn-ghost" href="mailto:payaljadhao2709@gmail.com">✉️ Email</a>
              </div>
            </div>

            <div className="snap">
              <div className="snap-head">
                <span className="avatar">PJ</span>
                <div><strong>Payal Jadhao</strong><small>Java Full-Stack & AI Developer</small></div>
              </div>
              <div className="pillar">
                <span className="emo">☕</span>
                <div><h3>Java Full-Stack & Microservices</h3><p>Enterprise backends with Spring Boot, Spring Security, JWT, Hibernate/JPA, REST APIs, Docker, and Microservices.</p></div>
              </div>
              <div className="pillar">
                <span className="emo">⚛️</span>
                <div><h3>React.js & Frontend</h3><p>Hands-on production experience in React.js, TypeScript, Tailwind CSS, and state flow, delivering ~12% faster load times.</p></div>
              </div>
              <div className="pillar">
                <span className="emo">🤖</span>
                <div><h3>LLM & Agentic AI</h3><p>Prompt engineering, context-window design, and Gemini AI API integration to power contextual generation in DevPrepPal.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="sec">
          <div className="wrap">
            <div className="sec-head">
              <h2>Skills</h2>
              <p>Core technical proficiencies across backend, frontend, databases, DevOps, and AI engineering.</p>
            </div>
            <div className="skills">
              {SKILLS.map(([title, items]) => (
                <div className="card" key={title}>
                  <h3>{title}</h3>
                  <div className="tags">{items.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head"><h2>Experience</h2></div>
            <article className="job">
              <div className="job-meta">
                <strong>June 2025 – Oct 2025</strong>
                <p>Edgemine Technologies LLP</p>
              </div>
              <div>
                <h3>Developer</h3>
                <ul className="list">
                  <li>Designed, developed, and maintained responsive application features using React.js, TypeScript, HTML5, and CSS3 with Tailwind/Grid layouts, improving page load time by ~12%.</li>
                  <li>Developed and integrated REST APIs for CRUD operations, performing debugging and optimization that improved real-time data-rendering efficiency by ~15%.</li>
                  <li>Collaborated with a cross-functional team of 4–5 members in an Agile environment, participating in code reviews and managing API data flow and state with centralized error handling, reducing UI-related errors by ~10%.</li>
                  <li>Followed coding standards and best practices to ensure code quality, worked with CI/CD pipelines and Docker-based deployments to streamline releases, and researched new technologies to improve development efficiency.</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head">
              <h2>Projects</h2>
              <p>Full-stack and AI-driven applications showcasing architecture, performance, and API integration.</p>
            </div>
            <div className="projects">
              {PROJECTS.map((p) => (
                <article className="card project" key={p.name}>
                  <div className="p-top">
                    <h3>{p.name}</h3>
                    <a href="https://github.com/Payal-Jadhao" target="_blank" rel="noreferrer">View on GitHub</a>
                  </div>
                  <p className="kind">{p.kind}</p>
                  <p>{p.text}</p>
                  <ul className="list">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                  <div className="tags">{p.stack.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap edu">
            <div>
              <h3 className="h">Education</h3>
              <div className="card">
                <h4>Bachelor of Engineering (B.E.) - Computer Science</h4>
                <p>COE&amp;T, Akola · 2021 – 2025</p>
                <p className="score">CGPA: 8.56 / 10</p>
              </div>
              <div className="card">
                <h4>Jay Bajrang High School and Jr. College, Kumbhari</h4>
                <p>HSC · 88.17% (2019 – 2021)</p>
              </div>
              <div className="card">
                <h4>JC High School, Karanja</h4>
                <p>SSC · 85.40%</p>
              </div>
            </div>
            <div>
              <h3 className="h">Certifications</h3>
              <div className="card">
                <h4>Spring Boot Masterclass: Beginner to Advanced</h4>
                <p>Udemy (32.5 hours), Selfcode Academy</p>
              </div>
              <div className="card">
                <h4>React JS Free Course</h4>
                <p>Certificate of Excellence, Scaler Topics</p>
              </div>
              <div className="card">
                <h4>Implement DevOps Workflows in Google Cloud</h4>
                <p>Google Cloud Skill Badge</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="contact">
              <div>
                <h2>Open to New Opportunities!</h2>
                <p>I am seeking a Developer role to build and maintain robust Java applications and AI-powered solutions. Whether you have an opportunity or want to collaborate, feel free to reach out!</p>
              </div>
              <div className="c-list">
                <a className="c-item" href="mailto:payaljadhao2709@gmail.com"><span><small>📧 Email</small>payaljadhao2709@gmail.com</span></a>
                <a className="c-item" href="tel:+917507394873"><span><small>📞 Phone</small>+91 7507394873</span></a>
                <a className="c-item" href="https://payal-jadhao.github.io/PAYAL-PORTFOLIO" target="_blank" rel="noreferrer"><span><small>🌐 Live Portfolio</small>payal-jadhao.github.io/PAYAL-PORTFOLIO</span></a>
                <div className="c-item"><span><small>📍 Location</small>Maharashtra, India</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">© {new Date().getFullYear()} Payal Jadhao</footer>
    </div>
  );
}