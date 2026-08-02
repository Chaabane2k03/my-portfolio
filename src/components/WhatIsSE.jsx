import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiGithub,
  FiExternalLink,
  FiImage,
} from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";

const SLIDE_COUNT = 4;

const MEMES = ["😂", "🤖", "🔥", "🧠"];
const BADGES = [
  "Reality Check",
  "Engineer Mode",
  "Architecture Mindset",
  "Ship It",
];

const MANAR_CANDIDATES = [
  "/images/fst/manar.png",
  "/images/fst/manar-logo.png",
  "/images/fst/manar-logo.webp",
  "/images/fst/UTMLOGO.svg.webp",
];

const SLIDES = [
  {
    id: "intro",
    label: "Introduction",
    eyebrow: "01 — Introduction",
  },
  {
    id: "university",
    label: "Formation",
    eyebrow: "02 — Formation",
  },
  {
    id: "github",
    label: "GitHub",
    eyebrow: "03 — GitHub",
  },
  {
    id: "why-se",
    label: "Pourquoi le SE ?",
    eyebrow: "04 — Pourquoi le SE ?",
  },
];

function shorten(text = "", max = 120) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

function SmartImg({ srcs, alt, className = "", fallback = "UTM" }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="font-display font-bold text-slate-700 text-sm leading-tight text-center">
        {fallback}
      </span>
    );
  }

  return (
    <img
      className={className}
      src={srcs[Math.min(index, srcs.length - 1)]}
      alt={alt}
      onError={() => {
        if (index >= srcs.length - 1) setFailed(true);
        else setIndex((i) => i + 1);
      }}
    />
  );
}

function LogoFlipCard() {
  const [hovered, setHovered] = useState(false);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (hovered) return;
    const id = setInterval(() => setAuto((a) => !a), 4000);
    return () => clearInterval(id);
  }, [hovered]);

  const flipped = hovered || auto;

  return (
    <div
      className="absolute -bottom-5 -left-5 h-20 w-20 sm:h-24 sm:w-24 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
      role="img"
      aria-label="Logo FST / Université de Tunis El Manar"
    >
      <div className="h-full w-full" style={{ perspective: 600 }}>
        <div
          className="relative h-full w-full transition-transform duration-700"
          style={{
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="flip-face">
            <img
              src="/images/fst/FSTLOGO.svg.webp"
              alt="Logo FST"
              className="h-full w-full object-contain p-1.5"
            />
          </div>
          <div className="flip-face flip-back">
            <SmartImg
              srcs={MANAR_CANDIDATES}
              alt="Logo Université de Tunis El Manar"
              className="h-full w-full object-contain p-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FadeInImage({
  src,
  alt,
  className = "",
  rounded = "rounded-2xl",
  tilt = "",
  children,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative min-h-[240px] ${rounded} border border-white/10 bg-white/[0.02] ${tilt} ${className}`}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 animate-pulse">
          <FiImage size={22} className="text-slate-600" />
          <span className="font-mono text-[10px] text-slate-600">
            chargement…
          </span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto ${rounded} transition-all duration-700 ${
          loaded
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-sm scale-105"
        }`}
      />
      {children}
    </div>
  );
}

function IntroSlide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center w-full">
      <div className="text-center md:text-left">
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-amber/70 mb-3">
          {SLIDES[0].eyebrow}
        </p>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
          Enchanté, moi c&apos;est{" "}
          <span className="gradient-text">Chaabane</span>
        </h3>
        <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-5">
          Chaabane BOUSSADIA, étudiant en génie logiciel à la Faculté des Sciences de Tunis, passionné par le développement full-stack, le cloud et l'intelligence artificielle. J'aime résoudre des problèmes complexes et créer des solutions innovantes.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {["Full-Stack", "Cloud & DevOps", "IA"].map((chip) => (
            <span
              key={chip}
              className="font-mono text-xs px-3 py-1 rounded-full border border-white/15 bg-white/[0.03] text-slate-300"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <FadeInImage
          src="/images/cin.png"
          alt="Carte d'identité nationale"
          className="w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          tilt="hover:rotate-0 rotate-1 transition-transform duration-500"
        />
      </div>
    </div>
  );
}

function UniversitySlide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center w-full">
      <div className="text-center md:text-left order-2 md:order-1">
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-amber/70 mb-3">
          {SLIDES[1].eyebrow}
        </p>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
          Faculté des Sciences{" "}
          <span className="gradient-text">de Tunis</span>
        </h3>
        <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-5">
          Je poursuis actuellement un cycle préparatoire intégré puis un cycle d'ingénieur en informatique à la Faculté des Sciences de Tunis, Université de Tunis El Manar, la meilleure université de Tunisie à l'échelle nationale et internationale.
          Mon parcours académique m'a permis d'acquérir des compétences solides en génie logiciel, architecture logicielle et systèmes distribués.
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2">
          {["Génie Logiciel", "Architecture", "Systèmes distribués", "IA"].map(
            (chip) => (
              <span
                key={chip}
                className="font-mono text-xs px-3 py-1 rounded-full border border-white/15 bg-white/[0.03] text-slate-300"
              >
                {chip}
              </span>
            ),
          )}
        </div>
      </div>

      <div className="flex justify-center md:justify-end order-1 md:order-2">
        <FadeInImage
          src="/images/fst/faculte-des-sciences-de-tunis.jpg"
          alt="Faculté des Sciences de Tunis"
          className="w-full max-w-md shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          tilt="hover:rotate-0 -rotate-1 transition-transform duration-500"
        >
          <LogoFlipCard />
        </FadeInImage>
      </div>
    </div>
  );
}

