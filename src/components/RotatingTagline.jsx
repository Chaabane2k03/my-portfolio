import { useEffect, useState } from "react";

/**
 * RotatingTagline — cycles through a list of short lines with a soft
 * cross-fade, one at a time. Mirrors the small rotating captions in
 * thomasbosc.com's footer ("#follow4follow", "slide dans mes dms"...),
 * kept here in a tone that fits a software-engineering portfolio.
 */
export default function RotatingTagline({
  lines = [
    'git commit -m "open to opportunities"',
    "actuellement en train de debug la vie",
    "// TODO: changer le monde, un repo à la fois",
    "compilé avec passion, quelques warnings",
  ],
  interval = 3200,
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || lines.length <= 1) return;

    let fadeTimeout;
    const timer = setInterval(() => {
      setVisible(false);
      fadeTimeout = setTimeout(() => {
        setIndex((i) => (i + 1) % lines.length);
        setVisible(true);
      }, 300);
    }, interval);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimeout);
    };
  }, [lines, interval]);

  return (
    <p
      className={`font-mono text-xs text-slate-600 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {lines[index]}
    </p>
  );
}
