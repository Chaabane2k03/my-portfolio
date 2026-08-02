import { useRef, useCallback, useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import {
  FaFilePdf,
  FaUpload,
  FaFileExcel,
  FaBug,
  FaDatabase,
} from "react-icons/fa";
import { FiMail, FiShield, FiClock, FiActivity } from "react-icons/fi";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiMui,
  SiFramer,
  SiChartdotjs,
  SiVitest,
  SiTestinglibrary,
  SiEslint,
  SiPrettier,
  SiNodedotjs,
  SiExpress,
  SiJavascript,
  SiPrisma,
  SiPostgresql,
  SiRedis,
  SiElasticsearch,
  SiJsonwebtokens,
  SiStripe,
  SiLangchain,
  SiOllama,
  SiPino,
  SiPrometheus,
  SiSwagger,
  SiDocker,
  SiGithubactions,
  SiJenkins,
  SiKubernetes,
  SiSonatype,
  SiGrafana,
  SiVercel,
  SiGo,
} from "react-icons/si";
import TechSphere from "./TechSphere";

function rgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h,
    16,
  );
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

const FRONTEND = [
  { name: "Next.js", version: "App Router · 16", icon: SiNextdotjs, color: "#E5E5E5" },
  { name: "React", version: "19.2", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", version: "5.x", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", version: "4.x", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "MUI", version: "9.1", icon: SiMui, color: "#007FFF" },
  { name: "Framer Motion", version: "12.4", icon: SiFramer, color: "#F43F5E" },
  { name: "Recharts", version: "3.9", icon: SiChartdotjs, color: "#22D3EE" },
  { name: "Lucide", version: "icons", icon: null, mono: "Lu", color: "#7DD3FC" },
  { name: "jsPDF", version: "PDF · 4.2", icon: FaFilePdf, color: "#FF5A5F" },
  { name: "QR Code", version: "1.5", icon: null, mono: "QR", color: "#E5E5E5" },
  { name: "Vitest", version: "tests", icon: SiVitest, color: "#FCC72B" },
  { name: "Testing Library", version: "UI tests", icon: SiTestinglibrary, color: "#E33332" },
  { name: "ESLint", version: "9.x", icon: SiEslint, color: "#4B32C3" },
  { name: "Prettier", version: "3.9", icon: SiPrettier, color: "#F7B93E" },
  { name: "Fonts", version: "Poppins · Roboto · Amiri", icon: null, mono: "Aa", color: "#D4D4D4" },
];

