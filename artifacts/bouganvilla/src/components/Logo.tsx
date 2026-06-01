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

      {/* ── Magenta teardrop accent ────────────────────────
          Downward water-drop: rounded circular top arc,
          tapered point at bottom. Four bezier segments:
          bottom-point → left-taper → top-left-arc →
          top-right-arc → right-taper → bottom-point.
          Centre x=164.5, width 7px, height ~13px.
      ─────────────────────────────────────────────────── */}
      <path
        d="M 164.5 22
           C 162 18.5 161 16   161 13.5
           C 161 11   162.5 9.5 164.5 9.5
           C 166.5 9.5 168 11   168 13.5
           C 168 16   167 18.5 164.5 22 Z"
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
