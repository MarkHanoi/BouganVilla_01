/**
 * Bougan'villa wordmark — inline SVG, transparent background.
 * Bold Cormorant Garamond serif, magenta teardrop accent, tracked subtitle.
 *
 * Props:
 *   inverted — white text (for dark / hero backgrounds)
 *   className — sizing, e.g. "h-10"
 */
interface LogoProps {
  inverted?: boolean;
  className?: string;
}

export default function Logo({ inverted = false, className = "" }: LogoProps) {
  const ink = inverted ? "#ffffff" : "#2B2B2B";
  const sub = inverted ? "rgba(255,255,255,0.50)" : "rgba(43,43,43,0.45)";

  return (
    <svg
      viewBox="0 0 278 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Bougan'villa — Property Management"
      style={{ display: "block", overflow: "visible" }}
    >
      {/* ── Bougan — bold serif ──────────────────────────── */}
      <text
        x="0"
        y="47"
        fontFamily="'Cormorant Garamond', Georgia, 'Times New Roman', serif"
        fontSize="50"
        fontWeight="700"
        fill={ink}
      >
        Bougan
      </text>

      {/* ── Magenta teardrop accent ───────────────────────
          Elongated droplet: rounded top, tapered bottom tip.
          Sits at cap-height between the two words.
          Path: centre ~x=164, spans y=8 to y=26
      ─────────────────────────────────────────────────── */}
      <path
        d="M 164 26 C 161 22 160.5 15 163 10 C 163.8 8.2 165.8 8.2 166.5 10 C 169 15 168.5 22 165.5 26 C 165 26.6 164.5 26.6 164 26 Z"
        fill="#C0306A"
      />

      {/* ── villa — bold serif ───────────────────────────── */}
      <text
        x="173"
        y="47"
        fontFamily="'Cormorant Garamond', Georgia, 'Times New Roman', serif"
        fontSize="50"
        fontWeight="700"
        fill={ink}
      >
        villa
      </text>

      {/* ── PROPERTY MANAGEMENT — light tracked sans ─────── */}
      <text
        x="139"
        y="62"
        fontFamily="'Jost', system-ui, sans-serif"
        fontSize="9.5"
        fontWeight="300"
        fill={sub}
        letterSpacing="3.8"
        textAnchor="middle"
      >
        PROPERTY MANAGEMENT
      </text>
    </svg>
  );
}
