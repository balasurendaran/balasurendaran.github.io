import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
  useReducedMotion,
} from 'motion/react';

const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, className, as = 'div', ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SplitText({ text, className, delay = 0, stagger = 0.035 }) {
  const words = text.split(' ');
  let i = 0;
  return (
    <span className={className} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} className="split-word" aria-hidden="true">
          {[...word].map((ch) => {
            const n = i++;
            return (
              <motion.span
                key={n}
                className="split-char"
                initial={{ y: '110%', rotate: 8, opacity: 0 }}
                animate={{ y: '0%', rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 160, damping: 18, delay: delay + n * stagger }}
              >
                {ch}
              </motion.span>
            );
          })}
          {w < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}

export function Tilt({ children, className, max = 7, ...rest }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    if (e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    e.currentTarget.style.setProperty('--mx', `${px * 100}%`);
    e.currentTarget.style.setProperty('--my', `${py * 100}%`);
    if (reduce) return;
    ry.set((px - 0.5) * max * 2);
    rx.set((0.5 - py) * max * 2);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Magnetic({ children, strength = 0.35 }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });
  const onMove = (e) => {
    if (reduce || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span
      style={{ x, y, display: 'inline-block' }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}

export function CountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const [n, setN] = useState(reduce ? target : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, reduce]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function SectionHead({ kicker, title, sub }) {
  return (
    <header className="section-head">
      <Reveal as="p" className="kicker">
        <span className="kicker-line" /> {kicker}
      </Reveal>
      <Reveal as="h2" className="section-heading" delay={0.05}>
        {title}
      </Reveal>
      {sub && (
        <Reveal as="p" className="section-sub" delay={0.1}>
          {sub}
        </Reveal>
      )}
    </header>
  );
}
