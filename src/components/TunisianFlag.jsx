export default function TunisianFlag({ size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1200 800"
      className={className}
      role="img"
      aria-label="Drapeau tunisien"
    >
      <rect width="1200" height="800" fill="#E70013" />
      <circle cx="600" cy="400" r="220" fill="#FFFFFF" />
      <circle cx="640" cy="400" r="170" fill="#E70013" />
      <polygon
        points="730,400 660,355 680,430 620,375 700,375"
        fill="#E70013"
        transform="rotate(18, 730, 400)"
      />
      <polygon
        points="740,400 665,345 690,435 615,365 705,365"
        fill="#E70013"
        transform="rotate(18, 740, 400)"
      />
      <g transform="translate(810, 310)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <polygon
            key={angle}
            points="0,-35 8,-10 -8,-10"
            fill="#E70013"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
      <g transform="translate(500, 260)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <polygon
            key={angle}
            points="0,-35 8,-10 -8,-10"
            fill="#E70013"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
      <g transform="translate(810, 530)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <polygon
            key={angle}
            points="0,-35 8,-10 -8,-10"
            fill="#E70013"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
      <g transform="translate(500, 570)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <polygon
            key={angle}
            points="0,-35 8,-10 -8,-10"
            fill="#E70013"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
  );
}
