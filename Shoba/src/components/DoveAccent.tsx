import React from 'react';

interface DoveAccentProps {
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: string;
  opacity?: number;
  color?: string;
}

const CORNER_STYLES: Record<NonNullable<DoveAccentProps['corner']>, React.CSSProperties> = {
  'top-left': { top: 0, left: 0 },
  'top-right': { top: 0, right: 0, transform: 'scaleX(-1)' },
  'bottom-left': { bottom: 0, left: 0 },
  'bottom-right': { bottom: 0, right: 0, transform: 'scaleX(-1)' },
};

/**
 * Decorative watermark using the brand's actual dove mark (same path as
 * DoveMark in RevivaLogo.tsx) — a real brand element, not an invented shape.
 * Purely decorative: no pointer events, sits behind content.
 */
export const DoveAccent: React.FC<DoveAccentProps> = ({
  corner = 'top-right',
  size = '22%',
  opacity = 0.12,
  color = '#00433D',
}) => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        width: size,
        aspectRatio: '49.41 / 45.58',
        pointerEvents: 'none',
        opacity,
        zIndex: 0,
        ...CORNER_STYLES[corner],
      }}
    >
      <svg viewBox="0 0 49.41 45.58" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill={color}
          d="M28.26,19.31 C28.26,19.31 32.55,11.79 34.43,0.60 C34.51,0.12 34.72,0.03 34.93,0.01 C35.16,0.00 35.35,0.14 35.55,0.53 C37.03,3.53 39.65,10.64 37.07,19.83 C37.07,19.83 31.03,19.68 28.26,19.31 Z M36.60,21.52 L36.60,21.51 L41.83,17.71 C43.73,16.33 45.24,16.17 46.79,16.94 C48.42,17.75 49.41,19.80 48.58,22.14 L49.25,24.52 C49.33,24.80 49.15,25.00 48.86,24.81 L47.33,23.77 C46.64,23.30 45.87,23.28 45.36,23.57 C44.79,23.90 44.52,24.62 44.38,25.51 C43.58,33.17 38.63,39.79 30.31,40.68 C30.04,40.71 29.90,40.61 29.83,40.50 C29.74,40.35 29.82,40.12 30.06,39.91 C33.83,36.52 36.99,29.81 36.54,23.61 C36.53,23.45 36.48,23.38 36.44,23.36 C36.38,23.34 36.32,23.42 36.25,23.58 C35.64,25.06 34.81,26.86 33.90,28.04 C26.61,27.61 17.29,24.56 10.93,21.84 C10.29,21.57 10.01,21.85 10.57,22.36 C14.13,25.60 21.11,31.08 30.02,34.10 C26.31,39.29 19.54,43.59 13.81,45.45 C13.40,45.58 13.18,45.56 13.03,45.44 C12.87,45.29 12.84,45.01 13.20,44.56 C15.33,41.96 17.49,39.11 19.28,36.29 C19.28,36.29 9.49,30.91 0.60,16.06 C0.13,15.26 0.00,14.68 0.34,14.21 C0.67,13.77 1.21,13.82 2.06,14.17 C17.14,20.37 29.42,21.24 36.60,21.52 Z"
        />
      </svg>
    </div>
  );
};
