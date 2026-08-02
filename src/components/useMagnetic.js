import { useRef, useCallback, useEffect } from "react";

/**
 * useMagnetic — makes an element gently "stick" to the cursor on hover,
 * then spring back on leave. Inspired by the playful micro-interactions
 * on thomasbosc.com (buttons/cards that react to the mouse).
 *
 * @param {number} strength - how far the element can travel (px), default 18
 * @returns ref to attach to the DOM node
 */
export function useMagnetic(strength = 18) {
  const ref = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(x / rect.width) * strength}px, ${
        (y / rect.height) * strength
      }px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const el = ref.current;
    if (!el || prefersReduced) return;

    el.style.transition = "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
