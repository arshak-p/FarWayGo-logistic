export function ContainerHook({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* hook block */}
      <rect x="160" y="0" width="40" height="26" rx="3" fill="#1a1a1a" />
      <path
        d="M165 26 q-8 18 0 30 q8 10 18 4"
        stroke="#1a1a1a"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      {/* pulley wheel */}
      <circle cx="180" cy="22" r="9" fill="#fd5e02" stroke="#1a1a1a" strokeWidth="2" />

      {/* lifting cables to container corners */}
      <line x1="172" y1="58" x2="60" y2="92" stroke="#3a3a3a" strokeWidth="2.5" />
      <line x1="188" y1="58" x2="300" y2="92" stroke="#3a3a3a" strokeWidth="2.5" />
      <line x1="172" y1="58" x2="60" y2="92" stroke="#3a3a3a" strokeWidth="2.5" />
      <line x1="180" y1="60" x2="180" y2="92" stroke="#3a3a3a" strokeWidth="2" opacity="0.5" />

      {/* spreader bar */}
      <rect x="55" y="88" width="250" height="8" rx="2" fill="#1a1a1a" />
      <line x1="65" y1="96" x2="65" y2="115" stroke="#3a3a3a" strokeWidth="2.5" />
      <line x1="295" y1="96" x2="295" y2="115" stroke="#3a3a3a" strokeWidth="2.5" />
      <line x1="65" y1="96" x2="295" y2="115" stroke="#3a3a3a" strokeWidth="1" opacity="0" />

      {/* container body */}
      <g transform="translate(40,114)">
        <rect
          x="0"
          y="0"
          width="280"
          height="118"
          rx="4"
          fill="#a23320"
        />
        <rect x="0" y="0" width="280" height="118" rx="4" fill="url(#containerShade)" />
        {/* corrugation lines */}
        {Array.from({ length: 17 }).map((_, i) => (
          <line
            key={i}
            x1={10 + i * 16}
            y1="6"
            x2={10 + i * 16}
            y2="112"
            stroke="#7a2616"
            strokeWidth="1.5"
            opacity="0.55"
          />
        ))}
        {/* top/bottom rails */}
        <rect x="0" y="0" width="280" height="6" fill="#5e1d10" opacity="0.7" />
        <rect x="0" y="112" width="280" height="6" fill="#5e1d10" opacity="0.7" />
        {/* corner castings */}
        <rect x="0" y="0" width="10" height="118" fill="#3a1208" opacity="0.8" />
        <rect x="270" y="0" width="10" height="118" fill="#3a1208" opacity="0.8" />

        {/* logo mark */}
        <g transform="translate(108,36)">
          <path
            d="M40 0H10A4 4 0 0 0 6 4V34A4 4 0 0 1 2 38H-2A4 4 0 0 1-6 34V14A12 12 0 0 1-2.5 5.5L19 -16A12 12 0 0 1 27.5 -19.5H40A4 4 0 0 1 44 -15.5V-4A4 4 0 0 1 40 0Z"
            fill="#fd5e02"
            transform="scale(0.62)"
          />
        </g>
        <text
          x="140"
          y="78"
          textAnchor="middle"
          fontFamily="var(--font-display), sans-serif"
          fontSize="17"
          fontWeight="600"
          fill="#f6f8f9"
        >
          FARWAYGO
        </text>
        <text
          x="140"
          y="94"
          textAnchor="middle"
          fontFamily="var(--font-body), sans-serif"
          fontSize="9"
          fontWeight="600"
          letterSpacing="2"
          fill="#fd5e02"
        >
          LOGISTICS
        </text>
      </g>

      <defs>
        <linearGradient id="containerShade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="0.5" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>
      </defs>
    </svg>
  );
}
