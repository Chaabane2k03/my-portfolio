import { useEffect, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import PhotoSlot from "./PhotoSlot";

const EXPERIENCE_IMAGES = ["draexlmaier-internship", "satoripop-internship"];

export default function Experience() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const timelineRef = useRef(null);
  const lineFillRef = useRef(null);
  const experiences = t("experience.items");

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;
    const handleScroll = () => {
      if (!timelineRef.current || !lineFillRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const progress = Math.min(
        Math.max(scrolled / (rect.height + window.innerHeight * 0.3), 0),
        1,
      );
      lineFillRef.current.style.height = `${progress * 100}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div
        ref={sectionRef}
        className="section-reveal max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            04
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          {t("experience.title")}{" "}
          <span className="gradient-text">
            {t("experience.titleHighlight")}
          </span>
        </h2>
        <p className="text-slate-500 text-center mb-16 font-mono text-sm">
          {t("experience.subtitle")}
        </p>

        <div ref={timelineRef} className="relative">
          <div className="timeline-line hidden lg:block" />
          <div
            ref={lineFillRef}
            className="timeline-line-fill hidden lg:block"
          />

          <div className="space-y-16 lg:space-y-24">
            {Array.isArray(experiences) &&
              experiences.map((exp, i) => (
                <TimelineItem
                  key={i}
                  {...exp}
                  index={i}
                  photoKey={EXPERIENCE_IMAGES[i]}
                  isLeft={i % 2 === 0}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  title,
  company,
  period,
  description,
  tags,
  index,
  photoKey,
  isLeft,
}) {
  const ref = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`section-reveal relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0 ${isLeft ? "" : "lg:flex-row-reverse"}`}
    >
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
        <div className="glow-dot" />
      </div>

      {/* Content card */}
      <div
        className={`w-full lg:w-[calc(50%-40px)] ${isLeft ? "lg:pr-10" : "lg:pl-10"}`}
      >
        <div className="ui-lift rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 transition-all duration-500 hover:border-amber/10 hover:bg-white/[0.04]">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] text-amber/70 tracking-wider bg-amber/5 px-2 py-0.5 rounded">
              {period}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-1">
            {title}
          </h3>
          <p className="text-amber/80 font-medium text-sm mb-4">{company}</p>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base mb-5">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tags) &&
              tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] rounded-md bg-white/[0.03] border border-white/[0.05] text-slate-400"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Photo */}
      <div
        className={`w-full lg:w-[calc(50%-40px)] ${isLeft ? "lg:pl-10" : "lg:pr-10"}`}
      >
        <PhotoSlot
          photoKey={photoKey}
          aspectRatio="16/9"
          className="shadow-lg shadow-black/30"
        />
      </div>
    </div>
  );
}
