import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

interface HomeScrollHeroProps {
  onNavigate: (path: string) => void;
  onOpenEnquiry: () => void;
}

// Stage 1: Hero 1 (240 frames)
// Stage 2: Hero 2 (179 frames)
// Stage 3: Hero 3 (260 frames)
const HERO1_COUNT = 240;
const HERO2_COUNT = 179;
const HERO3_COUNT = 260;
const TOTAL_FRAMES = HERO1_COUNT + HERO2_COUNT + HERO3_COUNT; // 679 frames

const getFramePath = (index: number): { path: string; chapter: number; chapterFrame: number; chapterTotal: number } => {
  if (index < HERO1_COUNT) {
    const frameNum = String(index + 1).padStart(3, '0');
    return {
      path: `/hero1-frames/ezgif-frame-${frameNum}.jpg`,
      chapter: 1,
      chapterFrame: index + 1,
      chapterTotal: HERO1_COUNT,
    };
  } else if (index < HERO1_COUNT + HERO2_COUNT) {
    const localIdx = index - HERO1_COUNT;
    const frameNum = String(localIdx + 1).padStart(3, '0');
    return {
      path: `/hero2-frames/ezgif-frame-${frameNum}.jpg`,
      chapter: 2,
      chapterFrame: localIdx + 1,
      chapterTotal: HERO2_COUNT,
    };
  } else {
    const localIdx = index - (HERO1_COUNT + HERO2_COUNT);
    const frameNum = String(localIdx + 1).padStart(3, '0');
    return {
      path: `/hero3-frames/ezgif-frame-${frameNum}.jpg`,
      chapter: 3,
      chapterFrame: localIdx + 1,
      chapterTotal: HERO3_COUNT,
    };
  }
};

