import { useState, useEffect } from 'react';

const NAV = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['education', 'Education'],
];

const SKILLS = [
  ['Programming Language', ['Java']],
  ['Backend', ['Spring Boot', 'Spring Security', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'Microservices', 'JWT', 'WebSocket']],
  ['Frontend', ['React.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS']],
  ['Database', ['MySQL', 'PostgreSQL', 'MongoDB']],
  ['DevOps & Deployment', ['Docker', 'Kubernetes', 'CI/CD Pipelines']],
  ['GenAI', ['Generative AI (Gemini API)', 'Prompt Engineering']],
];

const PROJECTS = [
  {
    name: 'DevPrepPal',
    kind: 'AI-Powered Developer Preparation Platform · Final Year B.E. R&D Project',
    link: ['https://dev-prep-pal.vercel.app', 'View live'],
    points: [
      'Built a secure Spring Boot backend with Spring Security, JWT and MongoDB, improving interview lifecycle processing by ~5%.',
      'Used Generative AI (Gemini) to create role-specific interview questions from resumes, up to 25 per session.',
      'Developed a React.js UI with live chat, quizzes and score analytics, improving engagement by ~10%.',
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'MongoDB', 'React.js', 'Gemini API', 'REST APIs', 'Microservices', 'Docker'],
  },
  {
    name: 'TeamCRM',
    kind: 'CRM & Task Management Platform with AI Copilot · R&D Project',
    link: ['https://team-crm-iota.vercel.app', 'View live'],
    points: [
      'Built a full-stack CRM and Jira-style task platform with Admin, Manager and Employee roles using JWT (access + refresh) and method-level RBAC.',
      'Designed a server-authoritative time tracker with live WebSocket sync to prevent time tampering.',
      'Developed a Gemini-based GenAI Copilot over live task, deal and meeting data, with one-click AI-to-task conversion.',
      'Implemented OTP-based authentication.',
    ],
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'WebSocket', 'PostgreSQL', 'React.js', 'TypeScript', 'Tailwind CSS', 'Gemini API'],
  },
];

const RESUME_URL = 'https://drive.google.com/file/d/18VKHkZP6Alz8xVQrVAbousjS-riIDHQy/view?usp=drivesdk';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600&display=swap');

