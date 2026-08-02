import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";

const POPUP_STYLES = [
  "sm:absolute sm:-top-2 sm:left-0 sm:-translate-x-8",
  "sm:absolute sm:top-2 sm:right-0 sm:translate-x-8",
  "sm:absolute sm:bottom-8 sm:-left-2 sm:-translate-x-6",
  "sm:absolute sm:bottom-0 sm:right-2 sm:translate-x-6",
];

const MEMES = ["😂", "🤖", "🔥", "🧠"];
const BADGES = [
  "Reality Check",
  "Engineer Mode",
  "Architecture Mindset",
  "Ship It",
];

function shorten(text = "", max = 120) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export default function WhatIsSE() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const qa = Array.isArray(t("about.qa")) ? t("about.qa").slice(0, 4) : [];

  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={sectionRef}
        className="section-reveal max-w-5xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/70 uppercase bg-amber/10 px-3 py-1 rounded-full">
            02
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 text-center">
          <span className="gradient-text">Ingénieur logiciel</span> : c&apos;est
          quoi ?
        </h2>
        <p className="text-slate-500 text-center mb-12 font-mono text-sm">
          version courte, questions réelles, réponses utiles.
        </p>

        <div className="relative min-h-[520px] sm:min-h-[580px]">
          <div className="absolute inset-0 hidden sm:block pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />

          <div className="relative z-10 mx-auto mb-6 sm:mb-0 w-full max-w-xl sm:max-w-md rounded-3xl border border-amber/25 bg-dark-800/90 p-6 sm:p-8 text-center shadow-[0_0_80px_rgba(255,255,255,0.06)]">
            <p className="text-xs font-mono tracking-[0.18em] uppercase text-amber/70 mb-3">
              question principale
            </p>
            <h3 className="font-display text-2xl sm:text-3xl text-white leading-tight">
              {t("about.title")}{" "}
              <span className="gradient-text">{t("about.titleHighlight")}</span>
              {t("about.titleEnd")}
            </h3>
            <p className="mt-3 text-slate-400 text-sm">
              Simple: résoudre des problèmes, livrer des produits, créer de la
              valeur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:block gap-4 mt-6 sm:mt-0">
            {qa.map((pair, i) => (
              <PopupQA
                key={pair.q}
                q={pair.q}
                a={pair.a}
                index={i}
                className={POPUP_STYLES[i]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PopupQA({ q, a, index, className = "" }) {
  const ref = useScrollReveal({ threshold: 0.2 });

  return (
    <article
      ref={ref}
      className={`section-reveal ${className} sm:w-[280px] rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber/30 hover:bg-white/[0.05]`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-xs font-mono text-amber/80">
          {BADGES[index % BADGES.length]}
        </p>
        <span aria-hidden="true" className="text-base">
          {MEMES[index % MEMES.length]}
        </span>
      </div>
      <h4 className="text-white text-sm font-semibold leading-snug mb-2">
        {q}
      </h4>
      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
        {shorten(a, 130)}
      </p>
    </article>
  );
}