function GithubSlide() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center w-full">
      <div className="text-center md:text-left">
        <p className="font-mono text-sm tracking-[0.2em] uppercase text-amber/70 mb-3">
          {SLIDES[2].eyebrow}
        </p>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
          <span className="gradient-text">Chaabane2k03</span>
        </h3>
        <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-5">
          Je suis aussi passionné de football, un environnement sportif et compétitif. J'ai ainsi créé une carte FIFA en me basant sur mon profil GitHub et mon parcours jusqu'à aujourd'hui. (Cependant, ma position réelle sur le terrain est gardien de but (GB) et non milieu offensif (CAM).)
          Je me considère moi-même comme un talent très prometteur à suivre dans le domaine de l'IT. Vous pouvez consulter mon profil GitHub pour découvrir mes projets, mes contributions open-source et mes collaborations avec d'autres développeurs.
        </p>
        <a
          href="https://github.com/Chaabane2k03"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-black font-semibold text-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-white/25"
        >
          <FiGithub />
          Voir mon GitHub
          <FiExternalLink className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="flex justify-center md:justify-end">
        <FadeInImage
          src="/images/Chaabane2k03-gitfut.png"
          alt="Carte GitHub Chaabane2k03"
          className="w-full max-w-[300px] shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          tilt="hover:rotate-0 rotate-1 transition-transform duration-500"
        />
      </div>
    </div>
  );
}

function MindmapCenter({ t }) {
  return (
    <div className="rounded-2xl border border-white/25 bg-dark-800/95 px-6 py-5 text-center shadow-[0_0_60px_rgba(255,255,255,0.08)]">
      <p className="text-[10px] font-mono tracking-[0.18em] uppercase text-amber/70 mb-2">
        le cœur du métier
      </p>
      <h3 className="font-display text-xl sm:text-2xl text-white leading-tight">
        {t("about.title")}{" "}
        <span className="gradient-text">{t("about.titleHighlight")}</span>
        {t("about.titleEnd")}
      </h3>
      <p className="mt-2 text-slate-400 text-xs">
        Résoudre des problèmes, livrer des produits, créer de la valeur.
      </p>
    </div>
  );
}

function MindmapQA({ q, a, index, className = "" }) {
  return (
    <article
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber/30 hover:bg-white/[0.05] ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <p className="text-[10px] font-mono text-amber/80">
          {BADGES[index % BADGES.length]}
        </p>
        <span aria-hidden="true" className="text-sm">
          {MEMES[index % MEMES.length]}
        </span>
      </div>
      <h4 className="text-white text-xs font-semibold leading-snug mb-1.5">
        {q}
      </h4>
      <p className="text-slate-400 text-[11px] leading-relaxed">
        {shorten(a, 110)}
      </p>
    </article>
  );
}

