import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToast({ message, dark, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setShow(true));
    const hide = setTimeout(() => setShow(false), 2800);
    const done = setTimeout(onClose, 3300);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
      clearTimeout(done);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] max-w-[calc(100vw-3rem)] transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-2xl backdrop-blur-xl ${
          dark
            ? "border-white/10 bg-dark-800/95 shadow-black/50"
            : "border-black/10 bg-white/95 shadow-black/10"
        }`}
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
            dark ? "border-white/10 bg-dark-700 text-amber" : "border-black/5 bg-black/5 text-crimson"
          }`}
        >
          {dark ? <FiMoon size={15} /> : <FiSun size={15} />}
        </span>
        <p
          className={`text-sm font-mono leading-snug ${
            dark ? "text-slate-300" : "text-slate-700"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
