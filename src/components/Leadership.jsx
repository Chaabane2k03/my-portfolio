import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import { FiUsers, FiAward } from "react-icons/fi";
import PhotoSlot from "./PhotoSlot";

const ICONS = [FiUsers, FiAward];
const PHOTO_KEYS = ["optima-eventra", "atia-hackathon"];

export default function Leadership() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const items = t("leadership.items");

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
          {Array.isArray(items) &&
            items.map((item, i) => (
              <LeadershipCard
                key={i}
                {...item}
                index={i}
                iconIndex={i}
                photoKey={PHOTO_KEYS[i]}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipCard({
  title,
  org,
  description,
  index,
  iconIndex,
  photoKey,
}) {
  const ref = useScrollReveal({ threshold: 0.15 });
  const Icon = ICONS[iconIndex % ICONS.length];

  return (
    <div
      ref={ref}
      className="section-reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="ui-lift rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-amber/10 hover:bg-white/[0.04]">
        <PhotoSlot
          photoKey={photoKey}
          aspectRatio="2/1"
          className="rounded-none border-0 border-b border-white/5"
          showCaption={false}
        />
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="shrink-0 p-2.5 rounded-lg bg-amber/10 border border-amber/20">
              <Icon className="text-amber" size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">
                {title}
              </h3>
              <p className="text-crimson/90 text-sm font-medium">{org}</p>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
