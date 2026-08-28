import React, { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsapSetup';

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** Animates a number counting up from 0 → end once it scrolls into view. */
export const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  style,
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const counter = { value: 0 };
      gsap.to(counter, {
        value: end,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
        onUpdate: () => {
          el.textContent = `${prefix}${counter.value.toLocaleString('en-US', {
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals,
          })}${suffix}`;
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}0{suffix}
    </span>
  );
};
