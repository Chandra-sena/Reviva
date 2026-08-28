import React from 'react';

interface BirdsAccentProps {
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: string;
  opacity?: number;
  color?: string;
}

const CORNER_STYLES: Record<NonNullable<BirdsAccentProps['corner']>, React.CSSProperties> = {
  'top-left': { top: 0, left: 0, transform: 'scaleX(-1)' },
  'top-right': { top: 0, right: 0 },
  'bottom-left': { bottom: 0, left: 0, transform: 'scale(-1, -1)' },
  'bottom-right': { bottom: 0, right: 0, transform: 'scaleY(-1)' },
};

const WING = 'M700 100 c-20 -30 -60 -40 -90 -20 c25 5 45 20 50 40 c-30 -15 -70 -10 -95 15 c30 -5 60 5 70 25 c-20 0 -40 10 -50 25 c25 -5 45 5 55 20 Z';

/** Scatter positions (x%, y% within the 800x600 viewBox, scale, opacity
 * multiplier) for a loose flock — denser and larger toward the anchored
 * corner, thinning outward. Matches the scattered-flock rhythm of
 * revivaprojects.com's own watermark, built from our single wing glyph
 * instead of reusing their asset file. */
const FLOCK = [
  { x: 88, y: 16, scale: 1.15, o: 1 },
  { x: 70, y: 8, scale: 0.85, o: 0.85 },
  { x: 78, y: 30, scale: 0.7, o: 0.75 },
  { x: 95, y: 38, scale: 0.95, o: 0.9 },
  { x: 58, y: 20, scale: 0.6, o: 0.6 },
  { x: 66, y: 40, scale: 0.55, o: 0.55 },
  { x: 84, y: 52, scale: 0.8, o: 0.8 },
  { x: 44, y: 12, scale: 0.45, o: 0.4 },
  { x: 52, y: 34, scale: 0.4, o: 0.4 },
  { x: 92, y: 64, scale: 0.6, o: 0.6 },
  { x: 30, y: 26, scale: 0.35, o: 0.28 },
  { x: 72, y: 58, scale: 0.42, o: 0.4 },
  { x: 38, y: 44, scale: 0.32, o: 0.25 },
  { x: 60, y: 66, scale: 0.3, o: 0.25 },
];

/**
 * Decorative flying-birds watermark — a loose scattered flock of wing
 * silhouettes in flight, same motif originally used inline in
 * PassionAtWork.tsx, now shared so it can be reused as a corner accent
 * alongside LeafAccent and DoveAccent.
 */
export const BirdsAccent: React.FC<BirdsAccentProps> = ({
  corner = 'top-right',
  size = '30%',
  opacity = 0.18,
  color = '#9F783D',
}) => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        aspectRatio: '4 / 3',
        pointerEvents: 'none',
        opacity,
        zIndex: 0,
        ...CORNER_STYLES[corner],
      }}
    >
      <svg viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        {FLOCK.map((bird, idx) => (
          <g
            key={idx}
            fill={color}
            opacity={bird.o}
            transform={`translate(${bird.x * 8} ${bird.y * 6}) scale(${bird.scale}) translate(-700 -100)`}
          >
            <path d={WING} />
          </g>
        ))}
      </svg>
    </div>
  );
};
