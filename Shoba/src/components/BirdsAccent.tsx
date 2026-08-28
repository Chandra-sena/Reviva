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

/**
 * Decorative flying-birds watermark — three wing silhouettes in flight,
 * same motif originally used inline in PassionAtWork.tsx, now shared so it
 * can be reused as a corner accent alongside LeafAccent and DoveAccent.
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
        <g fill={color}>
          <path d="M700 100 c-20 -30 -60 -40 -90 -20 c25 5 45 20 50 40 c-30 -15 -70 -10 -95 15 c30 -5 60 5 70 25 c-20 0 -40 10 -50 25 c25 -5 45 5 55 20 Z" />
          <path d="M620 220 c-15 -20 -45 -30 -70 -15 c18 4 32 15 36 30 c-22 -10 -52 -8 -70 10 c22 -4 44 4 52 18 c-15 0 -30 8 -38 18 c18 -4 32 4 40 15 Z" />
          <path d="M730 320 c-12 -16 -36 -24 -56 -12 c14 3 25 12 28 24 c-17 -8 -41 -6 -56 8 c17 -3 35 3 41 14 c-12 0 -24 6 -30 14 c14 -3 25 3 32 12 Z" />
        </g>
      </svg>
    </div>
  );
};
