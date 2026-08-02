import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";
import PhotoSlot from "./PhotoSlot";

const BLOG_PLACEHOLDERS = ["meme1", "meme2", "meme3"];

export default function Blogs() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const posts = Array.isArray(t("blogs.items")) ? t("blogs.items") : [];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {posts.map((post, i) => (
            <article
              key={post.title}
              className="section-reveal rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden ui-lift"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <PhotoSlot
                photoKey={BLOG_PLACEHOLDERS[i % BLOG_PLACEHOLDERS.length]}
                aspectRatio="16/10"
                className="rounded-none border-0 border-b border-white/5"
                showCaption={false}
              />

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-amber/80">{post.badge}</span>
                  <span className="text-xs text-slate-500">{post.readTime}</span>
                </div>

                <h3 className="font-display text-lg text-white mb-2 leading-snug">{post.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{post.excerpt}</p>

                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-[11px] bg-white/[0.03] border border-white/[0.06] text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
