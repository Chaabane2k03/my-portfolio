import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import {
  FiAward,
  FiFileText,
  FiExternalLink,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

const CLUBS = [
  { id: "ieee", name: "IEEE", logo: "/images/ieee.png" },
  { id: "gdgc", name: "GDG", logo: "/images/gdgc.png" },
  { id: "fsn", name: "FSN", logo: "/images/fsn.png" },
  { id: "eng-spark", name: "Engineering Spark", logo: "/images/eng_spark.jpeg" },
  { id: "optima", name: "OPTIMA", logo: "/images/optima.png" },
];

const PITCHES = [
  {
    title: "Campus Compass",
    file: "/files/hackathons/Pitch Campus Compass.pdf",
  },
  {
    title: "Sa3ed",
    file: "/files/hackathons/Pitch Sa3ed.pdf",
  },
  {
    title: "عينك ميزانك",
    file: "/files/hackathons/عينك ميزانك Pitch.pdf",
  },
];

export default function Leadership() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const optima = t("leadership.optima");
  const hacks = t("leadership.hackathons");

  return (
    <section id="leadership" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={sectionRef}
        className="section-reveal max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            05
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          {t("leadership.title")}{" "}
          <span className="gradient-text">
            {t("leadership.titleHighlight")}
          </span>
        </h2>
        <p className="text-slate-500 text-center mb-16 font-mono text-sm">
          {t("leadership.subtitle")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <OptimaCard {...optima} />
          <HackathonsCard {...hacks} pitches={PITCHES} />
        </div>

        <div className="mt-16">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-white text-center mb-8">
            {t("leadership.clubs")}
          </h3>
          <ClubsCarousel clubs={CLUBS} />
        </div>
      </div>
    </section>
  );
}

function ClubsCarousel({ clubs }) {
  const ref = useScrollReveal({ threshold: 0.15 });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 1 : w < 1024 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, clubs.length - perView);
  const safeIndex = Math.min(index, maxIndex);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i >= maxIndex ? 0 : i + 1)),
      4000,
    );
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  return (
    <div ref={ref} className="section-reveal">
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${safeIndex * (100 / perView)}%)` }}
          >
            {clubs.map((club) => (
              <div
                key={club.id}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
              >
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-8 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04]">
                  <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-dark-800">
                    <img
                      src={club.logo}
                      alt={club.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                  <p className="font-mono text-sm text-slate-400">{club.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          aria-label="Précédent"
          className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/15 bg-dark-800/90 text-slate-300 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-110"
        >
          <FiArrowLeft size={16} />
        </button>
        <button
          onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
          aria-label="Suivant"
          className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 p-2 rounded-full border border-white/15 bg-dark-800/90 text-slate-300 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-110"
        >
          <FiArrowRight size={16} />
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Aller à la page ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === safeIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function OptimaCard({ role, org, period, description }) {
  const ref = useScrollReveal({ threshold: 0.15 });

  return (
    <div ref={ref} className="section-reveal">
      <article className="ui-lift flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]">
        <div className="relative aspect-[2/1] overflow-hidden border-b border-white/5">
          <img
            src="/images/optima.jpg"
            alt={org}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="mb-5">
            <h3 className="font-display text-xl font-semibold text-white">
              {role}
            </h3>
            <p className="text-amber/80 text-sm font-medium">{org}</p>
            <p className="mt-1 font-mono text-xs text-slate-500">{period}</p>
          </div>

          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        </div>
      </article>
    </div>
  );
}

function HackathonsCard({ title, org, description, viewPitch, pitches }) {
  const ref = useScrollReveal({ threshold: 0.15 });

  return (
    <div ref={ref} className="section-reveal" style={{ transitionDelay: "120ms" }}>
      <article className="ui-lift flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/15 hover:bg-white/[0.04]">
        <div className="relative aspect-[2/1] overflow-hidden border-b border-white/5">
          <img
            src="/images/hackathon.png"
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="shrink-0 p-2.5 rounded-lg bg-amber/10 border border-amber/20">
              <FiAward className="text-amber" size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">
                {title}
              </h3>
              <p className="text-amber/80 text-sm font-medium">{org}</p>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed text-sm sm:text-base mb-5">
            {description}
          </p>

          <div className="mt-auto space-y-2">
            {Array.isArray(pitches) &&
              pitches.map((pitch) => (
                <a
                  key={pitch.file}
                  href={pitch.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-black/40"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-dark-800 text-slate-500 transition-colors group-hover:text-white">
                    <FiFileText size={14} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-slate-300 group-hover:text-white">
                    {pitch.title}
                  </span>
                  <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-slate-600 transition-colors group-hover:text-amber">
                    {viewPitch}
                  </span>
                  <FiExternalLink
                    size={13}
                    className="shrink-0 text-slate-600 transition-colors group-hover:text-white"
                  />
                </a>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}
