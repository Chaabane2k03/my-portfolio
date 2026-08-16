import { useRef, useCallback, useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import { FaAws, FaGoogle, FaMicrosoft, FaFilePdf, FaCheck } from "react-icons/fa";
import { SiDatacamp } from "react-icons/si";
import { FiGrid } from "react-icons/fi";

const COMPANIES = [
  {
    id: "aws",
    name: "AWS",
    accent: "255, 153, 0",
    icon: FaAws,
    certifications: [
      {
        id: "saa",
        name: "Solutions Architect — Associate",
        code: "SAA-C03",
        image: "/images/certifications/aws/saa.png",
        status: "earned",
        skills: ["EC2", "S3", "IAM", "VPC", "RDS", "Lambda", "CloudFront", "Auto Scaling"],
      },
      {
        id: "clf",
        name: "Cloud Practitioner",
        code: "CLF-C02",
        image: "/images/certifications/aws/clf.png",
        status: "earned",
        skills: ["Cloud Concepts", "Core Services", "Pricing", "Security", "Well-Architected"],
      },
      {
        id: "aif",
        name: "AI Practitioner",
        code: "AIF-C01",
        image: "/images/certifications/aws/aif.png",
        status: "earned",
        skills: ["Generative AI", "Amazon Bedrock", "Foundation Models", "Prompt Engineering", "ML Concepts"],
      },
      {
        id: "dev",
        name: "Developer — Associate",
        code: "DVA-C02",
        image: "/images/certifications/aws/dev(preparing).png",
        status: "preparing",
        skills: ["Lambda", "DynamoDB", "API Gateway", "CodePipeline", "CloudWatch", "SAM"],
      },
      {
        id: "data",
        name: "Data Engineering — Associate",
        code: "DEA-C01",
        image: "/images/certifications/aws/data(preparing).png",
        status: "preparing",
        skills: ["Athena", "Redshift", "Kinesis", "Glue", "QuickSight", "EMR"],
      },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    accent: "0, 164, 239",
    icon: FaMicrosoft,
    certifications: [
      {
        id: "az900",
        name: "Azure Fundamentals",
        code: "AZ-900",
        image: "/images/certifications/microsoft/azure.png",
        status: "earned",
        skills: ["Cloud Concepts", "Azure Core Services", "Architecture", "Security & Governance", "Cost Management"],
      },
      {
        id: "ghf",
        name: "GitHub Actions",
        code: "GitHub",
        image: "/images/certifications/microsoft/gh.png",
        status: "earned",
        skills: ["CI/CD Pipelines", "Workflows & Jobs", "Runner Environments", "Secrets & Variables", "Actions Marketplace"],
      },
    ],
  },
  {
    id: "ibm",
    name: "IBM",
    accent: "72, 160, 220",
    icon: null,
    certifications: [
      {
        id: "iae",
        name: "AI Engineering",
        code: "Professional Certificate",
        image: "/images/certifications/ibm/ia_eng.avif",
        status: "earned",
        skills: ["PyTorch", "TensorFlow", "Keras", "Deep Learning", "Machine Learning", "AI Ethics"],
      },
    ],
  },
  {
    id: "google",
    name: "Google Cloud",
    accent: "66, 133, 244",
    icon: FaGoogle,
    certifications: [
      {
        id: "ace",
        name: "Associate Cloud Engineer",
        code: "ACE",
        image: "/images/certifications/google/ace(preparing).png",
        status: "preparing",
        skills: ["Compute Engine", "GKE", "Cloud Functions", "IAM", "Networking", "Cloud Storage"],
      },
    ],
  },
  {
    id: "datacamp",
    name: "DataCamp",
    accent: "3, 239, 98",
    icon: SiDatacamp,
    certifications: [
      {
        id: "ads",
        name: "Associate Data Scientist",
        code: "DataCamp",
        image: null,
        pdfUrl: "/images/certifications/datacamp/DSA0013237047021.pdf",
        status: "earned",
        skills: ["Python", "pandas", "NumPy", "SQL", "Data Visualization", "Statistics"],
      },
    ],
  },
];

const ALL = {
  id: "all",
  name: "all",
  accent: "255, 255, 255",
  icon: FiGrid,
};

export default function Certifications() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const [active, setActive] = useState("all");
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

  const activeCompany =
    active === "all"
      ? null
      : COMPANIES.find((c) => c.id === active);

  const earnedCount = COMPANIES.reduce(
    (sum, c) => sum + c.certifications.filter((cert) => cert.status === "earned").length,
    0
  );
  const preparingCount = COMPANIES.reduce(
    (sum, c) => sum + c.certifications.filter((cert) => cert.status === "preparing").length,
    0
  );

  const visibleCerts = activeCompany
    ? activeCompany.certifications
    : COMPANIES.flatMap((c) => c.certifications);

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
        <p className="text-slate-500 text-center mb-10 font-mono text-sm">
          {t("certifications.subtitle")}
        </p>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 font-mono text-xs text-slate-300 animate-fade-in-up">
            <FaCheck size={11} className="text-emerald-400" />
            {earnedCount} {t("certifications.earnedStat")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-1.5 font-mono text-xs text-slate-400 animate-fade-in-up" style={{ animationDelay: "80ms" }}>
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-400" />
            </span>
            {preparingCount} {t("certifications.preparingStat")}
          </span>
        </div>

        <div
          ref={tabsWrapRef}
          className="relative mb-12 flex flex-wrap justify-center gap-1 sm:gap-2 border-b border-white/5 pb-2"
        >
          <div
            className="absolute bottom-0 h-[2px] rounded-full bg-gradient-to-r from-white/80 to-white/40 transition-all duration-500 ease-out"
            style={{ left: indicator.left, width: indicator.width }}
          />
          {[ALL, ...COMPANIES].map((company, i) => {
            const Icon = company.icon;
            const count = company.id === "all"
              ? COMPANIES.reduce((s, c) => s + c.certifications.length, 0)
              : company.certifications.length;
            const isActive = active === company.id;
            return (
              <button
                key={company.id}
                ref={(el) => (tabRefs.current[company.id] = el)}
                onClick={() => setActive(company.id)}
                data-cursor-hover
                className={`group/tab flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-300 ${
                  isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                <span
                  className={`font-mono text-xs ${isActive ? "text-slate-300" : "text-slate-600"}`}
                >
                  {String(i).padStart(2, "0")}
                </span>
                {Icon ? (
                  <Icon
                    size={15}
                    className="transition-colors duration-300"
                    style={{
                      color: isActive
                        ? `rgb(${company.accent})`
                        : "currentColor",
                    }}
                  />
                ) : (
                  <span
                    className="font-display text-sm font-bold tracking-tight"
                    style={{ color: isActive ? `rgb(${company.accent})` : "currentColor" }}
                  >
                    IBM
                  </span>
                )}
                {company.name}
                <span
                  className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none transition-colors duration-300 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-white/[0.05] text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div
          key={active}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {visibleCerts.map((cert, i) => {
            const company = COMPANIES.find((c) =>
              c.certifications.some((x) => x.id === cert.id)
            );
            return (
              <div
                key={cert.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <CertCard cert={cert} company={company} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CertCard({ cert, company }) {
  const { t } = useI18n();
  const preparing = cert.status === "preparing";
  const accent = company.accent;

  return (
    <article
      className="cert-card group relative flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
      style={{ "--accent": accent }}
      data-cursor-hover
    >
      <div className="cert-shine absolute inset-0 rounded-2xl pointer-events-none" />

      <div className="relative mx-auto mb-6 h-28 w-28 sm:h-32 sm:w-32">
        <div
          className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: `rgba(${accent}, 0.28)` }}
        />
        <div
          className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border bg-dark-800 transition-transform duration-500 group-hover:scale-[1.04] ${
            preparing ? "border-dashed" : "border-solid"
          }`}
          style={{
            borderColor: preparing
              ? `rgba(${accent}, 0.55)`
              : "rgba(255, 255, 255, 0.12)",
          }}
        >
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.name}
              loading="lazy"
              className="cert-badge-img h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1">
              <FaFilePdf size={34} style={{ color: `rgb(${accent})` }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
                PDF
              </span>
            </div>
          )}
          {preparing && (
            <span
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: `inset 0 0 18px rgba(${accent}, 0.25)` }}
            />
          )}
        </div>

        <span
          className={`absolute -bottom-2.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] transition-all duration-300 ${
            preparing
              ? "border-white/15 bg-dark-800 text-slate-300"
              : "border-white/25 bg-white text-black"
          }`}
        >
          {preparing ? (
            <>
              <span className="relative flex h-1.5 w-1.5">
                <span className="pulse-ring absolute inline-flex h-full w-full rounded-full" style={{ borderColor: `rgba(${accent}, 0.7)` }} />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${accent})` }} />
              </span>
              {t("certifications.preparing")}
            </>
          ) : (
            <>
              <FaCheck size={9} />
              {t("certifications.earned")}
            </>
          )}
        </span>
      </div>

      <div className="mt-4 text-center">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.25em]"
          style={{ color: `rgba(${accent}, 0.9)` }}
        >
          {company.name}
        </p>
        <h3 className="mt-1.5 font-display text-base sm:text-lg font-semibold text-white leading-snug">
          {cert.name}
        </h3>
        <p className="mt-1 font-mono text-xs text-slate-500">{cert.code}</p>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-slate-400 transition-all duration-300 hover:border-white/25 hover:text-white"
          >
            {skill}
          </span>
        ))}
      </div>

      {cert.pdfUrl && (
        <div className="mt-5 flex justify-center">
          <a
            href={cert.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs text-slate-200 transition-all duration-300 hover:border-white/40 hover:bg-white/[0.08] hover:text-white"
            style={{ boxShadow: `inset 0 0 20px rgba(${accent}, 0.06)` }}
          >
            <FaFilePdf size={12} style={{ color: `rgb(${accent})` }} />
            {t("certifications.viewPdf")}
          </a>
        </div>
      )}
    </article>
  );
}
