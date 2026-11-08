"use client";

import { useEffect, useRef } from "react";

/** Progressive enhancement: content stays visible without JavaScript. */
export default function HomepageMotion() {
  const marker = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const root = marker.current?.closest("main");
    if (!root) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observed = new Set<HTMLElement>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        entry.target.setAttribute("data-reveal-state", entry.isIntersecting ? "visible" : "hidden");
      }
    }, { rootMargin: "-24px 0px -24px 0px", threshold: 0 });
    const register = () => {
      if (preference.matches) return;
      observed.forEach(node => {
        if (!root.contains(node)) { observer.unobserve(node); observed.delete(node); }
      });
      root.querySelectorAll<HTMLElement>("h1, h2, h3, p, a, button, [data-reveal-media]").forEach(node => {
        if (observed.has(node) || node.closest("[data-motion-custom]") || node.matches(".event-action") || node.parentElement?.closest("a, button")) return;
        // A short local stagger keeps distant cards from waiting on earlier sections.
        const siblings = Array.from(node.parentElement?.children ?? []);
        node.style.setProperty("--reveal-delay", `${Math.min(siblings.indexOf(node), 3) * 70}ms`);
        node.setAttribute("data-reveal-state", "hidden");
        observed.add(node);
        observer.observe(node);
      });
    };
    const restore = () => {
      observer.disconnect();
      observed.forEach(node => { node.removeAttribute("data-reveal-state"); node.style.removeProperty("--reveal-delay"); });
      observed.clear();
    };
    const changePreference = () => { restore(); register(); };
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(root, { childList: true, subtree: true });
    preference.addEventListener("change", changePreference);
    return () => { mutations.disconnect(); restore(); preference.removeEventListener("change", changePreference); };
  }, []);
  return <span ref={marker} hidden />;
}
