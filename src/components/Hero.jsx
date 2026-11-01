import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Phone, Mail, Package, ArrowDown } from 'lucide-react';
import { profile, stats } from '../data';
import { SplitText, Magnetic, CountUp, Tilt } from './fx';
import { useParallax } from './useParallax';
import { goTo } from './nav';

const ROLES = [
  'React.js Engineer',
  'Next.js Specialist',
  'npm Package Author',
  'Indie Product Builder',
];

const CODE = [
  ['const ', 'bala', ' = {'],
  ['  role: ', '"Senior React Engineer"', ','],
  ['  years: ', '8', ','],
  ['  shipped: ', '["Samsung", "Disney", "Scopely"]', ','],
  ['  openToWork: ', 'true', ','],
  ['}', '', ''],
];

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="role-rotator" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={{ y: 18, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -18, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.35 }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { x, y, onMove } = useParallax(24);

  const onPointerMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--hx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--hy', `${e.clientY - r.top}px`);
    onMove(e);
  };

  return (
    <section id="home" className="hero" ref={ref} onPointerMove={onPointerMove}>
      <div className="hero-bg" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="hero-grid" />
        <span className="hero-spot" />
      </div>

      <div className="container hero-inner">
        <div className="hero-copy">
          <motion.p
            className="hero-tag"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="live-dot" /> Available for new opportunities
          </motion.p>

          <h1 className="hero-name">
            <SplitText text="Bala" delay={0.2} />{' '}
            <SplitText text="Surendaran." className="gold-text" delay={0.4} />
          </h1>

          <motion.p
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            I'm a <RoleRotator />
          </motion.p>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15 }}
          >
            {profile.tagline} Currently at {profile.company}, based in {profile.location}.
          </motion.p>

          <motion.div
            className="hero-links"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <Magnetic>
              <button className="btn btn-primary" onClick={() => goTo('work')}>
                See my work <ArrowDown size={15} />
              </button>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={`mailto:${profile.email}`}>
                <Mail size={15} /> Say hello
              </a>
            </Magnetic>
            <Magnetic>
              <a className="icon-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <i className="devicon-github-original" />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="devicon-linkedin-plain" />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="icon-btn" href={profile.npm} target="_blank" rel="noreferrer" aria-label="npm package">
                <Package size={17} />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="icon-btn" href={`tel:${profile.phone}`} aria-label="Call">
                <Phone size={17} />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          style={{ x, y }}
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 16, delay: 0.7 }}
        >
          <Tilt className="code-card" max={9}>
            <div className="code-bar">
              <i /><i /><i />
              <span>bala.config.js</span>
            </div>
            <pre className="code-body" aria-label="Profile summary as code">
              {CODE.map((line, n) => (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + n * 0.14 }}
                >
                  <span className="tok-k">{line[0]}</span>
                  <span className="tok-s">{line[1]}</span>
                  <span className="tok-p">{line[2]}</span>
                  {n === CODE.length - 1 && <span className="caret" />}
                </motion.div>
              ))}
            </pre>
          </Tilt>
          <motion.i className="float-icon f1 devicon-react-plain colored" animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.i className="float-icon f2 devicon-nextjs-plain" animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.i className="float-icon f3 devicon-redux-original colored" animate={{ y: [0, -9, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }} />
        </motion.div>
      </div>

      <div className="container">
        <motion.div
          className="hero-stats"
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.5 } } }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              className="stat"
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            >
              <span className="stat-num"><CountUp value={s.num} /></span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
