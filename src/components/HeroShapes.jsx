export default function HeroShapes() {
  return (
    <div className="hero-shapes hidden md:block" aria-hidden="true">
      {/* 3D cube — 3D graphics */}
      <div
        className="hero-shape group top-[16%] right-[9%]"
        data-cursor-hover
      >
        <div
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ perspective: 360 }}
        >
          <div className="shape-cube-scene">
            <div className="cube-face" style={{ transform: "translateZ(42px)" }} />
            <div
              className="cube-face"
              style={{ transform: "rotateY(180deg) translateZ(42px)" }}
            />
            <div
              className="cube-face"
              style={{ transform: "rotateY(90deg) translateZ(42px)" }}
            />
            <div
              className="cube-face"
              style={{ transform: "rotateY(-90deg) translateZ(42px)" }}
            />
            <div
              className="cube-face"
              style={{ transform: "rotateX(90deg) translateZ(42px)" }}
            />
            <div
              className="cube-face"
              style={{ transform: "rotateX(-90deg) translateZ(42px)" }}
            />
          </div>
        </div>
        <div className="shape-tooltip shape-tooltip--left">
          <p className="font-display text-xs font-semibold text-white mb-1">
            3D Graphics
          </p>
          <p className="text-[11px] text-slate-400 leading-snug">
            Rendering, shaders &amp; WebGL — building real-time 3D experiences.
          </p>
        </div>
      </div>

      {/* Atom — quantum / science */}
      <div
        className="hero-shape group top-[22%] left-[12%]"
        style={{ animationDelay: "-2s" }}
        data-cursor-hover
      >
        <div
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ perspective: 500 }}
        >
          <div className="shape-atom">
            <div className="atom-core" />
            <div className="atom-orbit orbit-1" />
            <div className="atom-orbit orbit-2" />
            <div className="atom-orbit orbit-3" />
          </div>
        </div>
        <div className="shape-tooltip shape-tooltip--right">
          <p className="font-display text-xs font-semibold text-white mb-1">
            Problem Solving
          </p>
          <p className="text-[11px] text-slate-400 leading-snug">
            Breaking complex systems into simple, orbiting pieces of logic.
          </p>
        </div>
      </div>

      {/* Gear — engineering */}
      <div
        className="hero-shape group top-[54%] left-[6%]"
        style={{ animationDelay: "-4s" }}
        data-cursor-hover
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          <svg
            viewBox="0 0 100 100"
            width="92"
            height="92"
            fill="none"
            className="animate-spin-slow"
          >
            <circle
              cx="50"
              cy="50"
              r="38"
              stroke="#fff"
              strokeOpacity="0.75"
              strokeWidth="11"
              strokeDasharray="9 7.4"
            />
            <circle
              cx="50"
              cy="50"
              r="20"
              stroke="#fff"
              strokeOpacity="0.55"
              strokeWidth="3"
            />
            <circle cx="50" cy="50" r="6" fill="#fff" fillOpacity="0.9" />
            <path
              d="M50 30V12M50 88V70M30 50H12M88 50H70M36 36 24 24M76 76 64 64M64 36 76 24M36 64 24 76"
              stroke="#fff"
              strokeOpacity="0.55"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="shape-tooltip shape-tooltip--right">
          <p className="font-display text-xs font-semibold text-white mb-1">
            Engineering
          </p>
          <p className="text-[11px] text-slate-400 leading-snug">
            Designing reliable, scalable systems that keep turning.
          </p>
        </div>
      </div>

      {/* Code braces — software */}
      <div
        className="hero-shape group top-[46%] right-[7%]"
        style={{ animationDelay: "-1.5s" }}
        data-cursor-hover
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          <div className="font-mono font-bold text-5xl text-white/70 animate-brace select-none">
            {"{ }"}
          </div>
        </div>
        <div className="shape-tooltip shape-tooltip--left">
          <p className="font-display text-xs font-semibold text-white mb-1">
            Software Engineering
          </p>
          <p className="text-[11px] text-slate-400 leading-snug">
            Clean code, algorithms &amp; data structures under the hood.
          </p>
        </div>
      </div>

      {/* Node graph — networks */}
      <div
        className="hero-shape group bottom-[20%] left-[13%]"
        style={{ animationDelay: "-3s" }}
        data-cursor-hover
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
            <path
              className="graph-edge"
              d="M24 18 L84 24"
              stroke="#fff"
              strokeOpacity="0.5"
            />
            <path
              className="graph-edge"
              d="M24 18 L48 50"
              stroke="#fff"
              strokeOpacity="0.5"
            />
            <path
              className="graph-edge"
              d="M84 24 L78 82"
              stroke="#fff"
              strokeOpacity="0.5"
            />
            <path
              className="graph-edge"
              d="M48 50 L96 76"
              stroke="#fff"
              strokeOpacity="0.5"
            />
            <path
              className="graph-edge"
              d="M24 18 L96 76"
              stroke="#fff"
              strokeOpacity="0.5"
            />
            <circle className="graph-node" cx="24" cy="18" r="6" stroke="#fff" strokeWidth="1.5" />
            <circle className="graph-node" cx="84" cy="24" r="6" stroke="#fff" strokeWidth="1.5" />
            <circle className="graph-node" cx="48" cy="50" r="6" stroke="#fff" strokeWidth="1.5" />
            <circle className="graph-node" cx="78" cy="82" r="6" stroke="#fff" strokeWidth="1.5" />
            <circle className="graph-node" cx="96" cy="76" r="6" stroke="#fff" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="shape-tooltip shape-tooltip--right">
          <p className="font-display text-xs font-semibold text-white mb-1">
            Networks
          </p>
          <p className="text-[11px] text-slate-400 leading-snug">
            Distributed systems, APIs &amp; cloud infrastructure.
          </p>
        </div>
      </div>

      {/* Binary column — computer science */}
      <div
        className="hero-shape group bottom-[15%] right-[12%]"
        style={{ animationDelay: "-2.5s" }}
        data-cursor-hover
      >
        <div className="transition-transform duration-300 group-hover:scale-110">
          <div className="font-mono text-sm tracking-widest text-white/60 text-center space-y-1">
            <span className="binary-line">0100 0001</span>
            <span className="binary-line" style={{ animationDelay: "0.6s" }}>
              0100 0010
            </span>
            <span className="binary-line" style={{ animationDelay: "1.2s" }}>
              0100 0011
            </span>
            <span className="binary-line" style={{ animationDelay: "1.8s" }}>
              0110 0100
            </span>
          </div>
        </div>
        <div className="shape-tooltip shape-tooltip--above">
          <p className="font-display text-xs font-semibold text-white mb-1">
            Computer Science
          </p>
          <p className="text-[11px] text-slate-400 leading-snug">
            Bits, logic gates &amp; the foundations of computation.
          </p>
        </div>
      </div>
    </div>
  );
}
