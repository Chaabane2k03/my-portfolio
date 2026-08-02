import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import { FiAward, FiBook } from "react-icons/fi";

const ICONS = [FiAward, FiBook];

export default function Education() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const items = t("education.items");

  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={sectionRef}
        className="section-reveal max-w-4xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            07
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          <span className="gradient-text">{t("education.title")}</span>
        </h2>
        <p className="text-slate-500 text-center mb-16 font-mono text-sm">
          {t("education.subtitle")}
        </p>

        <div className="space-y-6">
          {Array.isArray(items) &&
            items.map((edu, i) => (
              <EducationCard key={i} {...edu} index={i} iconIndex={i} />
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
  iconIndex,
}) {
  const ref = useScrollReveal({ threshold: 0.2 });
  const Icon = ICONS[iconIndex % ICONS.length];

  return (
    <div
      ref={ref}
      className="section-reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="ui-lift rounded-2xl border border-white/[0.04] bg-white/[0.01] p-6 sm:p-8 transition-all duration-400 hover:border-crimson/15 hover:bg-white/[0.025]">
        <div className="flex items-start gap-5">
          <div className="shrink-0 p-3 rounded-xl bg-crimson/8 border border-crimson/20">
            <Icon className="text-crimson" size={22} />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-white mb-1">
              {degree}
            </h3>
            <p className="text-amber/80 text-sm font-medium mb-1">{school}</p>
            <p className="font-mono text-xs text-slate-500 mb-3">{period}</p>
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
