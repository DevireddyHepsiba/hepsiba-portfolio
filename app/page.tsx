'use client';
import Image from 'next/image';
import AsciiImage from './AsciiImage';
import { useEffect, useState } from 'react';
import styles from './portfolio.module.scss';

const projects = [
  {
    number: '01', title: 'AI Learning Platform', category: 'PRODUCT DEVELOPMENT', status: 'LIVE DEMO',
    summary: 'A study workspace described in the public repository: upload PDFs, chat with documents, generate summaries, flashcards, and quizzes, track progress, and collaborate in live study sessions.',
    contribution: 'The project brings individual review and group learning into one document-centered workflow.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Gemini'],
    repository: 'https://github.com/DevireddyHepsiba/AI-learning-Platform', demo: 'https://ai-learning-platform-silk-eight.vercel.app/',
  },
  {
    number: '02', title: 'Store', category: 'PERN · E-COMMERCE', status: 'APR 2026',
    summary: 'The résumé describes a commerce project with product management, account access, payments, order tracking, and a customer-support experience with chat and video.',
    contribution: 'Listed integrations include Clerk, Stream Chat & Video, Polar, ImageKit, and Sentry. The project and demo links are included for direct review.',
    stack: ['PostgreSQL', 'Express', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'Clerk', 'Stream', 'Polar', 'ImageKit', 'Sentry'],
    repository: 'https://github.com/DevireddyHepsiba/Store', demo: 'https://store-beryl-five.vercel.app/',
  },
  {
    number: '03', title: 'Code Bridge', category: 'AI · COMMUNICATION', status: 'EXPLORATORY',
    summary: 'A presentation-coaching idea described in the repository, focused on helping people reflect on how they communicate.',
    contribution: 'The repository proposes signals such as gestures, posture, eye contact, voice, and content. The implementation and working capabilities still need confirmation.',
    stack: ['AI exploration', 'Presentation coaching'],
    repository: 'https://github.com/DevireddyHepsiba/code_bridge',
  },
];

const skills = [
  { title: 'LANGUAGES', items: ['Java', 'Python', 'JavaScript', 'SQL'] },
  { title: 'FRONTEND', items: ['React.js', 'HTML5', 'CSS3', 'Bootstrap'] },
  { title: 'BACKEND', items: ['Spring Boot', 'Spring MVC', 'Node.js', 'Express.js', 'REST APIs', 'JPA / Hibernate'] },
  { title: 'DATABASES', items: ['MySQL', 'PostgreSQL', 'MongoDB'] },
  { title: 'AWS', items: ['EC2', 'S3', 'DynamoDB', 'Lambda', 'CloudWatch', 'CloudTrail', 'SNS', 'SQS'] },
  { title: 'TOOLS & FOUNDATIONS', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'DSA', 'OOP', 'DBMS'] },
];

const achievements = [
  { title: 'Zuvy Scholar', detail: 'Selected among 2,000+ applicants.' },
  { title: 'TCS CodeVita · Season 13', detail: 'Global rank 17,720.' },
  { title: 'Problem solving', detail: '300+ problems solved across LeetCode and GeeksforGeeks.' },
  { title: 'SRKR Coding Club', detail: 'Executive Body Member.' },
];

const certifications = [
  { title: 'AWS Certified Solutions Architect Associate', issuer: 'GeeksforGeeks', href: 'https://drive.google.com/file/d/1Jzk9GrrTEeVzW74M4WR6V3pkE4sL1cuR/view?usp=sharing' },
  { title: 'Programming in Java', issuer: 'NPTEL', href: 'https://drive.google.com/file/d/1A5pv3IF_mQf9jxRlHuhJ89q8H9PLbwPs/view?usp=sharing' },
  { title: 'Data Structures and Algorithms using Java', issuer: 'Issuer not listed on résumé', href: 'https://drive.google.com/file/d/1EtB-q9rqmlaQyg4xEzlnc3snkZeXV_J1/view?usp=sharing' },
];