export const HomeScrollHero: React.FC<HomeScrollHeroProps> = ({
  onNavigate,
  onOpenEnquiry,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cache for all loaded Image objects
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isFrameLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));

  // Frame tracking state & animation
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const animFrameIdRef = useRef<number | null>(null);

  const [displayFrame, setDisplayFrame] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);

  // Helper to find closest loaded frame if requested frame is still downloading
  const getNearestLoadedImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const safeIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetIdx));
    if (imagesRef.current[safeIdx] && isFrameLoadedRef.current[safeIdx]) {
      return imagesRef.current[safeIdx];
    }
    // Search outwards from target index
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const left = safeIdx - offset;
      const right = safeIdx + offset;
      if (left >= 0 && isFrameLoadedRef.current[left] && imagesRef.current[left]) {
        return imagesRef.current[left];
      }
      if (right < TOTAL_FRAMES && isFrameLoadedRef.current[right] && imagesRef.current[right]) {
        return imagesRef.current[right];
      }
    }
    return imagesRef.current[0] && isFrameLoadedRef.current[0] ? imagesRef.current[0] : null;
  }, []);

  // Draw image to canvas with cover fit & high DPI
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = getNearestLoadedImage(frameIdx);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    // Calculate "cover" dimensions
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const renderWidth = imgWidth * scale;
    const renderHeight = imgHeight * scale;
    const offsetX = (canvasWidth - renderWidth) / 2;
    const offsetY = (canvasHeight - renderHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  }, [getNearestLoadedImage]);

  // Canvas resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    canvas.width = targetW;
    canvas.height = targetH;
    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Robust Concurrent Preloader for 3 sequential stages
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;

    const updateProgress = (loadedIndex: number) => {
      if (isCancelled) return;
      loadedCount++;
      const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadingProgress(pct);

      if (loadedCount >= 1 && !isInitialReady) {
        setIsInitialReady(true);
      }

      // Redraw if the loaded frame is near the current scrub position
      const current = Math.round(currentFrameRef.current);
      if (Math.abs(current - loadedIndex) <= 3) {
        drawFrame(current);
      }
    };

    const loadImage = (index: number): Promise<HTMLImageElement | null> => {
      return new Promise((resolve) => {
        if (imagesRef.current[index] && isFrameLoadedRef.current[index]) {
          resolve(imagesRef.current[index]);
          return;
        }

        const { path } = getFramePath(index);
        const img = new Image();
        img.decoding = 'async';
        img.src = path;

        img.onload = () => {
          if (isCancelled) {
            resolve(null);
            return;
          }
          imagesRef.current[index] = img;
          isFrameLoadedRef.current[index] = true;
          updateProgress(index);
          if (index === 0) {
            drawFrame(0);
          }
          resolve(img);
        };

        img.onerror = () => {
          if (isCancelled) {
            resolve(null);
            return;
          }
          updateProgress(index);
          resolve(null);
        };
      });
    };

    // 1. Immediately prioritize Keyframes (Frame 001 of Hero 1, Hero 2, Hero 3)
    const priorityKeyframes = [0, HERO1_COUNT, HERO1_COUNT + HERO2_COUNT];
    Promise.all(priorityKeyframes.map(loadImage)).then(() => {
      if (isCancelled) return;
      handleResize();
      drawFrame(0);

      // 2. Load all 679 frames concurrently in ordered batches
      const allIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i);
      const BATCH_SIZE = 18;
      let currentIndex = 0;

      const loadNextBatch = () => {
        if (isCancelled || currentIndex >= allIndices.length) return;
        const batch = allIndices.slice(currentIndex, currentIndex + BATCH_SIZE);
        currentIndex += BATCH_SIZE;

        Promise.all(batch.map(loadImage)).then(() => {
          if (!isCancelled) {
            setTimeout(loadNextBatch, 12);
          }
        });
      };

      loadNextBatch();
    });

    return () => {
      isCancelled = true;
    };
  }, [drawFrame, handleResize, isInitialReady]);

  // Window resize listener
  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // Scroll listener & smooth interpolation render loop
  useEffect(() => {
    let lastRenderedFrame = -1;

    const updateScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const rawProgress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
      setScrollProgress(rawProgress);

      const targetIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(rawProgress * (TOTAL_FRAMES - 1))));
      targetFrameRef.current = targetIdx;
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    // Lerping Animation Loop for 60/120fps fluid playback
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.02) {
        currentFrameRef.current += diff * 0.32;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      if (frameToDraw !== lastRenderedFrame) {
        lastRenderedFrame = frameToDraw;
        setDisplayFrame(frameToDraw);
        drawFrame(frameToDraw);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', updateScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  const scrollToContent = () => {
    const container = containerRef.current;
    if (container) {
      const endPosition = container.offsetTop + container.offsetHeight;
      window.scrollTo({ top: endPosition, behavior: 'smooth' });
    }
  };

  const currentFrameInfo = getFramePath(displayFrame);

  return (
    <div
      ref={containerRef}
      className="home-scroll-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '480vh',
        background: '#070b10',
      }}
    >
      {/* Sticky Viewport Window */}
      <div
        className="home-sticky-viewport"
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#070b10',
          zIndex: 10,
        }}
      >
        {/* Full Viewport Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            zIndex: 1,
            filter: 'contrast(102%) brightness(96%)',
          }}
        />

        {/* Ambient Cinema Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7,11,16,0.65) 0%, rgba(7,11,16,0.12) 30%, rgba(7,11,16,0.12) 65%, rgba(7,11,16,0.85) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Radial Depth Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 40%, rgba(4,7,11,0.55) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Top Header Spacing Area */}
        <div style={{ position: 'relative', zIndex: 10, height: '80px' }} />

        {/* Dynamic Storytelling Overlays (Synchronized across Hero 1 -> Hero 2 -> Hero 3) */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem 1.5rem',
            pointerEvents: 'none',
          }}
        >
          {/* Chapter 1: Hero 1 - Architectural Grandeur (Progress 0.00 - 0.35) */}
          <div
            style={{
              textAlign: 'center',
              maxWidth: '960px',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: scrollProgress <= 0.32 ? Math.max(0, 1 - (scrollProgress / 0.32) * 1.4) : 0,
              transform: scrollProgress <= 0.32 ? `translateY(${-scrollProgress * 40}px)` : 'translateY(-30px)',
              pointerEvents: scrollProgress <= 0.28 ? 'auto' : 'none',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 1.1rem',
                borderRadius: '50px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Sparkles size={12} />
              <span>CHAPTER 01 · ARCHITECTURAL EXCELLENCE</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
                fontWeight: 800,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                margin: '0 0 1rem 0',
                color: '#ffffff',
                textShadow: '0 4px 30px rgba(0,0,0,0.9)',
              }}
            >
              REVIVA PROJECTS
            </h1>

            <p
              style={{
                fontFamily: 'serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.15rem, 2.2vw, 1.85rem)',
                color: '#ffffff',
                letterSpacing: '1px',
                margin: '0 auto',
                maxWidth: '720px',
                textShadow: '0 2px 14px rgba(0,0,0,0.85)',
              }}
            >
              Bringing Meaning to Life • Iconic Architectural Living
            </p>
          </div>

          {/* Chapter 2: Hero 2 - Biophilic Serenity & Facades (Progress 0.35 - 0.63) */}
          <div
            style={{
              position: 'absolute',
              left: 'clamp(1.5rem, 6vw, 6rem)',
              bottom: 'clamp(5rem, 15vh, 10rem)',
              maxWidth: '580px',
              textAlign: 'left',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
              opacity:
                scrollProgress > 0.34 && scrollProgress < 0.64
                  ? Math.sin(((scrollProgress - 0.34) / 0.3) * Math.PI)
                  : 0,
              transform:
                scrollProgress > 0.34 && scrollProgress < 0.64
                  ? `translateY(${((scrollProgress - 0.49) * 40)}px)`
                  : 'translateY(20px)',
              pointerEvents: scrollProgress > 0.35 && scrollProgress < 0.63 ? 'auto' : 'none',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                letterSpacing: '2.5px',
                color: '#ffffff',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.65rem',
                background: 'rgba(255,255,255,0.12)',
                padding: '0.25rem 0.85rem',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Sparkles size={11} />
              <span>CHAPTER 02 · BIOPHILIC SPACES</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3.4vw, 2.9rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 0.85rem 0',
                textShadow: '0 3px 20px rgba(0,0,0,0.9)',
              }}
            >
              Nature-Infused Residences & Panoramic Views
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                lineHeight: 1.6,
                margin: '0 0 1.2rem 0',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              }}
            >
              Experience seamless harmony between lush green vertical corridors, sky lounges, and natural ventilation in Whitefield’s prime enclaves.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <button
                onClick={() => onNavigate('/properties')}
                style={{
                  background: '#9F783D',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.55rem 1.35rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 16px rgba(159, 120, 61, 0.4)',
                }}
              >
                <span>View Projects</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Chapter 3: Hero 3 - Timeless Horizons & Legacy (Progress 0.64 - 0.94) */}
          <div
            style={{
              position: 'absolute',
              right: 'clamp(1.5rem, 6vw, 6rem)',
              bottom: 'clamp(5rem, 15vh, 10rem)',
              maxWidth: '580px',
              textAlign: 'right',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
              opacity:
                scrollProgress > 0.64 && scrollProgress < 0.95
                  ? Math.sin(((scrollProgress - 0.64) / 0.31) * Math.PI)
                  : 0,
              transform:
                scrollProgress > 0.64 && scrollProgress < 0.95
                  ? `translateY(${((scrollProgress - 0.79) * 40)}px)`
                  : 'translateY(20px)',
              pointerEvents: scrollProgress > 0.65 && scrollProgress < 0.94 ? 'auto' : 'none',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.75rem',
                letterSpacing: '2.5px',
                color: '#ffffff',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.65rem',
                background: 'rgba(255,255,255,0.12)',
                padding: '0.25rem 0.85rem',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Sparkles size={11} />
              <span>CHAPTER 03 · TIMELESS HORIZONS</span>
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 3.4vw, 2.9rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 0.85rem 0',
                textShadow: '0 3px 20px rgba(0,0,0,0.9)',
              }}
            >
              Crafted For Generations • Built With Passion
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                lineHeight: 1.6,
                margin: '0 0 1.2rem 0',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              }}
            >
              Every home is a masterwork of structural integrity, biophilic luxury, and sustainable architecture engineered for a lifetime of well-being.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={onOpenEnquiry}
                style={{
                  background: '#9F783D',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.55rem 1.35rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(159, 120, 61, 0.4)',
                }}
              >
                Book a Site Visit
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Timeline Scrubber & Chapter Indicator */}
        <footer
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '1.25rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          {/* Scroll Cue Indicator (Fades out smoothly as user begins scrubbing) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              transition: 'opacity 0.4s ease',
              opacity: scrollProgress < 0.06 ? 1 : Math.max(0, 1 - (scrollProgress - 0.06) / 0.08),
            }}
          >
            <div
              style={{
                width: '20px',
                height: '32px',
                borderRadius: '12px',
                border: '1.5px solid rgba(255,255,255,0.5)',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '6px',
              }}
            >
              <div
                style={{
                  width: '3px',
                  height: '6px',
                  borderRadius: '2px',
                  background: '#ffffff',
                  animation: 'mouseScroll 1.6s infinite ease-in-out',
                }}
              />
            </div>
            <span>Scroll to explore cinematic chapters</span>
          </div>

          {/* Quick Explore Button in Middle */}
          {scrollProgress > 0.88 && (
            <button
              onClick={scrollToContent}
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.4)',
                color: '#ffffff',
                borderRadius: '50px',
                padding: '0.6rem 1.4rem',
                fontWeight: 600,
                fontSize: '0.8rem',
                letterSpacing: '1px',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s ease',
              }}
            >
              <span>CONTINUE EXPLORING</span>
              <ChevronDown size={14} />
            </button>
          )}

          {/* Cinematic Chapter Counter & Progress Track */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.35rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '1.5px',
                  color: '#ffffff',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                CHAPTER 0{currentFrameInfo.chapter} // 03
              </div>

              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '1.5px',
                  color: '#ffffff',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                FRAME {String(displayFrame + 1).padStart(3, '0')} // {TOTAL_FRAMES}
              </div>
            </div>

            {/* Micro Timeline Track with 3-segment divisions */}
            <div
              style={{
                width: '140px',
                height: '4px',
                background: 'rgba(255,255,255,0.18)',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${scrollProgress * 100}%`,
                  background: 'linear-gradient(90deg, #9F783D 0%, #e5b869 60%, #ffffff 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.05s linear',
                }}
              />
            </div>
          </div>
        </footer>

        {/* Discreet Initial Loading Progress Bar */}
        {loadingProgress < 100 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '2px',
              background: 'rgba(0,0,0,0.5)',
              zIndex: 50,
              pointerEvents: 'none',
              opacity: loadingProgress >= 90 ? 0 : 1,
              transition: 'opacity 0.8s ease',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${loadingProgress}%`,
                background: '#ffffff',
                boxShadow: '0 0 8px #ffffff',
                transition: 'width 0.2s ease-out',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
