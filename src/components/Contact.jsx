import { useMemo } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useMagnetic } from "../hooks/useMagnetic";
import { useI18n } from "../i18n";
import {
  FiMail,
  FiLinkedin,
  FiGithub,
  FiDownload,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";

export default function Contact() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const ctaRef = useMagnetic(12);
  // Fixed-but-varied tilt per card (not random on every render) — small
  // polaroid-scatter feel, like the loose photo stacks on thomasbosc.com.
  const tilts = useMemo(() => [-2, 1.5, -1], []);

  const links = [
    {
      label: t("contact.cards.email"),
      value: "chaabaneboussadia@gmail.com",
      href: "mailto:chaabaneboussadia@gmail.com",
      icon: FiMail,
      color: "from-slate-700 to-slate-900",
    },
    {
      label: t("contact.cards.linkedin"),
      value: "linkedin.com/in/chaabaneboussadia",
      href: "https://linkedin.com/in/chaabaneboussadia",
      icon: FiLinkedin,
      color: "from-slate-700 to-slate-900",
      external: true,
    },
    {
      label: t("contact.cards.github"),
      value: "github.com/Chaabane2k03",
      href: "https://github.com/Chaabane2k03",
      icon: FiGithub,
      color: "from-slate-700 to-slate-900",
      external: true,
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={sectionRef}
        className="section-reveal max-w-5xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            08
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          {t("contact.title")}{" "}
          <span className="gradient-text">{t("contact.titleHighlight")}</span>
        </h2>
        <p className="text-slate-500 text-center mb-6 font-mono text-sm">
          {t("contact.subtitle")}
        </p>

        <p className="text-center text-amber/80 font-medium text-sm sm:text-base mb-16 flex items-center justify-center gap-2">
          <FiMapPin size={16} />
          {t("contact.availability")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {links.map((link, i) => (
            <ContactCard key={i} {...link} index={i} tilt={tilts[i % tilts.length]} />
          ))}
        </div>

        <div className="flex justify-center">
          <a
            ref={ctaRef}
            href="/Chaabane_Boussadia_CV.pdf"
            download
            data-cursor-hover
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl text-black font-semibold transition-shadow duration-300 hover:shadow-xl hover:shadow-white/25"
          >
            <FiDownload className="group-hover:-translate-y-0.5 transition-transform" />
            {t("contact.cta")}
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ label, value, href, icon: Icon, color, external, index, tilt = 0 }) {
  const ref = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="section-reveal"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        data-cursor-hover
        className="block glass-card rounded-2xl p-6 transition-all duration-500 hover:scale-[1.03] hover:rotate-0 hover:border-amber/20 hover:shadow-lg hover:shadow-amber/10 group h-full"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        <div className="flex flex-col items-center text-center gap-4">
          <div
            className={`p-4 rounded-2xl bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="text-white" size={28} />
          </div>
          <div>
            <p className="font-display font-semibold text-white text-sm mb-1">
              {label}
            </p>
            <p className="text-slate-400 text-xs sm:text-sm truncate max-w-[200px]">
              {value}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