const focusAreas = [
  { n: '01', title: 'Build', detail: 'Thoughtful web experiences across frontend and backend.' },
  { n: '02', title: 'Explore', detail: 'AI-powered applications and the problems they can solve.' },
  { n: '03', title: 'Create', detail: 'Video editing and visual storytelling, still in progress.' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add('js');
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('js');
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return <main>
    <a className={styles.skipLink} href="#content">Skip to content</a>
    <header className={styles.header}>
      <a href="#top" className={styles.nameLink} aria-label="Hepsiba Devireddy, home">Hepsiba Devireddy</a>
      <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation">{menuOpen ? 'Close −' : 'Menu +'}</button>
      <nav id="main-navigation" className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Main navigation" onClick={closeMenu}>
        <a href="#work">Work</a><a href="#about">About</a><a href="#journey">Journey</a><a href="#contact" className={styles.navCta}>Let’s talk <span>↗</span></a>
      </nav>
    </header>
    <aside className={styles.sideIndex} aria-label="Page sections"><a href="#top"><span>01</span> PRESENCE</a><a href="#journey"><span>02</span> JOURNEY</a><a href="#work"><span>03</span> WORK</a><a href="#recognition"><span>04</span> RECOGNITION</a><a href="#contact"><span>05</span> NEXT</a></aside>

    <div className={styles.heroScene} data-ascii-stage>
      <section className={styles.hero} id="top" data-ascii-sticky>
      <div className={styles.heroTopline}><span>COMPUTER SCIENCE · WEB DEVELOPMENT</span><span>BHIMAVARAM · ANDHRA PRADESH</span></div>
      <div className={styles.heroPortrait}>
        <div className={styles.portraitHalo} aria-hidden="true" />
        <AsciiImage className={styles.heroAscii} src="/images/portrait-full.png" alt="Hepsiba Devireddy, standing in a light blazer" fit="contain" position="center bottom" priority sizes="(max-width: 640px) 82vw, 420px" />
      </div>
      <p className={styles.heroEyebrow}><span /> FULL-STACK DEVELOPER · STUDENT · BUILDER</p>
      <h1>Hepsiba <em>Devireddy</em></h1>
      <p className={styles.heroIntro}>I build practical web applications, explore AI-powered ideas, and keep learning by making.</p>
      <div className={styles.heroActions}><a className={styles.primaryAction} href="#work">Explore my work <span>↓</span></a><a className={styles.textAction} href="https://www.linkedin.com/in/hepsiba-devireddy-2685622a6/" target="_blank" rel="noreferrer">Start a conversation <span>↗</span></a></div>
      <div className={styles.heroBottom}><span>SCROLL TO DISCOVER ↓</span><span>BUILDING · LEARNING · EXPLORING</span><span>01 / 08</span></div>
      </section>
    </div>

    <div className={styles.focusStrip} aria-label="Areas of focus">
      {focusAreas.map((area) => <div className={styles.focusItem} key={area.n}><span>{area.n}</span><h2>{area.title}</h2><p>{area.detail}</p></div>)}
    </div>

    <div id="content">
      <section className={styles.about} id="about">
        <div className={styles.sectionHead} data-reveal><span>02 / ABOUT</span><span>THE PERSON BEHIND THE WORK</span></div>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutVisual} data-reveal>
            
            <Image src="/images/portrait-workspace.png" alt="Hepsiba working at her desk" fill sizes="(max-width: 760px) 88vw, 42vw" />
            <span>IN THE WORKSHOP · LEARNING THROUGH BUILDING</span>
          </div>
          <div className={styles.aboutCopy} data-reveal>
            <p className={styles.kicker}>A HUMAN STORY IN A DIGITAL WORLD</p>
            <h2>Technology is<br />the starting point.<br /><em>People are the point.</em></h2>
            <p>I’m a Computer Science and Engineering student at SRKR Engineering College in Bhimavaram. I’m interested in the full shape of a web product: the interface people use, the systems behind it, and the details that help it work as intended.</p>
            <p>I’m building practical experience through personal projects, while exploring AI applications and developing a creative eye through video editing.</p>
            <div className={styles.socialLinks}><a href="https://github.com/DevireddyHepsiba" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/hepsiba-devireddy-2685622a6/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://leetcode.com/u/Striver_girl/" target="_blank" rel="noreferrer">LeetCode ↗</a></div>
            <p className={styles.educationNote}>B.TECH · CSE · SRKR ENGINEERING COLLEGE<br />2023–2027 · CGPA 8.94 / 10</p>
          </div>
        </div>
      </section>

      <section className={styles.journey} id="journey">
        <div className={styles.sectionHead} data-reveal><span>03 / EXPERIENCE & EDUCATION</span><span>LEARNING IN PRACTICE</span></div>
        <div className={styles.journeyGrid}>
          <article className={styles.journeyColumn} data-reveal>
            <p className={styles.kicker}>PROFESSIONAL EXPERIENCE</p>
            <div className={styles.journeyEntry}>
              <span className={styles.journeyDate}>AUG — SEP<br />2025</span>
              <div><p className={styles.journeyRole}>Java Developer Intern</p><p className={styles.journeyOrg}>Infosys Springboard 6.0 · Remote</p><p className={styles.journeyDetail}>Implemented authentication, RESTful APIs, and AI-powered PDF generation features as part of a collaborative full-stack project.</p></div>
            </div>
          </article>
          <article className={styles.journeyColumn} data-reveal>
            <p className={styles.kicker}>EDUCATION</p>
            <div className={styles.journeyEntry}>
              <span className={styles.journeyDate}>2023 — 2027</span>
              <div><p className={styles.journeyRole}>B.Tech · Computer Science and Engineering</p><p className={styles.journeyOrg}>SRKR Engineering College · Bhimavaram, Andhra Pradesh</p><p className={styles.journeyDetail}>CGPA 8.94 / 10</p></div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.work} id="work">
        <div className={styles.sectionHead} data-reveal><span>04 / WORK IN PROGRESS</span><span>SELECTED PROJECTS</span></div>
        <div className={styles.workIntro} data-reveal><h2>Proof of work.<br /><em>Room to grow.</em></h2><p>Projects are where I turn questions into something people can try, inspect, and build on.</p></div>
        <div className={styles.projectList}>
          {projects.map((project) => <details className={styles.project} key={project.number} data-reveal>
            <summary><span className={styles.projectNumber}>{project.number} / {project.category}</span><span className={styles.projectTitle}>{project.title}</span><span className={styles.projectStatus}>{project.status}</span><span className={styles.projectArrow} aria-hidden="true">↗</span></summary>
            <div className={styles.projectBody}><div><p>{project.summary}</p><p>{project.contribution}</p><ul className={styles.tags}>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div><div className={styles.projectActions}><a href={project.repository} target="_blank" rel="noreferrer">VIEW SOURCE ↗</a>{project.demo && <a href={project.demo} target="_blank" rel="noreferrer">OPEN LIVE DEMO ↗</a>}</div></div>
          </details>)}
        </div>
        <p className={styles.projectNote}>AI Learning Platform details reflect its public repository. Store details reflect the résumé. Linked demo availability can change.</p>
      </section>

      <section className={styles.recognition} id="recognition">
        <div className={styles.sectionHead} data-reveal><span>05 / RECOGNITION</span><span>ACHIEVEMENTS & CERTIFICATIONS</span></div>
        <div className={styles.recognitionGrid}>
          <div className={styles.recognitionColumn} data-reveal>
            <p className={styles.kicker}>MILESTONES</p>
            <ul className={styles.recognitionList}>{achievements.map((item) => <li key={item.title}><span>{item.title}</span><p>{item.detail}</p></li>)}</ul>
          </div>
          <div className={styles.recognitionColumn} data-reveal>
            <p className={styles.kicker}>CERTIFICATIONS</p>
            <ul className={styles.certificationList}>{certifications.map((item) => <li key={item.title}><div><span>{item.title}</span><p>{item.issuer}</p></div><a href={item.href} target="_blank" rel="noreferrer" aria-label={"View " + item.title + " certificate"}>VIEW ↗</a></li>)}</ul>
          </div>
        </div>
      </section>

      <section className={styles.focus} id="approach">
        <div className={styles.sectionHead} data-reveal><span>06 / THE TOOLKIT</span><span>LEARNING BY BUILDING</span></div>
        <div className={styles.focusGrid}>
          <div className={styles.focusHeading} data-reveal><p className={styles.kicker}>CURRENT PRACTICE</p><h2>Curious by nature.<br /><em>Practical by design.</em></h2><p>I’m growing my range through real implementation work and careful iteration.</p></div>
          <div className={styles.capabilityList} data-reveal>
            {skills.map((group, index) => <div key={group.title}><span>{String(index + 1).padStart(2, '0')} / {group.title}</span><ul className={styles.capabilityTags}>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}
          </div>
        </div>
      </section>

      <section className={styles.creative}>
        <div className={styles.creativeText} data-reveal><p className={styles.kicker}>A SECOND WAY OF THINKING IN MOTION</p><h2>Video editing.<br /><em>Still becoming.</em></h2><p>I’m exploring how cuts, pacing, sound, and imagery shape a story. A gallery can join when I have finished samples to share.</p></div>
        <div className={styles.editingFrame} aria-hidden="true"><div className={styles.frameLine} /><div className={styles.frameCore}>CUT<br /><em>TO</em><br />IDEA</div><div className={styles.frameTicks}>00:00:01:08　│　PLAYBACK / LEARNING</div></div>
      </section>

      <section className={styles.contact} id="contact">
        <div className={styles.sectionHead} data-reveal><span>08 / THE NEXT CHAPTER</span><span>OPEN TO OPPORTUNITIES</span></div>
        <div className={styles.contactContent} data-reveal><p className={styles.kicker}>INTERNSHIPS · ENTRY-LEVEL ROLES · COLLABORATIONS</p><h2>Make it clear.<br /><em>Make it count.</em></h2><p>I’m looking for opportunities to contribute to useful products, learn from a team, and grow as a software developer.</p><div className={styles.contactDetails}><a href="mailto:hepsibadevireddy@gmail.com">hepsibadevireddy@gmail.com</a><a href="tel:+917702997635">+91 77029 97635</a><span>Bhimavaram, Andhra Pradesh</span></div><div className={styles.contactActions}><a className={styles.contactButton} href="https://www.linkedin.com/in/hepsiba-devireddy-2685622a6/" target="_blank" rel="noreferrer">Connect on LinkedIn <span>↗</span></a><a className={styles.resumeButton} href="/resume.pdf" download>Download résumé <span>↓</span></a></div></div>
        <footer className={styles.footer}><span>HEPSIBA DEVIREDDY · FULL-STACK DEVELOPMENT</span><a href="#top">BACK TO TOP ↑</a><span>MADE WITH INTENTION · 2026</span></footer>
      </section>
    </div>
  </main>;
}
