import React from 'react';

/**
 * Vector paths extracted directly from REVIVA BRAND BOOK.pdf (Logo Construction /
 * Monotone pages) via PDF path-geometry extraction — pixel-accurate reproduction
 * of the official dove mark and wordmark, not an approximation.
 */

interface DoveMarkProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const DoveMark: React.FC<DoveMarkProps> = ({ size = 32, color = '#9E783C', style }) => {
  const height = size * (45.58 / 49.41);
  return (
    <svg width={size} height={height} viewBox="0 0 49.41 45.58" fill="none" style={style}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
        d="M28.26,19.31 C28.26,19.31 32.55,11.79 34.43,0.60 C34.51,0.12 34.72,0.03 34.93,0.01 C35.16,0.00 35.35,0.14 35.55,0.53 C37.03,3.53 39.65,10.64 37.07,19.83 C37.07,19.83 31.03,19.68 28.26,19.31 Z M36.60,21.52 L36.60,21.51 L41.83,17.71 C43.73,16.33 45.24,16.17 46.79,16.94 C48.42,17.75 49.41,19.80 48.58,22.14 L49.25,24.52 C49.33,24.80 49.15,25.00 48.86,24.81 L47.33,23.77 C46.64,23.30 45.87,23.28 45.36,23.57 C44.79,23.90 44.52,24.62 44.38,25.51 C43.58,33.17 38.63,39.79 30.31,40.68 C30.04,40.71 29.90,40.61 29.83,40.50 C29.74,40.35 29.82,40.12 30.06,39.91 C33.83,36.52 36.99,29.81 36.54,23.61 C36.53,23.45 36.48,23.38 36.44,23.36 C36.38,23.34 36.32,23.42 36.25,23.58 C35.64,25.06 34.81,26.86 33.90,28.04 C26.61,27.61 17.29,24.56 10.93,21.84 C10.29,21.57 10.01,21.85 10.57,22.36 C14.13,25.60 21.11,31.08 30.02,34.10 C26.31,39.29 19.54,43.59 13.81,45.45 C13.40,45.58 13.18,45.56 13.03,45.44 C12.87,45.29 12.84,45.01 13.20,44.56 C15.33,41.96 17.49,39.11 19.28,36.29 C19.28,36.29 9.49,30.91 0.60,16.06 C0.13,15.26 0.00,14.68 0.34,14.21 C0.67,13.77 1.21,13.82 2.06,14.17 C17.14,20.37 29.42,21.24 36.60,21.52 Z"
      />
    </svg>
  );
};

interface RevivaWordmarkProps {
  height?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const RevivaWordmark: React.FC<RevivaWordmarkProps> = ({ height = 20, color = '#ffffff', style }) => {
  // Exact coordinate bounding box for "REVIVA" wordmark from official revivaprojects.com SVG
  // X range: ~ -433.88 to -209.02 (width ~ 224.86), Y range: 135.55 to 174.03 (height ~ 38.48)
  const width = height * (225 / 38.5);
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="-434 135.5 225 38.5" 
      fill="none" 
      style={style}
    >
      {/* R */}
      <path 
        d="M-480.956,160.649h4.3V145.835h10.893l11.057,14.814h5.283l-11.71-15.577c5.991-1.088,10.349-4.793,10.349-11.11v-.109a10.531,10.531,0,0,0-2.941-7.517c-2.4-2.4-6.154-3.813-10.839-3.813h-16.394Zm4.3-18.682V126.5h11.764c6.156,0,9.75,2.833,9.75,7.517v.109c0,4.9-4.086,7.843-9.8,7.843Z" 
        transform="translate(47.071 13.11)" 
        fill={color} 
      />
      <path 
        d="M-474.2,134.349h-5.625l-2.82,3.867h8.446Z" 
        transform="translate(45.983 20.729)" 
        fill={color} 
      />

      {/* E */}
      <path 
        d="M-454.162,160.649h27.832v-3.921h-23.529V143.384h20.806v-3.922h-20.806V126.445H-426.6v-3.922h-27.56Z" 
        transform="translate(64.332 13.11)" 
        fill={color} 
      />
      <path 
        d="M-447.46,132.827h-5.6l-2.842,3.867h8.445Z" 
        transform="translate(63.209 19.748)" 
        fill={color} 
      />

      {/* V (first) */}
      <path 
        d="M-414.717,160.922h3.813l16.395-38.4h-4.63l-13.617,32.843-13.562-32.843h-4.793Z" 
        transform="translate(79.181 13.11)" 
        fill={color} 
      />

      {/* I */}
      <rect 
        width="4.303" 
        height="38.126" 
        transform="translate(-303.155 135.634)" 
        fill={color} 
      />

      {/* V (second) */}
      <path 
        d="M-375.276,160.922h3.813l16.394-38.4h-4.63l-13.617,32.843-13.562-32.843h-4.793Z" 
        transform="translate(104.589 13.11)" 
        fill={color} 
      />

      {/* A */}
      <path 
        d="M-357.161,146.759l8.715-19.39,8.66,19.39,1.689,3.921,4.466,10.076H-329l-17.375-38.4h-4.03l-17.375,38.4h4.411l4.521-10.076Z" 
        transform="translate(119.979 13.004)" 
        fill={color} 
      />
      <path 
        d="M-333.26,137.731h-30.527v3.921h28.075Z" 
        transform="translate(122.552 22.907)" 
        fill={color} 
      />
    </svg>
  );
};
