import { useState, useEffect, useRef, useCallback } from "react";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useI18n, LANGUAGES } from "../i18n";
import ThemeToast from "./ThemeToast";

const NAV_ITEMS = [
  { id: "hero", key: "hero" },
  { id: "about", key: "about" },
  { id: "skills", key: "skills" },
  { id: "experience", key: "experience" },
  { id: "leadership", key: "leadership" },
  { id: "certifications", key: "certifications" },
  { id: "education", key: "education" },
  { id: "blogs", key: "blogs" },
  { id: "contact", key: "contact" },
];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [toast, setToast] = useState(null);
  const [langOpen, setLangOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const navItemRefs = useRef({});
  const navListRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-dark");
    if (saved !== null) {
      setDark(saved === "true");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("portfolio-dark", dark);
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sectionIds = [
        "hero",
        "about",
        "skills",
        "experience",
        "leadership",
        "certifications",
        "education",
        "blogs",
        "contact",
      ];

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive(sectionIds[i]);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const moveIndicator = useCallback(() => {
    const el = navItemRefs.current[active];
    const wrap = navListRef.current;
    if (!el || !wrap) {
      setIndicator((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const elRect = el.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();
    setIndicator({
      left: elRect.left - wrapRect.left,
      width: elRect.width,
      opacity: 1,
    });
  }, [active]);

  useEffect(() => {
    moveIndicator();
    window.addEventListener("resize", moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [moveIndicator]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!langOpen) return;
      if (!event.target.closest("[data-lang-menu]")) {
        setLangOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [langOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const activeBg = dark ? "bg-amber/10" : "bg-crimson/10";
  const activeText = dark ? "text-amber" : "text-crimson";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? `${dark ? "bg-dark-900/80" : "bg-white/80"} backdrop-blur-xl border-b ${dark ? "border-white/5" : "border-black/5"} shadow-lg shadow-black/10`
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo("hero")}
            className="font-display font-bold text-lg gradient-text tracking-tight"
          >
            CB.
          </button>

          <div
            ref={navListRef}
            className="relative hidden md:flex items-center gap-1"
          >
            <div
              className={`absolute top-0 h-full rounded-lg transition-all duration-400 ease-out ${activeBg}`}
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.opacity,
              }}
            />
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                ref={(el) => (navItemRefs.current[item.id] = el)}
                onClick={() => scrollTo(item.id)}
                data-cursor-hover
                className={`relative z-10 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${
                  active === item.id
                    ? activeText
                    : dark
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-dark-900"
                }`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative" data-lang-menu>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-all ${
                  dark
                    ? "text-slate-400 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-dark-900 hover:bg-black/5"
                }`}
              >
                {LANGUAGES.find((l) => l.code === lang)?.flag}{" "}
                {LANGUAGES.find((l) => l.code === lang)?.label}
              </button>
              {langOpen && (
                <div
                  className={`absolute right-0 top-full mt-1 rounded-xl border shadow-xl overflow-hidden z-50 ${
                    dark
                      ? "bg-dark-700 border-white/10"
                      : "bg-white border-black/10"
                  }`}
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-all ${
                        lang === l.code
                          ? `${activeText} ${activeBg}`
                          : dark
                            ? "text-slate-300 hover:bg-white/5"
                            : "text-slate-700 hover:bg-black/5"
                      }`}
                    >
                      {l.flag} {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => {
                setDark((prev) => {
                  const next = !prev;
                  const jokes = t(next ? "theme.dark" : "theme.light");
                  setToast({
                    dark: next,
                    message:
                      jokes[Math.floor(Math.random() * jokes.length)],
                  });
                  return next;
                });
              }}
              className={`p-2 rounded-lg transition-all ${
                dark
                  ? "text-slate-400 hover:text-amber hover:bg-white/5"
                  : "text-slate-600 hover:text-crimson hover:bg-black/5"
              }`}
              aria-label="Toggle dark mode"
            >
              {dark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 transition-colors ${
                dark
                  ? "text-slate-400 hover:text-white"
                  : "text-slate-600 hover:text-dark-900"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <ThemeToast
          message={toast.message}
          dark={toast.dark}
          onClose={() => setToast(null)}
        />
      )}

      {mobileOpen && (
        <div
          className={`md:hidden backdrop-blur-xl border-t ${
            dark
              ? "bg-dark-800/95 border-white/5"
              : "bg-white/95 border-black/5"
          }`}
        >
          <div className="px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  active === item.id
                    ? `${activeText} ${activeBg}`
                    : dark
                      ? "text-slate-400 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-dark-900 hover:bg-black/5"
                }`}
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
