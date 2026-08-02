import PhotoSlot from "./PhotoSlot";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useI18n } from "../i18n";

const GALLERY_PHOTOS = [
  { key: "atia-hackathon", cols: 2, rows: 1 },
  { key: "hackathon", cols: 1, rows: 2 },
  { key: "optima-eventra", cols: 2, rows: 1 },
  { key: "meme1", cols: 1, rows: 1 },
  { key: "draexlmaier-internship", cols: 1, rows: 1 },
  { key: "meme2", cols: 2, rows: 1 },
  { key: "satoripop-internship", cols: 1, rows: 1 },
  { key: "meme3", cols: 1, rows: 1 },
];

export default function Gallery() {
  const { t } = useI18n();
  const sectionRef = useScrollReveal();

  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div
        ref={sectionRef}
        className="section-reveal max-w-6xl mx-auto px-4 sm:px-6"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          <span className="gradient-text">Behind</span> the code
        </h2>
        <p className="text-slate-500 text-center mb-6 font-mono text-sm">
          // hackathons, internships & memes
        </p>
        <p className="text-slate-600 text-center mb-16 text-xs italic">
          ajoute tes photos dans src/photos/ — renomme-les juste comme dans
          PHOTO_MAP
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-3 sm:gap-4">
          {GALLERY_PHOTOS.map((photo) => (
            <PhotoSlot
              key={photo.key}
              photoKey={photo.key}
              className={`${photo.cols > 1 ? "col-span-2" : ""} ${photo.rows > 1 ? "row-span-2" : ""}`.trim()}
              showCaption={photo.caption !== false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