function WhySESlide({ t, isActive }) {
  const qa = Array.isArray(t("about.qa")) ? t("about.qa").slice(0, 4) : [];
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    if (isActive) setReplay((r) => r + 1);
  }, [isActive]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 hidden sm:block pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

      <div key={replay} className="h-full">
        {/* ---- Desktop / tablet: radial mindmap ---- */}
        <div className="relative hidden sm:block h-full min-h-[520px]">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="mindmap-line"
              style={{ animationDelay: "0.15s" }}
              d="M50 50 L18 20"
            />
            <path
              className="mindmap-line"
              style={{ animationDelay: "0.3s" }}
              d="M50 50 L82 20"
            />
            <path
              className="mindmap-line"
              style={{ animationDelay: "0.45s" }}
              d="M50 50 L18 80"
            />
            <path
              className="mindmap-line"
              style={{ animationDelay: "0.6s" }}
              d="M50 50 L82 80"
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="mindmap-node" style={{ animationDelay: "0s" }}>
              <MindmapCenter t={t} />
            </div>
          </div>

          <div className="absolute left-[9%] top-[10%]">
            <div className="mindmap-node" style={{ animationDelay: "0.25s" }}>
              <MindmapQA
                q={qa[0]?.q}
                a={qa[0]?.a}
                index={0}
                className="w-[240px]"
              />
            </div>
          </div>
          <div className="absolute right-[9%] top-[10%]">
            <div className="mindmap-node" style={{ animationDelay: "0.4s" }}>
              <MindmapQA
                q={qa[1]?.q}
                a={qa[1]?.a}
                index={1}
                className="w-[240px]"
              />
            </div>
          </div>
          <div className="absolute left-[9%] bottom-[10%]">
            <div className="mindmap-node" style={{ animationDelay: "0.55s" }}>
              <MindmapQA
                q={qa[2]?.q}
                a={qa[2]?.a}
                index={2}
                className="w-[240px]"
              />
            </div>
          </div>
          <div className="absolute right-[9%] bottom-[10%]">
            <div className="mindmap-node" style={{ animationDelay: "0.7s" }}>
              <MindmapQA
                q={qa[3]?.q}
                a={qa[3]?.a}
                index={3}
                className="w-[240px]"
              />
            </div>
          </div>
        </div>

        {/* ---- Mobile: vertical tree ---- */}
        <div className="sm:hidden pt-2">
          <div
            className="mindmap-node flex justify-center"
            style={{ animationDelay: "0s" }}
          >
            <MindmapCenter t={t} />
          </div>
          <div className="mx-auto my-3 h-5 w-px bg-white/20" />
          {qa.map((pair, i) => (
            <div key={pair.q} className="relative mb-3">
              <div className="absolute left-1/2 -top-3 h-3 w-px bg-white/20" />
              <div
                className="mindmap-node"
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                <MindmapQA q={pair.q} a={pair.a} index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WhatIsSE() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (i) => setActive((i + SLIDE_COUNT) % SLIDE_COUNT);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDE_COUNT), 6500);
    return () => clearInterval(id);
  }, [paused]);

  const slideClass = (index) => {
    const base =
      "absolute inset-0 flex items-center transition-all duration-700 ease-in-out will-change-transform";
    if (index === active) return `${base} opacity-100 translate-x-0 scale-100`;
    if (index < active)
      return `${base} opacity-0 -translate-x-10 scale-[0.98] pointer-events-none`;
    return `${base} opacity-0 translate-x-10 scale-[0.98] pointer-events-none`;
  };

  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={sectionRef}
        className="section-reveal max-w-7xl mx-auto px-4 sm:px-8"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/70 uppercase bg-amber/10 px-3 py-1 rounded-full">
            02
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 text-center">
          Qui est <span className="gradient-text">Chaabane</span> ?
        </h2>
        <p className="text-slate-500 text-center mb-4 font-mono text-sm">
          // une introduction en 4 chapitres
        </p>

        <p className="text-center font-mono text-sm text-amber/60 mb-6">
          {String(active + 1).padStart(2, "0")} / {String(SLIDE_COUNT).padStart(2, "0")} —{" "}
          {SLIDES[active].label}
        </p>

        <div
          className="relative min-h-[780px] sm:min-h-[620px] lg:min-h-[560px] overflow-hidden"
          role="region"
          aria-roledescription="carrousel"
          aria-label="À propos"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
          }}
        >
          <div className={slideClass(0)} aria-hidden={active !== 0}>
            <IntroSlide />
          </div>
          <div className={slideClass(1)} aria-hidden={active !== 1}>
            <UniversitySlide />
          </div>
          <div className={slideClass(2)} aria-hidden={active !== 2}>
            <GithubSlide />
          </div>
          <div className={slideClass(3)} aria-hidden={active !== 3}>
            <WhySESlide t={t} isActive={active === 3} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Précédent"
            className="p-2.5 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-white/40 hover:bg-white/[0.08] transition-all duration-300 hover:scale-110"
          >
            <FiArrowLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => goTo(i)}
                aria-label={`Aller au slide ${i + 1} : ${slide.label}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-8 bg-white"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Suivant"
            className="p-2.5 rounded-full border border-white/15 bg-white/[0.03] text-slate-300 hover:text-white hover:border-white/40 hover:bg-white/[0.08] transition-all duration-300 hover:scale-110"
          >
            <FiArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
