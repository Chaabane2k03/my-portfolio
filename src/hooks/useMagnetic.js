import { useRef, useEffect } from "react";

export function useMagnetic(strength = 10) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleMouse = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
    };

    const handleLeave = () => {
      el.style.transform = "translate(0, 0)";
      el.style.transition = "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)";
      setTimeout(() => {
        el.style.transition = "";
      }, 400);
    };

    el.addEventListener("mousemove", handleMouse);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouse);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return ref;
}
