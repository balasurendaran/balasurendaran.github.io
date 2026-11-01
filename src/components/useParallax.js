import { useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';

export function useParallax(range = 60) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(useTransform(mx, [-1, 1], [-range, range]), { stiffness: 60, damping: 18 });
  const y = useSpring(useTransform(my, [-1, 1], [-range, range]), { stiffness: 60, damping: 18 });
  const onMove = (e) => {
    if (reduce) return;
    mx.set((e.clientX / window.innerWidth) * 2 - 1);
    my.set((e.clientY / window.innerHeight) * 2 - 1);
  };
  return { x, y, onMove };
}
