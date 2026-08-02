import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — a small glowing dot + trailing ring that follows the mouse,
 * growing and changing color whenever it hovers an interactive element
 * (a, button, [data-cursor-hover]). This is the kind of small "personality"
 * touch thomasbosc.com uses throughout (custom cursor, playful hovers).
 *
 * Desktop only: auto-disables on touch devices and respects reduced motion.
 * Mount this once near the root of the app (e.g. in App.jsx).
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || prefersReduced) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const isHoverTarget = (el) =>
      el.closest("a, button, [data-cursor-hover]") !== null;

    const over = (e) => {
      if (isHoverTarget(e.target) && ringRef.current) {
        ringRef.current.classList.add("cursor-ring--active");
      }
    };
    const out = (e) => {
      if (isHoverTarget(e.target) && ringRef.current) {
        ringRef.current.classList.remove("cursor-ring--active");
      }
    };

    let raf;
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.15;
      ring.current.y += (pos.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[100] w-2 h-2 rounded-full bg-amber pointer-events-none mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 z-[99] w-8 h-8 rounded-full border border-amber/60 pointer-events-none transition-[width,height,opacity] duration-300"
      />
    </>
  );
}

/*
  Add to index.css (needed once, not per-component):

  * { cursor: none; }
  @media (pointer: coarse) { * { cursor: auto; } }

  .cursor-ring--active {
    width: 3rem !important;
    height: 3rem !important;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.9);
  }
*/
