/** Decorative only: never part of React Flow's measured world. */
export function ObservatoryBackdrop() {
  return (
    <div className="observatory-backdrop" aria-hidden="true">
      {['north', 'south'].map((side) => (
        <svg
          key={side}
          className={`astrolabe-${side}`}
          viewBox="0 0 300 300"
          fill="none"
          stroke="currentColor"
          focusable="false"
        >
          <circle cx="150" cy="150" r="130" />
          <circle cx="150" cy="150" r="112" />
          <path d="M150 12v24m0 228v24M12 150h24m228 0h24M55 55l16 16m158 158 16 16M55 245l16-16M229 71l16-16" />
          <path d="M208 100h8m-4-4v8M106 218h8m-4-4v8M238 185h6m-3-3v6" />
          <circle cx="178" cy="235" r="1" />
          <circle cx="234" cy="131" r="1" />
        </svg>
      ))}
      {[0, 1, 2, 3].map((corner) => (
        <span key={corner} className="observatory-corner" />
      ))}
    </div>
  );
}
