export function CraneIllustration({ className = "" }: { className?: string }) {
  // Tower crane silhouette, viewBox tuned so the whole rig sits comfortably in frame.
  return (
    <svg
      viewBox="0 0 1000 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* counter-jib (short arm, right of tower) */}
      <g stroke="#023341" strokeWidth="3" strokeLinecap="round">
        <line x1="760" y1="70" x2="900" y2="100" />
        <line x1="760" y1="40" x2="900" y2="100" />
        <line x1="800" y1="78" x2="800" y2="98" />
        <line x1="845" y1="86" x2="845" y2="99" />
      </g>
      {/* counterweight */}
      <rect x="885" y="98" width="40" height="26" rx="2" fill="#023341" />

      {/* main jib (long arm, left of tower) — clean truss */}
      <g stroke="#fd5e02" strokeWidth="3" strokeLinecap="round">
        <line x1="60" y1="108" x2="760" y2="70" />
        <line x1="70" y1="128" x2="760" y2="100" />
      </g>
      <g stroke="#fd5e02" strokeWidth="2" opacity="0.85">
        {Array.from({ length: 19 }).map((_, i) => {
          const t0 = i / 19;
          const t1 = (i + 1) / 19;
          const topX = 60 + t0 * 700;
          const topY = 108 - t0 * 38;
          const botX = 70 + t0 * 690;
          const botY = 128 - t0 * 28;
          const topX1 = 60 + t1 * 700;
          const topY1 = 108 - t1 * 38;
          const botX1 = 70 + t1 * 690;
          const botY1 = 128 - t1 * 28;
          return (
            <g key={i}>
              <line x1={topX} y1={topY} x2={botX1} y2={botY1} />
              <line x1={botX} y1={botY} x2={topX1} y2={topY1} />
            </g>
          );
        })}
      </g>

      {/* apex mast above cab, holding both jib cables */}
      <line x1="780" y1="40" x2="780" y2="0" stroke="#fd5e02" strokeWidth="4" strokeLinecap="round" />
      <line x1="780" y1="0" x2="120" y2="100" stroke="#0c2229" strokeWidth="2" opacity="0.55" />
      <line x1="780" y1="0" x2="845" y2="86" stroke="#0c2229" strokeWidth="2" opacity="0.55" />

      {/* operator cab */}
      <rect x="745" y="42" width="58" height="40" rx="5" fill="#023341" />
      <rect x="754" y="50" width="26" height="20" rx="2" fill="#bfe0e8" opacity="0.75" />

      {/* tower mast */}
      <g stroke="#fd5e02" strokeWidth="3" strokeLinecap="round">
        <line x1="803" y1="42" x2="803" y2="450" />
        <line x1="845" y1="42" x2="845" y2="450" />
      </g>
      <g stroke="#fd5e02" strokeWidth="2" opacity="0.8">
        {Array.from({ length: 9 }).map((_, i) => {
          const y0 = 42 + i * 45;
          const y1 = 42 + (i + 1) * 45;
          return (
            <g key={i}>
              <line x1="803" y1={y0} x2="845" y2={y1} />
              <line x1="845" y1={y0} x2="803" y2={y1} />
            </g>
          );
        })}
      </g>

      {/* trolley + hook cable running along the jib */}
      <circle cx="220" cy="100" r="6" fill="#0c2229" />
      <line x1="220" y1="106" x2="220" y2="450" stroke="#0c2229" strokeWidth="2" opacity="0.45" />
    </svg>
  );
}
