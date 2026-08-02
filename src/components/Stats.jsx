import AnimatedCounter from "./AnimatedCounter";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";

export default function Stats() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();

  const stats = [
    { value: 6, suffix: "", label: t("stats.certifications") },
    { value: 2, suffix: "", label: t("stats.experience") },
    { value: 3, suffix: "", label: "AWS certifications" },
    { value: 2, suffix: "", label: "Projets IA agentique" },
  ];

  return (
    <section className="relative py-16 sm:py-24">
      <div
        ref={sectionRef}
        className="section-reveal max-w-4xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            03
          </span>
        </div>

        <div className="ui-lift rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="mb-2 h-px w-8 mx-auto bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
