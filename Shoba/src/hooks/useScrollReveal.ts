import { gsap, useGSAP, ScrollTrigger } from '../lib/gsapSetup';

const REVEAL_CONFIGS: Array<{ selector: string; from: gsap.TweenVars }> = [
  { selector: '.reveal', from: { opacity: 0, y: 28 } },
  { selector: '.reveal-left', from: { opacity: 0, x: -36 } },
  { selector: '.reveal-right', from: { opacity: 0, x: 36 } },
  { selector: '.reveal-scale', from: { opacity: 0, scale: 0.93 } },
];

export function useScrollReveal(deps: unknown[] = []) {
  useGSAP(
    () => {
      REVEAL_CONFIGS.forEach(({ selector, from }) => {
        gsap.utils.toArray<HTMLElement>(selector).forEach((el) => {
          gsap.fromTo(el, from, {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          });
        });
      });

      gsap.utils.toArray<HTMLElement>('.stagger-children').forEach((group) => {
        const children = Array.from(group.children) as HTMLElement[];
        if (!children.length) return;
        gsap.fromTo(children, { opacity: 0, y: 20 }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            once: true,
          },
        });
      });

      // Scroll-direction image zoom: each <img> scales up as it scrolls up through
      // the viewport (scrolling down) and scales back down as you scroll back up —
      // driven directly by scroll position via scrub, so it naturally reverses.
      // Skip .flip-parallax images: that CSS hover effect also animates `transform`,
      // and GSAP's inline style would silently win the fight over a bare CSS :hover rule.
      gsap.utils.toArray<HTMLImageElement>('img:not(.flip-parallax)').forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1 },
          {
            scale: 1.18,
            ease: 'none',
            scrollTrigger: {
              trigger: img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    },
    { dependencies: deps, revertOnUpdate: true }
  );
}