:root, .pf {
  --bg: #f4f7f6; --surface: #ffffff; --ink: #10201d; --muted: #52645f;
  --line: #d9e2df; --accent: #0b6b61; --accent-ink: #ffffff; --tint: #e3f0ed;
  --code-bg: #10201d; --code-ink: #cfe3de;
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
.sec-head { margin-bottom: clamp(28px, 5vw, 48px); max-width: 620px; }
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
.hero-in { max-width: 1200px; display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: clamp(28px, 5vw, 64px); align-items: center; }
.hero h1 { font-family: var(--display); font-weight: 800; font-size: clamp(2.2rem, 6vw, 4rem); line-height: 1.05; letter-spacing: -0.035em; }
.hero h3 { font-family: var(--display); font-weight: 700; font-size: clamp(1.35rem, 2.5vw, 1.65rem); line-height: 1.25; letter-spacing: -0.015em; }
.hero .lead { color: var(--muted); font-size: clamp(1rem, 2vw, 1.15rem); margin: 22px 0 0; }
.hero-side { background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 24px; display: grid; gap: 12px; }
.hero-side-title { font-family: var(--display); font-weight: 700; font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
.hero-side .btn { width: 100%; justify-content: flex-start; }
.hero-side .btn:hover { background: #e4e9e8; border-color: #c9d3d0; color: var(--ink); transform: none; }
@media (prefers-color-scheme: dark) { .hero-side .btn:hover { background: #1f302d; border-color: #35504b; color: var(--ink); } }
.hero-side .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

/* skills */
.skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; align-items: stretch; }
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
.projects { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; align-items: stretch; }
.project { display: flex; flex-direction: column; gap: 16px; padding: 28px; transition: border-color .2s; }
.project:hover { border-color: var(--accent); }
.project h3 { font-size: 1.4rem; margin: 0; }
.kind { color: var(--accent); font-size: 0.85rem; font-weight: 600; }
.project .list { font-size: 0.92rem; }
.project .tags { margin-top: auto; padding-top: 4px; }
.p-top { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.p-top a { font-size: 0.88rem; color: var(--accent); font-weight: 600; white-space: nowrap; }
.p-top a:hover { text-decoration: underline; }

/* education */
.edu { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: stretch; }
.edu > div { display: flex; flex-direction: column; }
.edu h3.h { font-family: var(--display); font-weight: 700; font-size: 1.35rem; margin-bottom: 16px; }
.edu .card + .card { margin-top: 12px; }
.edu .card { padding: 20px 24px; }
.edu .card h4 { margin: 0 0 4px; font-size: 1rem; font-weight: 600; }
.edu .card p { color: var(--muted); font-size: 0.88rem; }
.edu .score { color: var(--accent); font-weight: 600; margin-top: 8px; }

/* contact */
.contact { background: var(--code-bg); color: var(--code-ink); border-radius: 24px; padding: clamp(32px, 6vw, 64px); display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: center; }
.contact > * { min-width: 0; }
.contact h2 { font-family: var(--display); font-weight: 800; font-size: clamp(1.75rem, 4vw, 2.6rem); letter-spacing: -0.02em; line-height: 1.1; color: #fff; }
.contact p { margin-top: 12px; color: #a9c2bc; max-width: 440px; }
.c-list { display: grid; gap: 10px; }
.c-item { display: flex; gap: 14px; align-items: center; padding: 14px 18px; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; color: #e7f1ee; font-size: 0.95rem; word-break: break-word; transition: background .2s; }
a.c-item:hover { background: rgba(255,255,255,.07); }
.c-item small { display: block; color: #8fa8a2; font-size: 0.78rem; margin-bottom: 2px; }

.foot { padding: 28px 0 36px; color: var(--muted); font-size: 0.85rem; text-align: center; }

@media (max-width: 960px) {
  .skills { grid-template-columns: repeat(2, 1fr); }
  .contact { grid-template-columns: 1fr; }
}
@media (max-width: 820px) {
  .nav-links { display: none; }
  .burger { display: inline-flex; }
  .drawer.open { display: flex; flex-direction: column; padding: 8px clamp(20px, 5vw, 40px) 20px; border-top: 1px solid var(--line); background: var(--bg); }
  .drawer a { padding: 14px 0; border-bottom: 1px solid var(--line); font-weight: 500; }
  .drawer .btn { margin-top: 16px; border: 0; padding: 12px; }
  .hero-in { grid-template-columns: 1fr; }
  .projects, .edu { grid-template-columns: 1fr; }
  .job { grid-template-columns: 1fr; gap: 10px; }
}
@media (max-width: 560px) {
  .skills { grid-template-columns: 1fr; }
  .hero-side .row { grid-template-columns: 1fr; }
  .p-top { flex-direction: column; gap: 4px; }
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
          <div className="wrap hero-in">
            <div>
              <h3>Software Engineer | React.js Developer | Java Full-Stack (Spring Boot) | Generative AI</h3>
              <p className="lead">
                Software Engineer with 1+ year of experience as a Developer building web applications and integrating REST APIs using React.js, TypeScript and Tailwind CSS in Agile teams. Self-learning Java full stack development and have built two full-stack projects using Java, Spring Boot, Spring Security, JWT, MongoDB/PostgreSQL and the Gemini Generative AI API. Seeking a Java Full Stack Developer / Software Engineer role.
              </p>
            </div>

            <aside className="hero-side" aria-label="Quick links">
              <p className="hero-side-title">Quick links</p>
              <a className="btn btn-ghost" href={RESUME_URL} target="_blank" rel="noreferrer">📄 View Resume</a>
              <a className="btn btn-ghost" href="#projects">🚀 See my projects</a>
              <a className="btn btn-ghost" href="#contact">💬 Get in touch</a>
              <div className="row">
                <a className="btn btn-ghost" href="https://github.com/Payal-Jadhao" target="_blank" rel="noreferrer">🐙 GitHub</a>
                <a className="btn btn-ghost" href="https://linkedin.com/in/payaljadhao" target="_blank" rel="noreferrer">💼 LinkedIn</a>
              </div>
            </aside>
          </div>
        </section>

        <section id="skills" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head">
              <h2>Technical Skills</h2>
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
            <div className="sec-head"><h2>Professional Experience</h2></div>
            <article className="job">
              <div className="job-meta">
                <strong>June 2025 – Oct 2026</strong>
                <p>Edgemine Technologies LLP</p>
              </div>
              <div>
                <h3>Developer</h3>
                <ul className="list">
                  <li>Built responsive application features using React.js, TypeScript, HTML5 and CSS3 with Tailwind/Grid layouts, improving page load time by ~12%.</li>
                  <li>Integrated REST APIs for CRUD operations; debugging and optimization improved real-time data-rendering efficiency by ~15%.</li>
                  <li>Worked in an Agile team of 4–5 members, doing code reviews and managing API data flow and state with centralized error handling, reducing UI errors by ~10%.</li>
                  <li>Followed coding standards and best practices; worked with CI/CD pipelines and Docker-based deployments.</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="projects" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="sec-head"><h2>Projects</h2></div>
            <div className="projects">
              {PROJECTS.map((p) => (
                <article className="card project" key={p.name}>
                  <div className="p-top">
                    <h3>{p.name}</h3>
                    {p.link && <a href={p.link[0]} target="_blank" rel="noreferrer">{p.link[1]}</a>}
                  </div>
                  <p className="kind">{p.kind}</p>
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
                <h4>Bachelor of Engineering (B.E.) – Computer Science</h4>
                <p>COE&amp;T, Akola · 2021 – 2025</p>
                <p className="score">CGPA: 8.56</p>
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
            </div>
          </div>
        </section>

        <section id="contact" className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="contact">
              <div>
                <h2>Open to New Opportunities!</h2>
                <p>Seeking a Java Full Stack Developer / Software Engineer role to build robust web applications and AI-powered solutions. Whether you have an opportunity or want to collaborate, feel free to reach out!</p>
              </div>
              <div className="c-list">
                <a className="c-item" href="mailto:payaljadhao2709@gmail.com"><span><small>📧 Email</small>payaljadhao2709@gmail.com</span></a>
                <a className="c-item" href="tel:+917507394873"><span><small>📞 Phone</small>+91 7507394873</span></a>
                <a className="c-item" href="https://payal-jadhao.github.io/PAYAL-PORTFOLIO/" target="_blank" rel="noreferrer"><span><small>🌐 Portfolio</small>payal-jadhao.github.io/PAYAL-PORTFOLIO/</span></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">© {new Date().getFullYear()} Payal Jadhao</footer>
    </div>
  );
}