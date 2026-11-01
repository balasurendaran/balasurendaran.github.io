import { useCallback, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { profile } from './data';
import Hero from './components/Hero';
import { Marquee, Work, Builds, Journey, Stack, About } from './components/Sections';
import {
  ScrollProgress, CursorGlow, Dock, CommandPalette, Toast,
} from './components/Chrome';
import { useActiveSection } from './components/nav';

const readTheme = () => {
  try {
    return localStorage.getItem('theme') || 'dark';
  } catch {
    return 'dark';
  }
};

export default function App() {
  const [theme, setTheme] = useState(readTheme);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch { /* storage unavailable */ }
  }, [theme]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setToast('Email copied to clipboard');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setToast(profile.email);
    }
  }, []);

  const actions = useMemo(() => ({ toggleTheme, copyEmail }), [toggleTheme, copyEmail]);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <CursorGlow />
      <Hero />
      <Marquee />
      <main>
        <Work />
        <Builds />
        <Journey />
        <Stack />
        <About onCopyEmail={copyEmail} copied={copied} />
      </main>
      <footer className="footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} Bala Surendaran R · Built with React, Vite &amp; Motion ·{' '}
            <a href={profile.github} target="_blank" rel="noreferrer">View on GitHub</a>
          </p>
          <p className="footer-hint">Press <kbd>⌘</kbd> <kbd>K</kbd> to jump anywhere</p>
        </div>
      </footer>
      <Dock
        active={active}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} actions={actions} />
      <Toast message={toast} />
    </MotionConfig>
  );
}
