import { useEffect, useRef } from "react";
import {
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowDown,
} from "react-icons/fi";
import { useTypewriter } from "../hooks/useTypewriter";
import { useMagnetic } from "../hooks/useMagnetic";
import { useI18n } from "../i18n";
import HeroShapes from "./HeroShapes";

export default function Hero() {
  const { t } = useI18n();
  const title = useTypewriter(
    [t("hero.subtitle1"), t("hero.subtitle2"), t("hero.subtitle3")],
    80,
    40,
    2000
  );
  const parallaxRef = useRef(null);
  // Ghost layer: a duplicated, oversized copy of the name that drifts the
  // opposite way and fades out faster — the "double exposure" scroll effect
  // that anchors thomasbosc.com's hero.
  const ghostRef = useRef(null);
  const ctaRef = useMagnetic(14);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
        parallaxRef.current.style.opacity = Math.max(0, 1 - scrollY / 600);
      }
      if (ghostRef.current) {
        // Opposite direction + slight skew, faster fade -> "double exposure"
        ghostRef.current.style.transform = `translateY(${
          scrollY * -0.15
        }px) translateX(${scrollY * 0.08}px) scale(${1 + scrollY / 3000})`;
        ghostRef.current.style.opacity = Math.max(0, 0.12 - scrollY / 2500);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-hero-gradient dark:bg-hero-gradient" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[120vh] w-[120vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <HeroShapes />

      {/* Double-exposure ghost text: same name, huge + blurred + offset,
          drifting opposite the main text as the page scrolls. */}
      <div
        ref={ghostRef}
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 flex items-center justify-center z-0 opacity-[0.12] blur-[1px]"
      >
        <span className="font-display font-bold text-[16vw] leading-none tracking-tight text-slate-200 whitespace-nowrap">
          Chaabane Boussadia
        </span>
      </div>

      <div ref={parallaxRef} className="relative z-10 text-center px-4">
        <div
          className="animate-fade-in-up mx-auto mb-8 h-28 w-28 sm:h-32 sm:w-32"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative h-full w-full">
            <div className="absolute -inset-3 rounded-full bg-white/10 blur-2xl" />
            <div className="relative h-full w-full rounded-full border-2 border-white/40 p-1 transition-transform duration-500 hover:scale-105">
              <img
                src="/images/chaabane.jpg"
                alt="Chaabane Boussadia"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="/icons/icons8-national-64.png"
              alt="Drapeau tunisien"
              className="flag-wave h-4 w-6 object-cover rounded-[3px] drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
            />
            <p className="font-mono text-sm text-amber/80 tracking-widest uppercase">
              {t("hero.location")}
            </p>
          </div>
        </div>

        <h1
          className="animate-fade-in-up font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight mb-6"
          style={{ animationDelay: "0.4s" }}
        >
          <span className="text-white dark:text-white">Chaabane</span>
          <br />
          <span className="gradient-text">Boussadia</span>
        </h1>

        <div
          className="animate-fade-in-up flex items-center justify-center gap-2 mb-6"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="font-mono text-lg sm:text-xl md:text-2xl text-slate-300">
            {title}
          </span>
          <span className="inline-block w-[2px] h-6 bg-amber animate-blink" />
        </div>

        <p
          className="animate-fade-in-up max-w-2xl mx-auto text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed mb-10 text-balance"
          style={{ animationDelay: "0.8s" }}
        >
          {t("hero.description")}
        </p>

        <div
          className="animate-fade-in-up flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "1s" }}
        >
          <a
            ref={ctaRef}
            href="/Chaabane_Boussadia_CV.pdf"
            download
            data-cursor-hover
            className="group flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-black font-semibold text-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-white/25"
          >
            <FiDownload className="group-hover:-translate-y-0.5 transition-transform" />
            {t("hero.cta")}
          </a>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Chaabane2k03"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="p-3 rounded-xl glass-card text-slate-400 hover:text-amber transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/chaabaneboussadia"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="p-3 rounded-xl glass-card text-slate-400 hover:text-amber transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="mailto:chaabaneboussadia@gmail.com"
              data-cursor-hover
              className="p-3 rounded-xl glass-card text-slate-400 hover:text-amber transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float text-slate-500 hover:text-amber transition-colors"
        aria-label="Scroll down"
      >
        <FiArrowDown size={24} />
      </button>
    </section>
  );
}
