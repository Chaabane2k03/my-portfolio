import { useRef, useCallback, useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaPython,
  FaAws,
  FaDatabase,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiNextdotjs,
  SiAngular,
  SiFlask,
  SiScikitlearn,
  SiPytorch,
  SiTensorflow,
  SiLangchain,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiJenkins,
  SiGithubactions,
} from "react-icons/si";

const DOMAIN_COLORS = {
  fullstack: "from-amber to-orange-500",
  cloud: "from-crimson to-amber-600",
  ai: "from-emerald-400 to-teal-500",
  db: "from-orange to-crimson-500",
};

const DOMAIN_ICONS = {
  fullstack: FaReact,
  cloud: FaAws,
  ai: SiScikitlearn,
  db: FaDatabase,
};

const DOMAIN_SKILLS = {
  fullstack: [
    { name: "React.js", icon: FaReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Angular", icon: SiAngular },
    { name: "Node.js", icon: FaNodeJs },
    { name: "Spring Boot", icon: SiSpringboot },
    { name: "Flask", icon: SiFlask },
  ],
  cloud: [
    { name: "AWS (SAA, CCP, AIF)", icon: FaAws },
    { name: "Docker", icon: FaDocker },
    { name: "Jenkins", icon: SiJenkins },
    { name: "GitHub Actions", icon: SiGithubactions },
    { name: "Python", icon: FaPython },
  ],
  ai: [
    { name: "scikit-learn", icon: SiScikitlearn },
    { name: "PyTorch", icon: SiPytorch },
    { name: "TensorFlow", icon: SiTensorflow },
    { name: "LangChain", icon: SiLangchain },
  ],
  db: [
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MySQL", icon: SiMysql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Redis", icon: SiRedis },
    { name: "Oracle", icon: FaDatabase },
  ],
};

const DOMAIN_ORDER = ["fullstack", "cloud", "ai", "db"];

export default function Skills() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const [active, setActive] = useState(DOMAIN_ORDER[0]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const tabRefs = useRef({});
  const tabsWrapRef = useRef(null);

  const moveIndicator = useCallback((key) => {
    const el = tabRefs.current[key];
    const wrap = tabsWrapRef.current;
    if (!el || !wrap) return;
    const elRect = el.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    setIndicator({ left: elRect.left - wrapRect.left, width: elRect.width });
  }, []);

  useEffect(() => {
    moveIndicator(active);
    const onResize = () => moveIndicator(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, moveIndicator]);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={sectionRef}
        className="section-reveal max-w-5xl mx-auto px-4 sm:px-6"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          {t("skills.title")}{" "}
          <span className="gradient-text">{t("skills.titleHighlight")}</span>
        </h2>
        <p className="text-slate-500 text-center mb-12 font-mono text-sm">
          {t("skills.subtitle")}
        </p>

        {/* Numbered tab switcher — 01 · 02 · 03 · 04, sliding pill indicator,
            same "pick a category, watch it change" beat as thomasbosc.com's
            Photo/Vidéo/Web/UI-UX/3D tabs. */}
        <div
          ref={tabsWrapRef}
          className="relative flex flex-wrap justify-center gap-1 sm:gap-2 mb-10 border-b border-white/5 pb-2"
        >
          <div
            className="absolute bottom-0 h-[2px] bg-gradient-to-r from-crimson to-amber transition-all duration-500 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
          {DOMAIN_ORDER.map((domain, i) => {
            const isActive = active === domain;
            return (
              <button
                key={domain}
                ref={(el) => (tabRefs.current[domain] = el)}
                onClick={() => setActive(domain)}
                data-cursor-hover
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span
                  className={`font-mono text-xs ${
                    isActive ? "text-amber" : "text-slate-600"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t(`skills.domains.${domain}`)}
              </button>
            );
          })}
        </div>

        {/* Active domain panel — key change triggers a fresh fade+lift each time */}
        <DomainPanel key={active} domainKey={active} />
      </div>
    </section>
  );
}

function DomainPanel({ domainKey }) {
  const tiltRef = useRef(null);
  const DomainIcon = DOMAIN_ICONS[domainKey];
  const color = DOMAIN_COLORS[domainKey];
  const skills = DOMAIN_SKILLS[domainKey];

  const handleMouseMove = useCallback((e) => {
    const card = tiltRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (tiltRef.current) {
      tiltRef.current.style.transform =
        "perspective(1200px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    }
  }, []);

  return (
    <div
      ref={tiltRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card rounded-2xl p-6 sm:p-10 tilt-card animate-fade-in-up"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} bg-opacity-10`}>
          <DomainIcon className="text-white" size={24} />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill, i) => {
          const SkillIcon = skill.icon;
          return (
            <div
              key={skill.name}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:border-amber/20 hover:bg-white/[0.06] transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <SkillIcon
                className="text-slate-500 group-hover:text-amber transition-colors shrink-0"
                size={16}
              />
              <span className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-200 transition-colors truncate">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
