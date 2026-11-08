"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function StackedSections({ beneath, above }: { beneath: ReactNode; above: ReactNode }) {
  const pinned = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  useEffect(() => {
    const element = pinned.current;
    if (!element) return;
    const update = () => setTop(Math.min(0, window.innerHeight - element.offsetHeight));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, []);
  return (
    <div className="relative isolate">
      <div ref={pinned} style={{ top }} className="sticky z-0 motion-reduce:static">{beneath}</div>
      <div className="relative z-10">{above}</div>
    </div>
  );
}
