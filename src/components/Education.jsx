import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";

const EDUCATION_DATA = [
  {
    logoImage: "/images/fst/FSTLOGO.svg.webp",
    logoAlt: "Logo de la Faculté des Sciences de Tunis",
    monogram: null,
    imageSrc: "/images/fst/faculte-des-sciences-de-tunis.jpg",
    imageAlt: "Faculté des Sciences de Tunis",
  },
  {
    logoImage: null,
    logoAlt: "",
    monogram: "TS",
    imageSrc: "/images/lts/images.jpg",
    imageAlt: "Lycée Tahar Sfar",
  },
];

function DiplomaConnector() {
  return (
    <div className="mb-14 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
      <div className="animate-float h-20 w-20 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
        <img
          src="/images/bac_diploma.png"
          alt="Diplôme"
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <svg
        className="h-12 w-20 sm:h-16 sm:w-32 shrink-0"
        viewBox="0 0 120 48"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="diploma-connector-path"
          d="M4 42 C 32 4, 82 4, 116 20"
          stroke="#ffffff"
          strokeOpacity="0.75"
          strokeWidth="2"
        />
      </svg>

      <div className="relative">
        <span className="confetti" style={{ top: -16, left: -14 }}>🎉</span>
        <span className="confetti" style={{ top: -18, right: 2, animationDelay: "-0.9s" }}>
          ✨
        </span>
        <span
          className="confetti"
          style={{ bottom: -14, right: -8, animationDelay: "-1.8s" }}
        >
          🎊
        </span>
        <span
          className="confetti"
          style={{ bottom: -12, left: 12, animationDelay: "-2.6s" }}
        >
          🌟
        </span>

        <div className="cloud-badge" style={{ animationDelay: "-2s" }}>
          <div className="text-center leading-tight">
            <p className="font-display text-base font-semibold text-white sm:text-xl">
              Diplôme national d&apos;ingénieur
            </p>
            <p className="gradient-text mt-1 font-display text-xl font-bold sm:text-2xl">
              🎓 2027 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const items = t("education.items");

  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={sectionRef}
        className="section-reveal max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            07
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          <span className="gradient-text">{t("education.title")}</span>
        </h2>
        <p className="text-slate-500 text-center mb-12 font-mono text-sm">
          {t("education.subtitle")}
        </p>

        <DiplomaConnector />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {Array.isArray(items) &&
            items.map((edu, i) => (
              <EducationCard
                key={i}
                {...edu}
                index={i}
                highlight={i === 0}
                data={EDUCATION_DATA[i % EDUCATION_DATA.length]}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  degree,
  school,
  period,
  description,
  index,
  data,
  highlight = false,
}) {
  const ref = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="section-reveal h-full"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={`ui-lift flex h-full flex-col rounded-2xl bg-white/[0.01] p-6 sm:p-8 transition-all duration-400 hover:bg-white/[0.025] ${
          highlight
            ? "border-2 border-white/70 shadow-[0_0_40px_rgba(255,255,255,0.10)]"
            : "border border-white/[0.04] hover:border-crimson/15"
        }`}
      >
        <div className="flex items-center gap-4 mb-5">
          {data.logoImage ? (
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white p-2">
              <img
                src={data.logoImage}
                alt={data.logoAlt}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.04] font-display font-bold text-2xl text-white">
              {data.monogram}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-1">
              {degree}
            </h3>
            <p className="text-amber/80 text-sm font-medium">{school}</p>
          </div>
        </div>

        <p className="font-mono text-xs text-slate-500 mb-4">{period}</p>
        <p className="text-slate-400 leading-relaxed text-sm sm:text-base mb-6">
          {description}
        </p>

        <div className="relative mt-auto aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/20">
          <img
            src={data.imageSrc}
            alt={data.imageAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
