import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import {
  User, Command, Sun, Moon, Search, Mail, Copy, Package, CornerDownLeft,
} from 'lucide-react';
import { SECTIONS, goTo } from './nav';
import { profile } from '../data';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function CursorGlow() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );
  const x = useSpring(-100, { stiffness: 500, damping: 40 });
  const y = useSpring(-100, { stiffness: 500, damping: 40 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(!!e.target.closest?.('a, button, [role="button"], input'));
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      className={`cursor-ring ${active ? 'is-active' : ''}`}
      style={{ x, y }}
      aria-hidden="true"
    />
  );
}

export function Dock({ active, theme, onToggleTheme, onOpenPalette }) {
  return (
    <motion.nav
      className="dock"
      aria-label="Primary"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 140, damping: 18, delay: 1.2 }}
    >
      {SECTIONS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`dock-btn ${active === id ? 'active' : ''}`}
          onClick={() => goTo(id)}
          aria-label={label}
          aria-current={active === id ? 'true' : undefined}
        >
          {active === id && (
            <motion.span
              layoutId="dock-pill"
              className="dock-pill"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <Icon size={17} className="dock-icon" />
          <span className="dock-label">{label}</span>
        </button>
      ))}
      <span className="dock-sep" />
      <button className="dock-btn dock-util" onClick={onOpenPalette} aria-label="Open command palette">
        <Command size={16} className="dock-icon" />
      </button>
      <button
        className="dock-btn dock-util"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            className="dock-icon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.nav>
  );
}

export function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          role="status"
          initial={{ y: 30, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandPalette({ open, onClose, actions }) {
  return (
    <AnimatePresence>
      {open && <PaletteDialog onClose={onClose} actions={actions} />}
    </AnimatePresence>
  );
}

function PaletteDialog({ onClose, actions }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => {
    const base = [
      ...SECTIONS.map((s) => ({
        id: `go-${s.id}`, label: `Go to ${s.label}`, hint: 'Navigate', Icon: s.Icon,
        run: () => goTo(s.id),
      })),
      { id: 'theme', label: 'Toggle theme', hint: 'Action', Icon: Sun, run: actions.toggleTheme },
      { id: 'copy', label: 'Copy email address', hint: 'Action', Icon: Copy, run: actions.copyEmail },
      { id: 'mail', label: 'Send an email', hint: 'Link', Icon: Mail,
        run: () => { window.location.assign(`mailto:${profile.email}`); } },
      { id: 'npm', label: 'Open npm package', hint: 'Link', Icon: Package,
        run: () => window.open(profile.npm, '_blank', 'noreferrer') },
      { id: 'gh', label: 'Open GitHub', hint: 'Link', Icon: Search,
        run: () => window.open(profile.github, '_blank', 'noreferrer') },
      { id: 'li', label: 'Open LinkedIn', hint: 'Link', Icon: User,
        run: () => window.open(profile.linkedin, '_blank', 'noreferrer') },
    ];
    const q = query.trim().toLowerCase();
    return q ? base.filter((i) => i.label.toLowerCase().includes(q)) : base;
  }, [query, actions]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, []);

  const runItem = (item) => {
    onClose();
    setTimeout(() => item?.run(), 120);
  };

  const onKey = (e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => (i + 1) % Math.max(items.length, 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => (i - 1 + items.length) % Math.max(items.length, 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); runItem(items[index]); }
  };

  return (
        <motion.div
          className="palette-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ y: -20, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -10, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKey}
          >
            <div className="palette-input">
              <Search size={16} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
                placeholder="Type a command or search…"
                aria-label="Search commands"
              />
              <kbd>esc</kbd>
            </div>
            <ul className="palette-list" role="listbox">
              {items.length === 0 && <li className="palette-empty">No matches</li>}
              {items.map((item, i) => (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={i === index}
                  className={i === index ? 'selected' : ''}
                  onMouseEnter={() => setIndex(i)}
                  onClick={() => runItem(item)}
                >
                  {i === index && <motion.span layoutId="palette-sel" className="palette-sel" />}
                  <item.Icon size={15} />
                  <span className="palette-label">{item.label}</span>
                  <span className="palette-hint">{item.hint}</span>
                  {i === index && <CornerDownLeft size={13} className="palette-enter" />}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
  );
}
