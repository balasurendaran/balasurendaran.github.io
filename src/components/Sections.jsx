import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { ExternalLink, Package, Mail, Phone, MapPin, Copy, Check, GraduationCap, ArrowUpRight } from 'lucide-react';
import { profile, clientProjects, sideProjects, experience, skills, domains } from '../data';
import { getTechIconClass } from '../techIcons';
import { Reveal, SectionHead, Tilt } from './fx';

const CLIENTS = ['Samsung', 'Disney', 'Scopely', "Land O'Lakes", 'Programming.com'];
const TECH_TICKER = ['React.js', 'Next.js', 'Redux', 'TypeScript', 'Node.js', 'MongoDB', 'Jest', 'Figma', 'PWA', 'Jenkins', 'Electron'];

function Pill({ name, highlight }) {
  const icon = getTechIconClass(name);
  return (
    <span className={`pill ${highlight ? 'highlight' : ''}`}>
      {icon && <i className={`${icon} pill-icon`} />}
      {name}
    </span>
  );
}

/* ── MARQUEE ── */
export function Marquee() {
  const row = (items, cls) => (
    <div className={`marquee-row ${cls}`}>
      {[0, 1].map((k) => (
        <ul className="marquee-track" key={k} aria-hidden={k === 1}>
          {items.map((c) => (
            <li key={c + k} className={cls === 'clients' ? 'marquee-client' : 'marquee-tech'}>
              {cls !== 'clients' && getTechIconClass(c) && <i className={getTechIconClass(c)} />}
              {c}
              <span className="marquee-star">✦</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
  return (
    <div className="marquee" aria-label={`Worked with ${CLIENTS.join(', ')}`}>
      {row(CLIENTS, 'clients')}
      {row(TECH_TICKER, 'tech reverse')}
    </div>
  );
}

/* ── CLIENT WORK ── */
export function Work() {
  const [filter, setFilter] = useState('All');
  const chips = useMemo(() => {
    const count = {};
    clientProjects.forEach((p) => p.tech.forEach((t) => { count[t] = (count[t] || 0) + 1; }));
    const top = Object.entries(count).filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([t]) => t);
    return ['All', ...top];
  }, []);
  const shown = clientProjects.filter((p) => filter === 'All' || p.tech.includes(filter));

  return (
    <section id="work" className="section">
      <div className="container">
        <SectionHead
          kicker="01 · Client work"
          title="Production projects for global brands"
          sub={`${clientProjects.length} enterprise projects delivered. Filter by the tech they run on.`}
        />
        <div className="chips" role="tablist" aria-label="Filter projects by technology">
          {chips.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={`chip ${filter === c ? 'active' : ''}`}
              onClick={() => setFilter(c)}
            >
              {filter === c && <motion.span layoutId="chip-pill" className="chip-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <span className="chip-text">{c}</span>
            </button>
          ))}
        </div>

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              >
                <Tilt className={`card project-card ${p.current ? 'current-project' : ''}`} max={4}>
                  <div className="card-glow" />
                  <div className="project-header">
                    <div className="project-logo" style={{ background: p.logoBg }}>{p.logo}</div>
                    <div className="project-meta">
                      <h3 className="project-name">
                        {p.name}
                        {p.current && <span className="badge-live"><span className="live-dot" /> Current</span>}
                      </h3>
                      <div className="project-company">{p.company}</div>
                    </div>
                    <div className="project-period">{p.period}</div>
                  </div>
                  <div className="role-badge">{p.role}</div>
                  <p className="project-desc">{p.description}</p>
                  <div className="tech-pills">
                    {p.tech.map((t) => <Pill key={t} name={t} highlight={p.highlight.includes(t)} />)}
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ── SIDE PROJECTS ── */
export function Builds() {
  return (
    <section id="builds" className="section">
      <div className="container">
        <SectionHead
          kicker="02 · Indie builds"
          title="Things I make for fun (and sometimes profit)"
          sub="Open-source tools, live SaaS and browser extensions."
        />
        <div className="side-grid">
          {sideProjects.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08} className={p.id === 1 ? 'side-wide' : ''}>
              <Tilt className={`card side-card ${p.id === 1 ? 'npm-featured' : ''}`} max={6} style={{ '--accent': p.color }}>
                <div className="card-glow" />
                <div className="side-card-top">
                  <motion.span
                    className="side-emoji"
                    whileHover={{ rotate: [0, -14, 12, -8, 0], scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    {p.emoji}
                  </motion.span>
                  <div>
                    <h3 className="side-name">{p.name}</h3>
                    <div className="side-type">{p.type}</div>
                  </div>
                  {p.live && <span className="badge-live push"><span className="live-dot" /> Live</span>}
                </div>
                <p className="side-desc">{p.description}</p>
                <div className="tech-pills">
                  {p.tech.map((t) => <Pill key={t} name={t} />)}
                </div>
                <div className="side-footer">
                  {p.url && (
                    <a className="side-link" href={p.url} target="_blank" rel="noreferrer">
                      <ExternalLink size={13} /> {p.live && p.id !== 1 ? 'Visit' : 'GitHub'}
                    </a>
                  )}
                  {p.npmUrl && (
                    <a className="side-link" href={p.npmUrl} target="_blank" rel="noreferrer">
                      <Package size={13} /> npm
                    </a>
                  )}
                  {!p.url && !p.npmUrl && <span className="side-soon">In development</span>}
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── JOURNEY ── */
export function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="journey" className="section">
      <div className="container">
        <SectionHead
          kicker="03 · Journey"
          title="From server racks to pixel-perfect UIs"
          sub="8+ years across technical support, full-stack and senior front-end engineering."
        />
        <div className="timeline" ref={ref}>
          <span className="timeline-rail" />
          <motion.span className="timeline-fill" style={{ scaleY }} />
          {experience.map((e, i) => (
            <motion.article
              key={e.period}
              className="timeline-item"
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            >
              <motion.span
                className="timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12, delay: 0.15 }}
              />
              <div className="timeline-period">{e.period} · {e.duration}</div>
              <h3 className="timeline-role">{e.role}</h3>
              <div className="timeline-company">{e.company}</div>
              <p className="timeline-desc">{e.description}</p>
            </motion.article>
          ))}
        </div>

        <h3 className="sub-heading">Domain expertise</h3>
        <div className="domains-list">
          {domains.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.06}>
              <motion.div className="domain-item" whileHover={{ x: 8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <div className="domain-emoji">{d.emoji}</div>
                <div>
                  <div className="domain-name">{d.name}</div>
                  <div className="domain-dur">{d.duration}</div>
                </div>
                <ArrowUpRight size={16} className="domain-arrow" />
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal className="edu-card">
          <GraduationCap size={30} />
          <div>
            <div className="edu-degree">M.Sc. Software Engineering</div>
            <div className="edu-school">Sri Krishna College of Engineering and Technology, Coimbatore</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── STACK ── */
export function Stack() {
  const [group, setGroup] = useState('All');
  const groups = ['All', ...skills.map((g) => g.group)];
  const items = skills
    .filter((g) => group === 'All' || g.group === group)
    .flatMap((g) => g.items.map((it) => ({ ...it, group: g.group })));

  return (
    <section id="stack" className="section">
      <div className="container">
        <SectionHead
          kicker="04 · Stack"
          title="Tools I reach for"
          sub="Full-stack proficiency with a React.js specialization. Hover a tile."
        />
        <div className="chips" role="tablist" aria-label="Filter skills by group">
          {groups.map((g) => (
            <button
              key={g}
              role="tab"
              aria-selected={group === g}
              className={`chip ${group === g ? 'active' : ''}`}
              onClick={() => setGroup(g)}
            >
              {group === g && <motion.span layoutId="stack-pill" className="chip-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <span className="chip-text">{g}</span>
            </button>
          ))}
        </div>
        <motion.div className="skill-tiles" layout>
          <AnimatePresence mode="popLayout">
            {items.map((it, i) => (
              <motion.div
                key={it.group + it.name}
                layout
                className="skill-tile"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24, delay: Math.min(i * 0.015, 0.3) }}
                whileHover={{ y: -6, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {it.icon ? <i className={`${it.icon} skill-icon`} /> : <span className="skill-dot" />}
                <span className="skill-name">{it.name}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ── ABOUT + CONTACT ── */
const STRENGTHS = [
  { emoji: '⚛️', title: 'React Specialist', sub: '4+ years focused React delivery' },
  { emoji: '🏢', title: 'Enterprise Track Record', sub: 'Samsung, Disney, Scopely' },
  { emoji: '📦', title: 'npm Package Author', sub: 'uni-ui-form-builder (open source)' },
  { emoji: '🚀', title: 'Indie Builder', sub: '6 side projects shipped' },
  { emoji: '🎨', title: 'Design-to-Code Fluency', sub: 'Figma, Zeplin, Adobe XD' },
  { emoji: '🔗', title: 'Full-Stack Background', sub: 'MERN, Electron.js, Blockchain' },
];

export function About({ onCopyEmail, copied }) {
  const contacts = [
    { Icon: Phone, label: 'Phone', text: profile.phone, href: `tel:${profile.phone}` },
    { Icon: Mail, label: 'Email', text: profile.email, href: `mailto:${profile.email}` },
    { icon: 'devicon-linkedin-plain', label: 'LinkedIn', text: 'in/balasurendaran', href: profile.linkedin },
    { icon: 'devicon-github-original', label: 'GitHub', text: 'github.com/balasurendaran', href: profile.github },
    { Icon: Package, label: 'npm', text: 'uni-ui-form-builder', href: profile.npm },
    { Icon: MapPin, label: 'Location', text: 'India · Open to relocation' },
  ];
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead
          kicker="05 · About"
          title="Senior engineer, indie builder, open-source contributor"
        />
        <Reveal className="avail-banner">
          <span className="avail-dot" />
          <div>
            <div className="avail-text">Open to new opportunities</div>
            <div className="avail-sub">Senior React.js / Full-Stack roles · Open to relocation</div>
          </div>
        </Reveal>

        <Reveal className="profile-summary">
          <p>
            Senior Software Engineer with <strong>8+ years of IT experience</strong> and deep specialization in React.js front-end development. Currently at Mobile Programming Pvt. Ltd., delivering production applications for global enterprise brands — Samsung, Disney, Scopely, and Land O'Lakes — across e-commerce, CMS, gaming, agriculture, and AI-powered recruitment.
          </p>
          <p>
            Beyond client work, I actively ship personal products: a published <strong>npm package</strong> (uni-ui-form-builder), a live SaaS (MailProbe), and several product-grade builds in fintech, logistics, and photography. I bring rare breadth — React/Next.js expertise, design-to-code fluency (Figma, Zeplin), server ops background (Linux, Apache, DNS), and blockchain exposure.
          </p>
        </Reveal>

        <h3 className="sub-heading">Key strengths</h3>
        <div className="about-grid">
          {STRENGTHS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 0.08}>
              <motion.div className="about-card" whileHover={{ y: -4, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
                <motion.span className="about-emoji" whileHover={{ rotate: 360, scale: 1.3 }} transition={{ duration: 0.6 }}>{c.emoji}</motion.span>
                <div>
                  <div className="about-card-title">{c.title}</div>
                  <div className="about-card-sub">{c.sub}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <h3 className="sub-heading">Let's talk</h3>
        <Reveal className="contact-cta">
          <p className="contact-big">Got something worth building?</p>
          <button className="btn btn-primary" onClick={onCopyEmail}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? 'ok' : 'copy'}
                className="btn-swap"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied!' : profile.email}
              </motion.span>
            </AnimatePresence>
          </button>
        </Reveal>

        <div className="contact-grid">
          {contacts.map((c, i) => {
            const body = (
              <>
                <div className="contact-icon-wrap">
                  {c.icon ? <i className={c.icon} /> : <c.Icon size={16} />}
                </div>
                <div>
                  <div className="contact-label">{c.label}</div>
                  <div className="contact-value">{c.text}</div>
                </div>
              </>
            );
            return (
              <Reveal key={c.label} delay={(i % 2) * 0.06}>
                {c.href ? (
                  <a className="contact-item" href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{body}</a>
                ) : (
                  <div className="contact-item">{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
