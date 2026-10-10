// MYM Logo SVG — all glyphs use currentColor so the wordmark inherits theme colour
export function MymLogo({ height = 36 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 80"
      height={height}
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block' }}
    >
      {/* Left M */}
      <text
        x="2"
        y="60"
        fontFamily="'Outfit', system-ui, sans-serif"
        fontWeight="700"
        fontSize="68"
        fill="currentColor"
      >M</text>

      {/* Right M */}
      <text
        x="148"
        y="60"
        fontFamily="'Outfit', system-ui, sans-serif"
        fontWeight="700"
        fontSize="68"
        fill="currentColor"
      >M</text>

      {/* Y */}
      <text
        x="77"
        y="60"
        fontFamily="'Outfit', system-ui, sans-serif"
        fontWeight="700"
        fontSize="68"
        fill="currentColor"
      >Y</text>

      {/* MAKE YOUR MOVE tagline */}
      <text
        x="110"
        y="76"
        textAnchor="middle"
        fontFamily="'Inter', system-ui, sans-serif"
        fontWeight="600"
        fontSize="10"
        letterSpacing="3"
        fill="currentColor"
        opacity="0.55"
      >MAKE YOUR MOVE</text>
    </svg>
  );
}