const BACKEND = [
  { name: "Node.js", version: "22", icon: SiNodedotjs, color: "#339933" },
  { name: "JavaScript", version: "ES2020+", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Express.js", version: "4.16", icon: SiExpress, color: "#E5E5E5" },
  { name: "Prisma", version: "ORM · 7.8", icon: SiPrisma, color: "#E5E5E5" },
  { name: "PostgreSQL", version: "16 · 2 réplicas", icon: SiPostgresql, color: "#4A90D9" },
  { name: "Redis + BullMQ", version: "7 · queue", icon: SiRedis, color: "#FF4438" },
  { name: "Elasticsearch", version: "8.17", icon: SiElasticsearch, color: "#FEC514" },
  { name: "JWT · bcrypt · 2FA", version: "auth TOTP", icon: SiJsonwebtokens, color: "#4F46E5" },
  { name: "Stripe", version: "22.3", icon: SiStripe, color: "#635BFF" },
  { name: "LangChain", version: "LangGraph · agents", icon: SiLangchain, color: "#14B8A6" },
  { name: "Ollama", version: "LLM local", icon: SiOllama, color: "#E5E5E5" },
  { name: "Nodemailer", version: "SMTP · 9.0", icon: FiMail, color: "#22C55E" },
  { name: "Multer", version: "upload · 2.2", icon: FaUpload, color: "#F59E0B" },
  { name: "xlsx", version: "sheets · 0.18", icon: FaFileExcel, color: "#217346" },
  { name: "Pino", version: "logs · 10", icon: SiPino, color: "#FACC15" },
  { name: "prom-client", version: "métriques · 15.1", icon: SiPrometheus, color: "#E6522C" },
  { name: "Helmet + rate-limit", version: "sécurité", icon: FiShield, color: "#10B981" },
  { name: "Swagger", version: "API docs", icon: SiSwagger, color: "#85EA2D" },
  { name: "Vitest + supertest", version: "1287 tests", icon: SiVitest, color: "#FCC72B" },
  { name: "node-cron", version: "4.6", icon: FiClock, color: "#3B82F6" },
];

const DEVOPS = [
  { name: "Docker", version: "+ compose · 5 files", icon: SiDocker, color: "#2496ED" },
  { name: "GitHub Actions", version: "CI + Vercel preview", icon: SiGithubactions, color: "#2088FF" },
  { name: "Jenkins", version: "CI", icon: SiJenkins, color: "#D24939" },
  { name: "Kubernetes", version: "orchestration", icon: SiKubernetes, color: "#326CE5" },
  { name: "Nexus Repository", version: "artefacts", icon: SiSonatype, color: "#E4572E" },
  { name: "SonarQube", version: "analyse statique", icon: FaBug, color: "#4E9BCD" },
  { name: "Prometheus + Grafana", version: "monitoring", icon: SiGrafana, color: "#F46800" },
  { name: "Loki + Promtail", version: "logs", icon: FiActivity, color: "#A855F7" },
  { name: "Vercel", version: "deploy", icon: SiVercel, color: "#E5E5E5" },
  { name: "pgAdmin", version: "db", icon: FaDatabase, color: "#3B82F6" },
  { name: "RedisInsight", version: "cache", icon: SiRedis, color: "#FF4438" },
  { name: "Mailpit", version: "email test", icon: FiMail, color: "#0EA5E9" },
];

const LEARNING = [
  { name: "Go", version: "apprentissage en cours", icon: SiGo, color: "#00ADD8", learning: true },
];

const CATEGORIES = [
  { id: "frontend", items: FRONTEND },
  { id: "backend", items: BACKEND },
  { id: "devops", items: DEVOPS },
  { id: "learning", items: LEARNING },
];

export default function Skills() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const [active, setActive] = useState("frontend");
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

  const activeItems = CATEGORIES.find((c) => c.id === active).items;

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <TechSphere />

      <div
        ref={sectionRef}
        className="section-reveal relative z-10 max-w-5xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            03
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          {t("skills.title")}{" "}
          <span className="gradient-text">{t("skills.titleHighlight")}</span>
        </h2>
        <p className="text-slate-500 text-center mb-12 font-mono text-sm">
          {t("skills.subtitle")}
        </p>

        <div
          ref={tabsWrapRef}
          className="relative flex flex-wrap justify-center gap-1 sm:gap-2 mb-10 border-b border-white/5 pb-2"
        >
          <div
            className="absolute bottom-0 h-[2px] bg-gradient-to-r from-white/80 to-white/40 transition-all duration-500 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
          {CATEGORIES.map((cat, i) => {
            const isActive = active === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => (tabRefs.current[cat.id] = el)}
                onClick={() => setActive(cat.id)}
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
                {t(`skills.domains.${cat.id}`)}
                <span
                  className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none transition-colors duration-300 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  {cat.items.length}
                </span>
              </button>
            );
          })}
        </div>

        <div key={active} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {activeItems.map((item, i) => (
            <TechChip key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechChip({ item, index }) {
  const Icon = item.icon;

  return (
    <div
      className="tech-chip group relative flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-3 animate-fade-in-up"
      style={{
        animationDelay: `${index * 45}ms`,
        "--tech-color": rgb(item.color),
      }}
      data-cursor-hover
    >
      <div className="tech-chip-icon flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-dark-800">
        {Icon ? (
          <Icon size={18} style={{ color: item.color }} />
        ) : (
          <span
            className="font-display text-xs font-bold tracking-tight"
            style={{ color: item.color }}
          >
            {item.mono}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <p className="flex items-center gap-2 truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-white">
          {item.name}
          {item.learning && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-slate-300">
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className="pulse-ring absolute inline-flex h-full w-full rounded-full"
                  style={{ borderColor: "rgba(0,173,216,0.7)" }}
                />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00ADD8]" />
              </span>
              new
            </span>
          )}
        </p>
        <p className="truncate font-mono text-[10px] text-slate-500">
          {item.version}
        </p>
      </div>
    </div>
  );
}
