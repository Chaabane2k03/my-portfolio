import { useMemo, useState } from "react";
import {
  FiCamera,
  FiImage,
  FiAward,
  FiCpu,
  FiCloud,
  FiCode,
} from "react-icons/fi";

export const PHOTO_MAP = {
  "draexlmaier-internship": {
    src: "/photos/draexlmaier-internship.jpg",
    alt: "Stage DRAEXLMAIER Group",
    caption: "Plateforme low-code RH — DRAEXLMAIER Group",
  },
  "satoripop-internship": {
    src: "/photos/satoripop-internship.jpg",
    alt: "Stage Satoripop Inc.",
    caption: "Plateforme bancaire — Satoripop Inc.",
  },
  "optima-eventra": {
    src: "/photos/optima-eventra.jpg",
    alt: "OPTIMA Junior Enterprise — Migration Eventra",
    caption: "Migration tech-stack — OPTIMA Junior Enterprise",
  },
  "atia-hackathon": {
    src: "/photos/atia-hackathon.jpg",
    alt: "ATIA Hackathon ML",
    caption: "Hackathon Machine Learning — ATIA",
  },
  "aws-saa-badge": {
    src: "/photos/aws-saa-badge.png",
    alt: "AWS Solutions Architect Associate badge",
    caption: "",
  },
  "aws-ccp-badge": {
    src: "/photos/aws-ccp-badge.png",
    alt: "AWS Cloud Practitioner badge",
    caption: "",
  },
  "aws-aif-badge": {
    src: "/photos/aws-aif-badge.png",
    alt: "AWS AI Practitioner badge",
    caption: "",
  },
  "azure-badge": {
    src: "/photos/azure-badge.png",
    alt: "Microsoft Azure Fundamentals badge",
    caption: "",
  },
  "nvidia-badge": {
    src: "/photos/nvidia-badge.png",
    alt: "NVIDIA Deep Learning badge",
    caption: "",
  },
  "datacamp-badge": {
    src: "/photos/datacamp-badge.png",
    alt: "DataCamp Associate Data Scientist badge",
    caption: "",
  },
  hackathon: {
    src: "/photos/hackathon.jpg",
    alt: "Photo hackathon",
    caption: "",
  },
  meme1: {
    src: "/photos/meme1.jpg",
    alt: "Meme dev",
    caption: "Quand le code compile du premier coup",
  },
  meme2: {
    src: "/photos/meme2.jpg",
    alt: "Meme debug",
    caption: "Moi à 3h du matin sur un bug",
  },
  meme3: {
    src: "/photos/meme3.jpg",
    alt: "Meme cloud",
    caption: "AWS quand t'oublies d'éteindre une EC2",
  },
};

const BADGE_KEYS = new Set([
  "aws-saa-badge",
  "aws-ccp-badge",
  "aws-aif-badge",
  "azure-badge",
  "nvidia-badge",
  "datacamp-badge",
]);

function toLabel(photoKey = "") {
  return photoKey.replaceAll("-", " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function placeholderRecipe(photoKey) {
  if (BADGE_KEYS.has(photoKey)) {
    return {
      icon: FiAward,
      emoji: "🏅",
      chip: "Badge placeholder",
      bg: "from-amber/20 via-orange/10 to-crimson/20",
    };
  }

  if (photoKey?.includes("hackathon")) {
    return {
      icon: FiCpu,
      emoji: "🤖",
      chip: "Hackathon shot",
      bg: "from-crimson/20 via-dark-700 to-amber/15",
    };
  }

  if (photoKey?.includes("internship") || photoKey?.includes("eventra")) {
    return {
      icon: FiCode,
      emoji: "🧠",
      chip: "Career memory",
      bg: "from-amber/20 via-dark-700 to-crimson/15",
    };
  }

  if (photoKey?.includes("meme")) {
    return {
      icon: FiCloud,
      emoji: "😂",
      chip: "Meme zone",
      bg: "from-crimson/25 via-orange/15 to-amber/20",
    };
  }

  return {
    icon: FiImage,
    emoji: "📸",
    chip: "Creative placeholder",
    bg: "from-dark-700 to-dark-600",
  };
}

function PlaceholderCard({ photoKey, className = "", aspectRatio }) {
  const recipe = useMemo(() => placeholderRecipe(photoKey), [photoKey]);
  const Icon = recipe.icon;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-dark-800 ${className}`}
      style={{ aspectRatio }}
      aria-label={`Placeholder for ${toLabel(photoKey)}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${recipe.bg}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.12),transparent_30%)]" />

      <div className="relative h-full w-full p-3 sm:p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/20 px-2 py-1 text-[10px] font-mono text-slate-200">
            {recipe.chip}
          </span>
          <span className="text-lg" aria-hidden="true">
            {recipe.emoji}
          </span>
        </div>

        <div className="flex items-center gap-2 text-white/90">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-black/20">
            <Icon size={16} />
          </span>
          <p className="text-xs sm:text-sm font-medium truncate">
            {toLabel(photoKey)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PhotoSlot({
  photoKey,
  className = "",
  aspectRatio = "4/3",
  showCaption = true,
  fallbackIcon: FallbackIcon = FiImage,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const photo = PHOTO_MAP[photoKey];

  if (!photo) {
    return (
      <PlaceholderCard
        photoKey={photoKey}
        className={className}
        aspectRatio={aspectRatio}
      />
    );
  }

  if (error) {
    return (
      <div className="relative">
        <PlaceholderCard
          photoKey={photoKey}
          className={className}
          aspectRatio={aspectRatio}
        />
        <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md border border-amber/20 bg-dark-900/80 px-2 py-1 text-[10px] text-amber/80">
          <FallbackIcon size={12} />
          fallback mode
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/5 bg-dark-800 group ${className}`}
      style={{ aspectRatio }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-600">
          <FiCamera size={24} className="animate-pulse" />
          <span className="text-[11px] font-mono">loading...</span>
        </div>
      )}
      <img
        src={photo.src}
        alt={photo.alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      {showCaption && photo.caption && loaded && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-xs font-medium">{photo.caption}</p>
        </div>
      )}
    </div>
  );
}
