import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { Share2, ArrowLeft, ChevronDown, Sparkles } from 'lucide-react';
import type { Property } from '../types';

interface TrinityLifescapeScrollHeroProps {
  property: Property;
  onNavigate: (path: string) => void;
  onEnquireClick: () => void;
}

const TOTAL_FRAMES = 240;

const getFramePath = (index: number): string => {
  const frameNum = String(index + 1).padStart(3, '0');
  return `/frames-lifescape/ezgif-frame-${frameNum}.jpg`;
};

export const TrinityLifescapeScrollHero: React.FC<TrinityLifescapeScrollHeroProps> = ({
  property,
  onNavigate,
  onEnquireClick,
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
  const [copiedLink, setCopiedLink] = useState(false);

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
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

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

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    drawFrame(Math.round(currentFrameRef.current));
  }, [drawFrame]);

  // Robust Concurrent Preloader for all 240 frames
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

        const img = new Image();
        img.decoding = 'async';
        img.src = getFramePath(index);

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

    // 1. Immediately load first frame
    loadImage(0).then(() => {
      if (isCancelled) return;
      handleResize();
      drawFrame(0);

      // 2. Load all 240 frames with concurrent queue
      const allIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i);
      const BATCH_SIZE = 16;
      let currentIndex = 0;

      const loadNextBatch = () => {
        if (isCancelled || currentIndex >= allIndices.length) return;
        const batch = allIndices.slice(currentIndex, currentIndex + BATCH_SIZE);
        currentIndex += BATCH_SIZE;

        Promise.all(batch.map(loadImage)).then(() => {
          if (!isCancelled) {
            setTimeout(loadNextBatch, 15);
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

      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * 0.11;
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const scrollToContent = () => {
    const container = containerRef.current;
    if (container) {
      const endPosition = container.offsetTop + container.offsetHeight;
      window.scrollTo({ top: endPosition, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="trinity-scroll-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '380vh', // Calibrated scroll timeline length
        background: '#070b10',
      }}
    >
      {/* Sticky Viewport Window */}
      <div
        className="trinity-sticky-viewport"
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
          }}
        />

        {/* Ambient Vignette & Cinema Gradients */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(7,11,16,0.75) 0%, rgba(7,11,16,0.15) 30%, rgba(7,11,16,0.15) 60%, rgba(7,11,16,0.85) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Radial Depth Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, transparent 45%, rgba(4,7,11,0.55) 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />

        {/* Top Header & Navigation Bar */}
        <header
          style={{
            position: 'relative',
            zIndex: 10,
            padding: '1.25rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Breadcrumbs
              items={[
                { label: 'Projects', path: '/properties' },
                { label: property.name },
              ]}
              onNavigate={onNavigate}
            />

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                onClick={handleShare}
                style={{
                  background: 'rgba(7, 11, 16, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  padding: '0.45rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Share2 size={14} color="#e5b869" />
                <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={() => onNavigate('/properties')}
                style={{
                  background: 'rgba(7, 11, 16, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#ffffff',
                  padding: '0.45rem 1rem',
                  borderRadius: '50px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s ease',
                }}
              >
                <ArrowLeft size={14} />
                <span>All Projects</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Storytelling Overlays (Synchronized to Scroll Progress) */}
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
          {/* Phase 1: Opening Title (Progress 0.0 - 0.24) */}
          <div
            style={{
              textAlign: 'center',
              maxWidth: '960px',
              transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: scrollProgress <= 0.24 ? Math.max(0, 1 - (scrollProgress / 0.24) * 1.5) : 0,
              transform: scrollProgress <= 0.24 ? `translateY(${-scrollProgress * 40}px)` : 'translateY(-30px)',
              pointerEvents: scrollProgress <= 0.2 ? 'auto' : 'none',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.35rem 1rem',
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
              <span>ARCHITECTURAL CINEMATIC PRELUDE</span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 5.5vw, 4.4rem)',
                fontWeight: 800,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                lineHeight: 1.12,
                margin: '0 0 1rem 0',
                color: '#ffffff',
                textShadow: '0 4px 30px rgba(0,0,0,0.9)',
              }}
            >
              REVIVA TRINITY LIFESCAPE
            </h1>

            <p
              style={{
                fontFamily: 'serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.15rem, 2vw, 1.75rem)',
                color: '#ffffff',
                letterSpacing: '1px',
                margin: '0 auto',
                maxWidth: '680px',
                textShadow: '0 2px 14px rgba(0,0,0,0.85)',
              }}
            >
              Where Life Blooms In Every Corner
            </p>
          </div>

          {/* Phase 2: High-Rise Biophilic Elevation (Progress 0.26 - 0.52) */}
          <div
            style={{
              position: 'absolute',
              left: 'clamp(1.5rem, 6vw, 6rem)',
              bottom: 'clamp(5rem, 15vh, 10rem)',
              maxWidth: '560px',
              textAlign: 'left',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
              opacity:
                scrollProgress > 0.24 && scrollProgress < 0.54
                  ? Math.sin(((scrollProgress - 0.24) / 0.3) * Math.PI)
                  : 0,
              transform:
                scrollProgress > 0.24 && scrollProgress < 0.54
                  ? `translateY(${((scrollProgress - 0.39) * 40)}px)`
                  : 'translateY(20px)',
              pointerEvents: scrollProgress > 0.26 && scrollProgress < 0.52 ? 'auto' : 'none',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                letterSpacing: '2.5px',
                color: '#e5b869',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              BIOPHILIC LIVING · 01
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 3.2vw, 2.7rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 0.85rem 0',
                textShadow: '0 3px 20px rgba(0,0,0,0.9)',
              }}
            >
              Residences Overlooking Lush Green Corridors
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                lineHeight: 1.6,
                margin: '0 0 1rem 0',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              }}
            >
              Every home is positioned to overlook landscaped courts and mature tree lines, ensuring an intimate visual connection with nature from every balcony.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(229,184,105,0.4)', color: '#ffffff', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', backdropFilter: 'blur(6px)' }}>
                2, 3 & 4 BHK Luxury
              </span>
              <span style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(229,184,105,0.4)', color: '#ffffff', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', backdropFilter: 'blur(6px)' }}>
                1100 – 2900 Sq. Ft.
              </span>
            </div>
          </div>

          {/* Phase 3: Architectural Features & Harmony (Progress 0.54 - 0.78) */}
          <div
            style={{
              position: 'absolute',
              right: 'clamp(1.5rem, 6vw, 6rem)',
              bottom: 'clamp(5rem, 15vh, 10rem)',
              maxWidth: '560px',
              textAlign: 'right',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
              opacity:
                scrollProgress > 0.52 && scrollProgress < 0.8
                  ? Math.sin(((scrollProgress - 0.52) / 0.28) * Math.PI)
                  : 0,
              transform:
                scrollProgress > 0.52 && scrollProgress < 0.8
                  ? `translateY(${((scrollProgress - 0.66) * 40)}px)`
                  : 'translateY(20px)',
              pointerEvents: scrollProgress > 0.54 && scrollProgress < 0.78 ? 'auto' : 'none',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                letterSpacing: '2.5px',
                color: '#e5b869',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}
            >
              SUSTAINABLE FAÇADE · 02
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 3.2vw, 2.7rem)',
                color: '#ffffff',
                fontWeight: 700,
                lineHeight: 1.2,
                margin: '0 0 0.85rem 0',
                textShadow: '0 3px 20px rgba(0,0,0,0.9)',
              }}
            >
              Aerodynamic Form & Vertical Green Terraces
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)',
                lineHeight: 1.6,
                margin: '0 0 1rem 0',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              }}
            >
              Architectural fins and lush balcony planters reduce solar heat gain while creating an inviting microclimate for residents throughout the seasons.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <span style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(229,184,105,0.4)', color: '#ffffff', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', backdropFilter: 'blur(6px)' }}>
                Optimal Daylight
              </span>
              <span style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(229,184,105,0.4)', color: '#ffffff', padding: '0.35rem 0.85rem', borderRadius: '50px', fontSize: '0.8rem', backdropFilter: 'blur(6px)' }}>
                Integrated Microclimate
              </span>
            </div>
          </div>

          {/* Phase 4: Final Climax & Transition Cue (Progress 0.80 - 1.0) */}
          <div
            style={{
              position: 'absolute',
              textAlign: 'center',
              maxWidth: '800px',
              transition: 'opacity 0.45s ease, transform 0.45s ease',
              opacity: scrollProgress >= 0.8 ? Math.min(1, (scrollProgress - 0.8) / 0.15) : 0,
              transform: scrollProgress >= 0.8 ? `translateY(${Math.max(0, (1 - scrollProgress) * 50)}px)` : 'translateY(30px)',
              pointerEvents: scrollProgress >= 0.82 ? 'auto' : 'none',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                letterSpacing: '3px',
                color: '#e5b869',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}
            >
              WELCOME TO
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
                color: '#ffffff',
                fontWeight: 800,
                letterSpacing: '2px',
                margin: '0 0 1rem 0',
                textShadow: '0 4px 25px rgba(0,0,0,0.9)',
              }}
            >
              REVIVA TRINITY LIFESCAPE
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                lineHeight: 1.6,
                margin: '0 auto 1.5rem auto',
                maxWidth: '620px',
                textShadow: '0 2px 10px rgba(0,0,0,0.85)',
              }}
            >
              Explore the master layout, floor specifications, luxury amenities, and architectural vision below.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={onEnquireClick}
                className="btn-primary btn-magnetic"
                style={{
                  background: '#9F783D',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '0.85rem 2.25rem',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 6px 24px rgba(159, 120, 61, 0.5)',
                }}
              >
                ENQUIRE NOW
              </button>

              <button
                onClick={scrollToContent}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  borderRadius: '50px',
                  padding: '0.85rem 1.75rem',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>EXPLORE DETAILS</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Timeline Scrubber & Scroll Cue */}
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
          {/* Scroll Cue Indicator (Fades out after initial scroll) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              transition: 'opacity 0.4s ease',
              opacity: scrollProgress < 0.08 ? 1 : Math.max(0, 1 - (scrollProgress - 0.08) / 0.1),
            }}
          >
            <div
              style={{
                width: '20px',
                height: '32px',
                borderRadius: '12px',
                border: '1.5px solid rgba(255,255,255,0.4)',
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
                  background: '#e5b869',
                  animation: 'mouseScroll 1.6s infinite ease-in-out',
                }}
              />
            </div>
            <span>Scroll to navigate video timeline</span>
          </div>

          {/* Quick Enquire CTA for Early Scrub */}
          {scrollProgress < 0.8 && (
            <button
              onClick={onEnquireClick}
              className="btn-primary btn-magnetic"
              style={{
                background: '#9F783D',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50px',
                padding: '0.65rem 1.5rem',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(159, 120, 61, 0.4)',
                transition: 'all 0.2s ease',
              }}
            >
              ENQUIRE NOW
            </button>
          )}

          {/* Cinematic Timeline Frame Counter & Progress Bar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.35rem',
            }}
          >
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                letterSpacing: '1.5px',
                color: '#e5b869',
                background: 'rgba(0,0,0,0.5)',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                border: '1px solid rgba(229,184,105,0.3)',
                backdropFilter: 'blur(6px)',
              }}
            >
              FRAME {String(displayFrame + 1).padStart(3, '0')} // {TOTAL_FRAMES}
            </div>

            {/* Micro Timeline Track */}
            <div
              style={{
                width: '120px',
                height: '3px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${scrollProgress * 100}%`,
                  background: 'linear-gradient(90deg, #9F783D 0%, #e5b869 100%)',
                  borderRadius: '3px',
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
                background: '#e5b869',
                boxShadow: '0 0 8px #e5b869',
                transition: 'width 0.2s ease-out',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
