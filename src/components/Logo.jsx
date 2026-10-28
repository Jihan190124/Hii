// The VEL mark: a single-line lily (three petals) beside a widely spaced serif wordmark.
export function LilyMark({ size = 24, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 0.78}
      viewBox="-26 -33 52 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 0C-6-10-5-22 0-30C5-22 6-10 0 0Z" />
      <path d="M0 0C-12-6-20-16-22-24C-12-22-4-12 0 0Z" />
      <path d="M0 0C12-6 20-16 22-24C12-22 4-12 0 0Z" />
    </svg>
  );
}

export default function Logo({ stacked = false }) {
  return (
    <span className={`vel-logo${stacked ? ' vel-logo--stacked' : ''}`}>
      <LilyMark size={stacked ? 34 : 24} />
      <span className="vel-logo__word" aria-hidden="true">VEL</span>
      <span className="vel-sr">VEL</span>
    </span>
  );
}
