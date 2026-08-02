import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Document, Page, pdfjs } from "react-pdf";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import {
  FiFile,
  FiFileText,
  FiMaximize2,
  FiX,
  FiDownload,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export default function Experience() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();
  const timelineRef = useRef(null);
  const lineFillRef = useRef(null);
  const experiences = t("experience.items");
  const [openPdf, setOpenPdf] = useState(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;
    const handleScroll = () => {
      if (!timelineRef.current || !lineFillRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      const progress = Math.min(
        Math.max(scrolled / (rect.height + window.innerHeight * 0.3), 0),
        1,
      );
      lineFillRef.current.style.height = `${progress * 100}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div
        ref={sectionRef}
        className="section-reveal max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-amber/60 uppercase bg-amber/5 px-3 py-1 rounded-full">
            04
          </span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          {t("experience.title")}{" "}
          <span className="gradient-text">
            {t("experience.titleHighlight")}
          </span>
        </h2>
        <p className="text-slate-500 text-center mb-16 font-mono text-sm">
          {t("experience.subtitle")}
        </p>

        <div ref={timelineRef} className="relative">
          <div className="timeline-line hidden lg:block" />
          <div
            ref={lineFillRef}
            className="timeline-line-fill hidden lg:block"
          />

          <div className="space-y-16 lg:space-y-28">
            {Array.isArray(experiences) &&
              experiences.map((exp, i) => (
                <TimelineItem
                  key={i}
                  {...exp}
                  index={i}
                  isLeft={i % 2 === 0}
                  onEnlarge={(file) => setOpenPdf({ file, title: exp.title })}
                />
              ))}
          </div>
        </div>
      </div>

      {openPdf &&
        createPortal(
          <PdfViewerModal
            file={openPdf.file}
            title={openPdf.title}
            onClose={() => setOpenPdf(null)}
          />,
          document.body,
        )}
    </section>
  );
}

function TimelineItem({
  title,
  company,
  period,
  description,
  tags,
  pdfUrl,
  imageSrc,
  index,
  isLeft,
  onEnlarge,
}) {
  const ref = useScrollReveal({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`section-reveal relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0 ${isLeft ? "" : "lg:flex-row-reverse"}`}
    >
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 z-10">
        <div className="glow-dot" />
      </div>

      {/* Content card */}
      <div
        className={`w-full lg:w-[calc(50%-40px)] ${isLeft ? "lg:pr-10" : "lg:pl-10"}`}
      >
        <div className="ui-lift rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 transition-all duration-500 hover:border-amber/10 hover:bg-white/[0.04]">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[11px] text-amber/70 tracking-wider bg-amber/5 px-2 py-0.5 rounded">
              {period}
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-1">
            {title}
          </h3>
          <p className="text-amber/80 font-medium text-sm mb-4">{company}</p>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base mb-5">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tags) &&
              tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] rounded-md bg-white/[0.03] border border-white/[0.05] text-slate-400"
                >
                  {tag}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* PDF preview */}
      <div
        className={`w-full lg:w-[calc(50%-40px)] ${isLeft ? "lg:pl-10" : "lg:pr-10"}`}
      >
        <PdfPreviewCard
          pdfUrl={pdfUrl}
          imageSrc={imageSrc}
          company={company}
          index={index}
          onEnlarge={() => onEnlarge(pdfUrl)}
        />
      </div>
    </div>
  );
}

function PdfPreviewCard({ pdfUrl, imageSrc, company, index, onEnlarge }) {
  const [pageWidth, setPageWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [docError, setDocError] = useState(false);
  const [docLoading, setDocLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setPageWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const hasPdf = Boolean(pdfUrl);
  const fileName = pdfUrl
    ? decodeURIComponent(pdfUrl.split("/").pop()).replace(/\.pdf$/i, "")
    : "";

  return (
    <div
      ref={containerRef}
      style={{ transitionDelay: `${index * 120}ms` }}
      className="pdf-preview-card group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-4 sm:p-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={company}
            loading="lazy"
            className="h-11 w-11 shrink-0 rounded-xl border border-white/10 object-cover"
          />
        ) : (
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400">
            <FiFile size={20} />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white/90">
            {company}
          </p>
          <p className="truncate font-mono text-[10px] text-slate-500">
            {hasPdf ? `${fileName}.pdf` : "présentation"}
          </p>
        </div>
      </div>

      {/* Preview area */}
      <div
        className="relative overflow-hidden rounded-xl bg-white cursor-pointer"
        onClick={hasPdf ? onEnlarge : undefined}
        role="button"
        tabIndex={hasPdf ? 0 : -1}
        onKeyDown={
          hasPdf
            ? (e) => e.key === "Enter" && onEnlarge()
            : undefined
        }
        aria-label={
          hasPdf ? `Agrandir la présentation ${fileName}` : undefined
        }
      >
        {!hasPdf && <ComingSoonPreview company={company} />}

        {hasPdf && docError && (
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 text-slate-700">
            <FiAlertCircle size={26} />
            <p className="text-xs font-mono">Erreur de chargement du PDF</p>
          </div>
        )}

        {hasPdf && !docError && (
          <>
            {docLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/95">
                <div className="flex flex-col items-center gap-3">
                  <FiFileText
                    size={26}
                    className="animate-pulse text-slate-500"
                  />
                  <span className="text-[10px] font-mono tracking-wide text-slate-400">
                    chargement…
                  </span>
                </div>
              </div>
            )}
            {pageWidth > 0 && (
              <Document
                file={pdfUrl}
                onLoadSuccess={({ numPages: n }) => {
                  setNumPages(n);
                  setDocLoading(false);
                }}
                onLoadError={() => {
                  setDocError(true);
                  setDocLoading(false);
                }}
              >
                <Page
                  pageNumber={1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="[&_canvas]:!w-full [&_canvas]:!h-auto"
                />
              </Document>
            )}
          </>
        )}

        {numPages > 1 && (
          <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white">
            {numPages} pages
          </span>
        )}

        {hasPdf && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
            <span className="inline-flex translate-y-2 items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-black opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <FiMaximize2 size={13} />
              Agrandir
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <a
          href={pdfUrl || "#"}
          download
          target="_blank"
          rel="noreferrer"
          aria-disabled={!hasPdf}
          onClick={(e) => !hasPdf && e.preventDefault()}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
            hasPdf
              ? "border border-white/15 text-white/90 hover:border-white/40 hover:bg-white/[0.04]"
              : "pointer-events-none border border-white/[0.05] text-slate-600"
          }`}
        >
          <FiDownload size={13} />
          PDF
        </a>
        <button
          onClick={onEnlarge}
          disabled={!hasPdf}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
            hasPdf
              ? "bg-white text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.35)]"
              : "pointer-events-none bg-white/10 text-slate-600"
          }`}
        >
          <FiMaximize2 size={13} />
          Agrandir
        </button>
      </div>
    </div>
  );
}

function ComingSoonPreview({ company }) {
  return (
    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-gradient-to-br from-dark-700 via-dark-800 to-dark-900 p-6 text-center">
      <span className="animate-float inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.03] text-white/80">
        <FiFile size={24} />
      </span>
      <p className="font-display text-sm font-semibold text-white">
        {company}
      </p>
      <span className="font-mono text-[10px] tracking-[0.25em] text-slate-500 uppercase">
        Présentation à venir
      </span>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-mono text-slate-400">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        en préparation
      </span>
    </div>
  );
}

function PdfViewerModal({ file, title, onClose }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pageWidth, setPageWidth] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setPageWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setPageNumber(1);
    setNumPages(0);
    setLoading(true);
    setError(false);
  }, [file]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return goTo(pageNumber + 1);
      if (e.key === "ArrowLeft") return goTo(pageNumber - 1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, pageNumber, numPages]);

  const goTo = (n) => {
    const target = Math.min(Math.max(n, 1), numPages || 1);
    if (target === pageNumber) return;
    setDirection(target > pageNumber ? 1 : -1);
    setPageNumber(target);
  };

  const arrowBtn =
    "inline-flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white/80 transition-all duration-300 hover:border-white/50 hover:bg-white/[0.08] hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:pointer-events-none disabled:opacity-25 disabled:shadow-none";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md modal-fade"
        onClick={onClose}
      />
      <div className="modal-pop relative flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-dark-900 shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/80">
            <FiFileText size={15} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{title}</p>
            <p className="truncate font-mono text-[10px] text-slate-500">
              {decodeURIComponent(file.split("/").pop())}
            </p>
          </div>
          <a
            href={file}
            download
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs text-white/90 transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.04]"
          >
            <FiDownload size={13} />
            Télécharger
          </a>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 text-white/80 transition-all duration-300 hover:rotate-90 hover:border-white/40 hover:bg-white/[0.04]"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Viewer */}
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-auto bg-dark-800"
        >
          {error && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
              <FiAlertCircle size={30} />
              <p className="font-mono text-xs">
                Impossible de charger le PDF
              </p>
            </div>
          )}

          {!error && (
            <div className="flex min-h-full items-start justify-center p-4 sm:p-6">
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-dark-800/90">
                  <span className="relative flex h-10 w-10">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-20" />
                    <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.03]">
                      <FiFileText className="text-white/80" size={18} />
                    </span>
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">
                    chargement…
                  </span>
                </div>
              )}

              {pageWidth > 0 && (
                <Document
                  file={file}
                  onLoadSuccess={({ numPages: n }) => {
                    setNumPages(n);
                    setLoading(false);
                  }}
                  onLoadError={() => {
                    setError(true);
                    setLoading(false);
                  }}
                >
                  <Page
                    key={`${file}-${pageNumber}`}
                    pageNumber={pageNumber}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className={`[&_canvas]:!w-full [&_canvas]:!h-auto ${
                      direction >= 0
                        ? "pdf-page-in-next"
                        : "pdf-page-in-prev"
                    }`}
                  />
                </Document>
              )}
            </div>
          )}

          {/* Side arrows */}
          {!error && numPages > 0 && (
            <>
              <button
                onClick={() => goTo(pageNumber - 1)}
                disabled={pageNumber <= 1}
                aria-label="Page précédente"
                className={`${arrowBtn} absolute left-3 sm:left-4 top-1/2 -translate-y-1/2`}
              >
                <FiChevronLeft size={22} />
              </button>
              <button
                onClick={() => goTo(pageNumber + 1)}
                disabled={pageNumber >= numPages}
                aria-label="Page suivante"
                className={`${arrowBtn} absolute right-3 sm:right-4 top-1/2 -translate-y-1/2`}
              >
                <FiChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 border-t border-white/10 px-4 py-3">
          <button
            onClick={() => goTo(pageNumber - 1)}
            disabled={pageNumber <= 1 || numPages === 0}
            aria-label="Page précédente"
            className={`${arrowBtn} h-9 w-9 sm:h-9 sm:w-9`}
          >
            <FiChevronLeft size={18} />
          </button>
          <span className="min-w-[110px] text-center font-mono text-xs text-slate-300">
            Page{" "}
            <span className="text-white">
              {numPages ? pageNumber : "–"}
            </span>{" "}
            / {numPages || "…"}
          </span>
          <button
            onClick={() => goTo(pageNumber + 1)}
            disabled={pageNumber >= numPages || numPages === 0}
            aria-label="Page suivante"
            className={`${arrowBtn} h-9 w-9 sm:h-9 sm:w-9`}
          >
            <FiChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
