import React from 'react';

interface LeafAccentProps {
  /** Which corner the branch grows from/points toward. */
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Watermark size as a % of the section's width. */
  size?: string;
  opacity?: number;
  color?: string;
}

const CORNER_STYLES: Record<NonNullable<LeafAccentProps['corner']>, React.CSSProperties> = {
  'top-left': { top: 0, left: 0, transform: 'scaleX(1)' },
  'top-right': { top: 0, right: 0, transform: 'scaleX(-1)' },
  'bottom-left': { bottom: 0, left: 0, transform: 'scaleY(-1)' },
  'bottom-right': { bottom: 0, right: 0, transform: 'scale(-1, -1)' },
};

/**
 * Decorative botanical branch watermark — the green counterpart to the gold
 * wing motif used elsewhere (see PassionAtWork.tsx). Purely decorative: no
 * pointer events, sits behind content via a low z-index/absolute position.
 */
export const LeafAccent: React.FC<LeafAccentProps> = ({
  corner = 'top-right',
  size = '32%',
  opacity = 0.16,
  color = '#00433D',
}) => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        aspectRatio: '3 / 5',
        pointerEvents: 'none',
        opacity,
        zIndex: 0,
        ...CORNER_STYLES[corner],
      }}
    >
      <svg viewBox="0 0 240 400" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <path d="M40 400 C 30 300, 55 200, 100 120 C 130 68, 175 30, 220 10" stroke={color} strokeWidth="5" strokeLinecap="round" />
        <path d="M100 120 C 70 108, 45 112, 22 132 C 45 128, 68 134, 84 150 C 70 138, 52 136, 34 144 C 58 138, 80 144, 96 158 Z" fill={color} />
        <path d="M130 68 C 100 56, 74 62, 52 84 C 76 78, 100 84, 116 100 C 100 88, 82 86, 64 94 C 90 88, 112 96, 128 110 Z" fill={color} />
        <path d="M160 40 C 132 30, 108 36, 88 56 C 110 50, 132 56, 146 70 C 132 60, 116 58, 100 64 C 124 60, 144 66, 158 80 Z" fill={color} />
        <path d="M75 160 C 48 154, 24 162, 6 184 C 28 176, 50 180, 64 196 C 50 186, 34 184, 18 190 C 42 186, 62 192, 76 204 Z" fill={color} />
        <path d="M55 230 C 30 228, 8 238, -6 260 C 14 250, 36 252, 50 268 C 38 258, 22 256, 8 262 C 30 258, 48 264, 60 278 Z" fill={color} />
      </svg>
    </div>
  );
};
