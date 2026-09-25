"use client";
import { createContext, useContext, useEffect, useRef, ReactNode, useCallback } from "react";
import Lenis from "lenis";

type LenisContextValue = {
  getLenis: () => Lenis | null;
  stop: () => void;
  start: () => void;
  scrollTo: (target: number | HTMLElement, opts?: { immediate?: boolean }) => void;
};

const LenisContext = createContext<LenisContextValue>({
  getLenis: () => null,
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
});

export const useLenis = () => useContext(LenisContext);

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);
  const getLenis = useCallback(() => lenisRef.current, []);
  const scrollTo = useCallback(
    (target: number | HTMLElement, opts?: { immediate?: boolean }) => {
      lenisRef.current?.scrollTo(target as any, opts);
    },
    []
  );

  return (
    <LenisContext.Provider value={{ getLenis, stop, start, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
