import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import PhotoSlot from "./PhotoSlot";

const BADGE_KEYS = [
  "aws-saa-badge",
  "aws-ccp-badge",
  "aws-aif-badge",
  "azure-badge",
  "nvidia-badge",
  "datacamp-badge",
];

const CERT_NAMES = [
  "AWS Solutions Architect — Associate (SAA-C03)",
  "AWS Cloud Practitioner (CLF-C02)",
  "AWS AI Practitioner (AIF-C01)",
  "Microsoft Azure Fundamentals (AZ-900)",
  "NVIDIA — Fundamentals of Deep Learning",
  "DataCamp — Associate Data Scientist",
];

export default function Certifications() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();

  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={sectionRef}
        className="section-reveal max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            06
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          {t("certifications.title")}{" "}
          <span className="gradient-text">
            {t("certifications.titleHighlight")}
          </span>
        </h2>
        <p className="text-slate-500 text-center mb-4 font-mono text-sm">
          {t("certifications.subtitle")}
        </p>
        <p className="text-slate-600 text-center mb-16 text-xs italic">
          badge images &rarr; src/photos/aws-saa-badge.png, aws-aif-badge.png,
          ...
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {BADGE_KEYS.map((key, i) => (
            <div
              key={key}
              className="section-reveal"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="ui-lift rounded-xl border border-white/[0.04] bg-white/[0.01] p-2 sm:p-3 transition-all duration-400 hover:scale-105 hover:border-amber/15 hover:shadow-lg hover:shadow-amber/5">
                <PhotoSlot
                  photoKey={key}
                  aspectRatio="1/1"
                  showCaption={false}
                  className="rounded-lg border-0"
                />
                <p className="mt-2 text-center text-[10px] sm:text-xs text-slate-500 leading-tight font-medium line-clamp-2">
                  {CERT_NAMES[i]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
