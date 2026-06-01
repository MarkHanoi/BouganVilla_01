/**
 * Bougan'villa wordmark — inline SVG, transparent background.
 * Bold Cormorant Garamond serif, magenta chevron accent, tracked subtitle.
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
      viewBox="0 0 278 74"
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

      {/* ── Magenta downward chevron accent ────────────────
          Shifted left to close the gap between words.
          Centre x≈158, sits in the ascender zone.
      ─────────────────────────────────────────────────── */}
      <path
        d="M 153 9 L 163 9 L 158 17 Z"
        fill="#C0306A"
      />

      {/* ── villa — bold serif ───────────────────────────── */}
      <text
        x="165"
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
        y="70"
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
