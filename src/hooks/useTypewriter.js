import { useState, useEffect, useRef } from "react";

export function useTypewriter(words, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [display, setDisplay] = useState("");
  const stateRef = useRef({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
  });

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDisplay(words[0] || "");
      return;
    }

    let timeout;

    const tick = () => {
      const s = stateRef.current;
      const currentWord = words[s.wordIndex];
      if (!currentWord) return;

      if (s.isDeleting) {
        s.charIndex--;
        setDisplay(currentWord.substring(0, s.charIndex));

        if (s.charIndex === 0) {
          s.isDeleting = false;
          s.wordIndex = (s.wordIndex + 1) % words.length;
          timeout = setTimeout(tick, typingSpeed);
          return;
        }
        timeout = setTimeout(tick, deletingSpeed);
      } else {
        s.charIndex++;
        setDisplay(currentWord.substring(0, s.charIndex));

        if (s.charIndex === currentWord.length) {
          timeout = setTimeout(() => {
            s.isDeleting = true;
            tick();
          }, pauseTime);
          return;
        }
        timeout = setTimeout(tick, typingSpeed);
      }
    };

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, [words, typingSpeed, deletingSpeed, pauseTime]);

  return display;
}
