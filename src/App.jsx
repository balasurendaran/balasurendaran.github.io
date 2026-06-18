import { useState } from 'react';
import { GitFork, Link, Mail, Phone, MapPin, ExternalLink, Package } from 'lucide-react';

// Icon aliases
const Github = (props) => <GitFork {...props} />;
const Linkedin = (props) => <Link {...props} />;
import { profile, stats, clientProjects, sideProjects, experience, skills, domains } from './data';
import './index.css';

const TABS = ['Projects', 'Side Projects', 'Experience', 'Skills', 'About'];

export default function App() {
  const [activeTab, setActiveTab] = useState('Projects');

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <p className="hero-tag">Senior Software Engineer · Front End · React.js</p>
          <h1 className="hero-name">
            Bala <span>Surendaran.</span> R
          </h1>
          <p className="hero-subtitle">
            {profile.company} &nbsp;·&nbsp; {profile.location} &nbsp;·&nbsp; {profile.experience} Years IT Experience
          </p>
          <div className="hero-stats">
            {stats.map(s => (
              <div key={s.label}>
                <span className="hero-stat-num">{s.num}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="hero-divider" />
          <div className="hero-links">
            <a className="hero-link" href={`tel:${profile.phone}`}>
              <Phone size={14} /> {profile.phone}
            </a>
            <a className="hero-link" href={`mailto:${profile.email}`}>
              <Mail size={14} /> {profile.email}
            </a>
            <a className="hero-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a className="hero-link" href={profile.github} target="_blank" rel="noreferrer">
              <Github size={14} /> GitHub
            </a>
            <a className="hero-link" href={profile.npm} target="_blank" rel="noreferrer">
              <Package size={14} /> npm
            </a>
          </div>
        </div>
      </section>

      {/* CLIENT STRIP */}
      <div className="clients-strip">
        <div className="container">
          <div className="clients-inner">
            <span className="clients-label">Worked with</span>
            <div className="clients-list">
              {['Samsung', 'Disney', 'Scopely', "Land O'Lakes", 'Programming.com'].map(c => (
                <span key={c} className="client-name">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STICKY TABS */}
      <nav className="tabs-bar">
        <div className="container">
          <div className="tabs-inner">
            {TABS.map(tab => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="main-content">
        <div className="container">

          {/* PROJECTS */}
          <div className={`section ${activeTab === 'Projects' ? 'active' : ''}`}>
            <h2 className="section-heading">Client Projects</h2>
            <p className="section-sub">10 production projects delivered for global enterprise clients</p>
            <div className="projects-grid">
              {clientProjects.map(p => (
                <div key={p.id} className={`project-card ${p.current ? 'current-project' : ''}`}>
                  <div className="project-header">
                    <div className="project-logo" style={{ background: p.logoBg }}>{p.logo}</div>
                    <div className="project-meta">
                      <div className="project-name">
                        {p.name}
                        {p.current && <span className="current-badge">Current</span>}
                      </div>
                      <div className="project-company">{p.company}</div>
                    </div>
                    <div className="project-period">{p.period}</div>
                  </div>
                  <div className="role-badge">{p.role}</div>
                  <p className="project-desc">{p.description}</p>
                  <div className="tech-pills">
                    {p.tech.map(t => (
                      <span key={t} className={`pill ${p.highlight.includes(t) ? 'highlight' : ''}`}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDE PROJECTS */}
          <div className={`section ${activeTab === 'Side Projects' ? 'active' : ''}`}>
            <h2 className="section-heading">Side Projects</h2>
            <p className="section-sub">Personal builds, open-source tools, and indie SaaS products</p>
            <div className="side-grid">
              {sideProjects.map(p => (
                <div key={p.id} className={`side-card ${p.id === 1 ? 'npm-featured' : ''}`}>
                  <div className="side-card-top">
                    <span className="side-emoji">{p.emoji}</span>
                    <div>
                      <div className="side-name">{p.name}</div>
                      <div className="side-type">{p.type}</div>
                    </div>
                  </div>
                  <p className="side-desc">{p.description}</p>
                  <div className="tech-pills" style={{ marginBottom: '14px' }}>
                    {p.tech.map(t => (
                      <span key={t} className="pill" style={p.id === 1 ? { background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', border: '0.5px solid rgba(255,255,255,0.2)' } : {}}>{t}</span>
                    ))}
                  </div>
                  <div className="side-footer">
                    {p.live && (
                      <span className="live-badge">
                        <span className="live-dot" /> Live
                      </span>
                    )}
                    <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                      {p.url && (
                        <a className="side-link" href={p.url} target="_blank" rel="noreferrer">
                          <ExternalLink size={12} /> {p.id === 1 ? 'GitHub' : p.live ? 'Visit' : 'GitHub'}
                        </a>
                      )}
                      {p.npmUrl && (
                        <a className="side-link" href={p.npmUrl} target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)', borderColor: 'rgba(255,255,255,0.2)' }}>
                          <Package size={12} /> npm
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className={`section ${activeTab === 'Experience' ? 'active' : ''}`}>
            <h2 className="section-heading">Experience</h2>
            <p className="section-sub">8+ years across technical support, full-stack, and senior front-end engineering</p>
            <div className="timeline">
              {experience.map((e, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-period">{e.period} &nbsp;·&nbsp; {e.duration}</div>
                  <div className="timeline-role">{e.role}</div>
                  <div className="timeline-company">{e.company}</div>
                  <p className="timeline-desc">{e.description}</p>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.3rem', color: 'var(--navy)', margin: '2.5rem 0 1rem' }}>Domain Expertise</h3>
            <div className="domains-list">
              {domains.map((d, i) => (
                <div key={i} className="domain-item">
                  <div className="domain-emoji">{d.emoji}</div>
                  <div>
                    <div className="domain-name">{d.name}</div>
                    <div className="domain-dur">{d.duration}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="edu-card">
              <div className="edu-icon">🎓</div>
              <div>
                <div className="edu-degree">M.Sc. Software Engineering</div>
                <div className="edu-school">Sri Krishna College of Engineering and Technology, Coimbatore</div>
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className={`section ${activeTab === 'Skills' ? 'active' : ''}`}>
            <h2 className="section-heading">Technical Skills</h2>
            <p className="section-sub">Full-stack proficiency with a React.js specialization</p>
            <div className="skills-grid">
              {skills.map((g, i) => (
                <div key={i} className="skill-group">
                  <div className="skill-group-title">{g.group}</div>
                  {g.items.map(item => (
                    <div key={item} className="skill-item">
                      <span className="skill-dot" />
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ABOUT */}
          <div className={`section ${activeTab === 'About' ? 'active' : ''}`}>
            <h2 className="section-heading">About Me</h2>
            <p className="section-sub">Senior React.js engineer, indie builder, and open-source contributor</p>

            <div className="avail-banner">
              <div className="avail-dot" />
              <div>
                <div className="avail-text">Open to new opportunities</div>
                <div className="avail-sub">Senior React.js / Full-Stack roles · Open to relocation</div>
              </div>
            </div>

            <div className="profile-summary">
              Senior Software Engineer with <strong>8+ years of IT experience</strong> and deep specialization in React.js front-end development. Currently at Mobile Programming Pvt. Ltd., delivering production applications for global enterprise brands — Samsung, Disney, Scopely, and Land O'Lakes — across e-commerce, CMS, gaming, agriculture, and AI-powered recruitment.
              <br /><br />
              Beyond client work, I actively ship personal products: a published <strong>npm package</strong> (uni-ui-form-builder), a live SaaS (MailProbe), and several product-grade builds in fintech, logistics, and photography. I bring rare breadth — React/Next.js expertise, design-to-code fluency (Figma, Zeplin), server ops background (Linux, Apache, DNS), and blockchain exposure.
            </div>

            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '1rem' }}>Key Strengths</h3>
            <div className="about-grid" style={{ marginBottom: '2.5rem' }}>
              {[
                { emoji: '⚛️', title: 'React Specialist', sub: '4+ years focused React delivery' },
                { emoji: '🏢', title: 'Enterprise Track Record', sub: 'Samsung, Disney, Scopely' },
                { emoji: '📦', title: 'npm Package Author', sub: 'uni-ui-form-builder (open source)' },
                { emoji: '🚀', title: 'Indie Builder', sub: '6 side projects shipped' },
                { emoji: '🎨', title: 'Design-to-Code Fluency', sub: 'Figma, Zeplin, Adobe XD' },
                { emoji: '🔗', title: 'Full-Stack Background', sub: 'MERN, Electron.js, Blockchain' },
              ].map((c, i) => (
                <div key={i} className="about-card">
                  <span className="about-emoji">{c.emoji}</span>
                  <div>
                    <div className="about-card-title">{c.title}</div>
                    <div className="about-card-sub">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '1rem' }}>Contact & Links</h3>
            <div className="contact-grid">
              <div className="contact-item">
                <div className="contact-icon-wrap"><Phone /></div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value"><a href={`tel:${profile.phone}`}>{profile.phone}</a></div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrap"><Mail /></div>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value"><a href={`mailto:${profile.email}`}>{profile.email}</a></div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrap"><Linkedin /></div>
                <div>
                  <div className="contact-label">LinkedIn</div>
                  <div className="contact-value"><a href={profile.linkedin} target="_blank" rel="noreferrer">in/balasurendaran</a></div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrap"><Github /></div>
                <div>
                  <div className="contact-label">GitHub</div>
                  <div className="contact-value"><a href={profile.github} target="_blank" rel="noreferrer">github.com/balasurendaran</a></div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrap"><Package /></div>
                <div>
                  <div className="contact-label">npm</div>
                  <div className="contact-value"><a href={profile.npm} target="_blank" rel="noreferrer">uni-ui-form-builder</a></div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon-wrap"><MapPin /></div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-value">India · Open to relocation</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2025 Bala Surendaran R &nbsp;·&nbsp; Built with React + Vite &nbsp;·&nbsp; <a href={profile.github} target="_blank" rel="noreferrer">View on GitHub</a></p>
        </div>
      </footer>
    </>
  );
}
