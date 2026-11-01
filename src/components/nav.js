import { useEffect, useState } from 'react';
import { House, Briefcase, Rocket, Route, Cpu, User } from 'lucide-react';

export const SECTIONS = [
  { id: 'home', label: 'Home', Icon: House },
  { id: 'work', label: 'Work', Icon: Briefcase },
  { id: 'builds', label: 'Builds', Icon: Rocket },
  { id: 'journey', label: 'Journey', Icon: Route },
  { id: 'stack', label: 'Stack', Icon: Cpu },
  { id: 'about', label: 'About', Icon: User },
];

export const goTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

