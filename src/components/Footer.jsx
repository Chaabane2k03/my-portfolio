import { FiGithub, FiLinkedin, FiMail, FiHeart } from "react-icons/fi";
import { useI18n } from "../i18n";
import RotatingTagline from "./RotatingTagline";

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative border-t border-white/5 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          <p className="font-display text-2xl font-bold gradient-text">CB.</p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Chaabane2k03"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="p-2.5 rounded-lg text-slate-500 hover:text-amber hover:bg-white/5 hover:scale-110 transition-all"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a
              href="https://linkedin.com/in/chaabaneboussadia"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="p-2.5 rounded-lg text-slate-500 hover:text-amber hover:bg-white/5 hover:scale-110 transition-all"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href="mailto:chaabaneboussadia@gmail.com"
              data-cursor-hover
              className="p-2.5 rounded-lg text-slate-500 hover:text-amber hover:bg-white/5 hover:scale-110 transition-all"
              aria-label="Email"
            >
              <FiMail size={18} />
            </a>
          </div>

          <div className="section-divider w-32" />

          <RotatingTagline />

          <p className="text-slate-600 text-xs font-mono flex items-center gap-1">
            {t("footer.built")} <FiHeart className="text-crimson" size={12} /> by
            Chaabane
          </p>
        </div>
      </div>
    </footer>
  );
}
