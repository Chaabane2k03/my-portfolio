import { useState } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiBookOpen,
  FiExternalLink,
  FiImage,
} from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";

function ProfileCard({
  image,
  alt,
  icon: Icon,
  title,
  text,
  href,
  cta,
  delay = 0,
}) {
  const ref = useScrollReveal({ threshold: 0.15 });
  const [loaded, setLoaded] = useState(false);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="section-reveal group block overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] ui-lift"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative min-h-[160px] border-b border-white/5">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <FiImage size={22} className="text-slate-600" />
          </div>
        )}
        <img
          src={image}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto transition-all duration-700 ${
            loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-105"
          }`}
        />
        <div className="absolute top-3 left-3 p-2.5 rounded-xl border border-white/15 bg-black/40 backdrop-blur-md">
          <Icon size={18} className="text-white" />
        </div>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-3 py-1 text-[11px] font-mono text-white">
          {cta}
          <FiExternalLink
            size={12}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="font-display text-lg text-white mb-1 leading-snug">
          {title}
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
      </div>
    </a>
  );
}

function DevToCard() {
  const ref = useScrollReveal({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="section-reveal mt-14 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="shrink-0 p-4 rounded-2xl border border-white/10 bg-white/[0.04]">
          <FiBookOpen size={26} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg sm:text-xl text-white font-semibold mb-1">
            Mes articles sur dev.to
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Architecture, cloud et leçons terrain — je partage bientôt mes
            notes et expériences sur dev.to. Reste branché.
          </p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber/10 border border-amber/20 text-amber font-mono text-xs">
          Coming soon
        </span>
      </div>
    </div>
  );
}

export default function Blogs() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();

  return (
    <section id="blogs" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div ref={sectionRef} className="section-reveal max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            09
          </span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          {t("blogs.title")} <span className="gradient-text">{t("blogs.titleHighlight")}</span>
        </h2>
        <p className="text-slate-500 text-center mb-14 font-mono text-sm">{t("blogs.subtitle")}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-14">
          <ProfileCard
            image="/images/github_profile.png"
            alt="Profil GitHub de Chaabane Boussadia"
            icon={FiGithub}
            title="GitHub — Chaabane2k03"
            text="Projets, contributions open-source et expérimentations. Explore mon code et suis mes derniers repos."
            href="https://github.com/Chaabane2k03"
            cta="Voir le profil"
            delay={0}
          />
          <ProfileCard
            image="/images/linkedin_profile.png"
            alt="Profil LinkedIn de Chaabane Boussadia"
            icon={FiLinkedin}
            title="LinkedIn — Chaabane Boussadia"
            text="Mon parcours, mes stages et mon réseau professionnel. Connectons-nous et parlons tech !"
            href="https://linkedin.com/in/chaabaneboussadia"
            cta="Voir le profil"
            delay={90}
          />
        </div>

        <DevToCard />
      </div>
    </section>
  );
}
