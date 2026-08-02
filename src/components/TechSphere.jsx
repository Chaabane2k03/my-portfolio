import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiGo,
  SiLangchain,
  SiStripe,
  SiElasticsearch,
  SiJenkins,
  SiGithubactions,
  SiExpress,
} from "react-icons/si";

const LOGOS = [
  { icon: SiReact, color: "#61DAFB" },
  { icon: SiNextdotjs, color: "#E5E5E5" },
  { icon: SiTypescript, color: "#3178C6" },
  { icon: SiTailwindcss, color: "#38BDF8" },
  { icon: SiNodedotjs, color: "#339933" },
  { icon: SiExpress, color: "#E5E5E5" },
  { icon: SiDocker, color: "#2496ED" },
  { icon: SiKubernetes, color: "#326CE5" },
  { icon: SiPostgresql, color: "#4A90D9" },
  { icon: SiRedis, color: "#FF4438" },
  { icon: SiPrisma, color: "#E5E5E5" },
  { icon: SiGo, color: "#00ADD8" },
  { icon: SiLangchain, color: "#14B8A6" },
  { icon: SiStripe, color: "#635BFF" },
  { icon: SiElasticsearch, color: "#FEC514" },
  { icon: SiJenkins, color: "#D24939" },
  { icon: SiGithubactions, color: "#2088FF" },
];

const RADIUS = 250;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

const POSITIONS = LOGOS.map((_, i) => {
  const y = 1 - (i / (LOGOS.length - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = GOLDEN * i;
  return [Math.cos(theta) * r * RADIUS, y * RADIUS, Math.sin(theta) * r * RADIUS];
});

export default function TechSphere() {
  return (
    <div className="tech-sphere" aria-hidden="true">
      <div className="tech-sphere-glow" />
      <div className="tech-sphere-stage">
        <div className="tech-sphere-rotor">
          {LOGOS.map((item, i) => {
            const Icon = item.icon;
            const [x, y, z] = POSITIONS[i];
            return (
              <div
                key={i}
                className="tech-sphere-item"
                style={{ transform: `translate3d(${x}px, ${y}px, ${z}px)` }}
              >
                <Icon size={20} style={{ color: item.color }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
