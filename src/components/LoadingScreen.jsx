import { useEffect, useState } from "react";

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const fadeTimer = setTimeout(() => setFading(true), duration);
    const doneTimer = setTimeout(() => onDone?.(), duration + 600);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-dark-900 transition-opacity duration-500 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-label="Chargement du portfolio"
    >
      <div className="animate-fade-in-up mb-6 flex items-center gap-3">
        <span className="font-display text-5xl font-bold gradient-text sm:text-6xl">
          CB.
        </span>
      </div>

      <div
        className="animate-fade-in-up mb-4 h-px w-56 overflow-hidden rounded-full bg-white/10"
        style={{ animationDelay: "150ms" }}
      >
        <div
          className="h-full bg-white transition-[width] duration-75 ease-linear"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <p
        className="animate-fade-in font-mono text-[10px] uppercase tracking-[0.35em] text-slate-500"
        style={{ animationDelay: "250ms" }}
      >
        chargement…
      </p>
    </div>
  );
}
