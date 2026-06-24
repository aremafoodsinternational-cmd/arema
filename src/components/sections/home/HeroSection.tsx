'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';
import { useLanguage } from '@/i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 80;

const pad = (num: number, size: number) => {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
};

const currentFramePath = (index: number) =>
  `/images/hero-frames/ezgif-frame-${pad(index + 1, 3)}.jpg`;

const drawImageProp = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x = 0, y = 0, w: number, h: number,
  offsetX = 0.5, offsetY = 0.5
) => {
  const iw = img.width, ih = img.height;
  const r = Math.min(w / iw, h / ih);
  let nw = iw * r, nh = ih * r;
  let cx = 0, cy = 0, cw = iw, ch = ih;
  let ar = 1;
  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
  nw *= ar; nh *= ar;
  cw = iw / (nw / w); ch = ih / (nh / h);
  cx = (iw - cw) * offsetX; cy = (ih - ch) * offsetY;
  if (cx < 0) cx = 0; if (cy < 0) cy = 0;
  if (cw > iw) cw = iw; if (ch > ih) ch = ih;
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
};

export default function HeroSection() {
  const { t } = useLanguage();
  const heroRef    = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const text1Ref   = useRef<HTMLDivElement>(null);
  const text2Ref   = useRef<HTMLDivElement>(null);
  const text3Ref   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── 1. Kill any leftover ScrollTriggers from a previous home visit ──────
    // This is critical: navigating Home → Other → Home leaves stale instances
    ScrollTrigger.getAll()
      .filter(st => st.vars.id === 'hero-trigger')
      .forEach(st => st.kill());

    // ── 2. Reset scroll position via native API (Lenis may override window.scrollTo) ──
    // Use a tiny delay so Lenis finishes its current scroll before we override
    const scrollResetTimer = setTimeout(() => {
      // Directly set the scroll element (Lenis wraps document.documentElement)
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      // Also tell GSAP about the new scroll position
      ScrollTrigger.refresh();
    }, 50);

    // ── 3. Size canvas immediately so it's never blank on first paint ────────
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const images: HTMLImageElement[] = [];
    const loadedIndices = new Set<number>();
    const frameObj = { frame: 0 };

    // Draw first frame as soon as possible for instant visual
    const firstImg = new window.Image();
    const drawFirst = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      drawImageProp(ctx, firstImg, 0, 0, canvas.width, canvas.height);
    };
    firstImg.onload = drawFirst;
    firstImg.src = currentFramePath(0);
    if (firstImg.complete && firstImg.naturalWidth > 0) drawFirst();

    // Resize handler
    const resizeCanvas = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const idx = Math.round(frameObj.frame);
      const src = images[idx] ?? firstImg;
      if (src && src.complete && src.naturalWidth > 0) {
        drawImageProp(ctx, src, 0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', resizeCanvas);

    // ── 4. Wrap all GSAP work in a context for clean teardown ───────────────
    const gsapCtx = gsap.context(() => {
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img   = new window.Image();
        const index = i;

        const markLoaded = () => {
          if (loadedIndices.has(index)) return;
          loadedIndices.add(index);

          // Once ALL frames are loaded, set up the ScrollTrigger
          if (loadedIndices.size === TOTAL_FRAMES) {
            // Small delay so the DOM is fully painted before ScrollTrigger measures heights
            requestAnimationFrame(() => {
              const scrollTimeline = gsap.timeline({
                scrollTrigger: {
                  id: 'hero-trigger',
                  trigger: heroRef.current,
                  start: 'top top',
                  end: '+=150%',
                  pin: true,
                  scrub: true,
                  invalidateOnRefresh: true,
                  // Force a fresh measurement on creation
                  onRefresh: () => ScrollTrigger.refresh(true),
                },
              });

              // Scrub canvas frames
              scrollTimeline.to(frameObj, {
                frame: TOTAL_FRAMES - 1,
                ease: 'none',
                duration: 1,
                onUpdate: () => {
                  const imgIdx = Math.round(frameObj.frame);
                  if (images[imgIdx]) {
                    drawImageProp(ctx, images[imgIdx], 0, 0, canvas.width, canvas.height);
                  }
                },
              }, 0);

              // Scrub text opacity
              scrollTimeline.to(text1Ref.current, { opacity: 0, ease: 'power1.inOut', duration: 0.08 }, 0.18);
              scrollTimeline.to(text2Ref.current, { opacity: 1, ease: 'power1.inOut', duration: 0.08 }, 0.33);
              scrollTimeline.to(text2Ref.current, { opacity: 0, ease: 'power1.inOut', duration: 0.08 }, 0.58);
              scrollTimeline.to(text3Ref.current, { opacity: 1, ease: 'power1.inOut', duration: 0.08 }, 0.73);
              scrollTimeline.to(text3Ref.current, { opacity: 0, ease: 'power1.inOut', duration: 0.08 }, 0.92);

              ScrollTrigger.refresh();
            });
          }
        };

        img.onload  = markLoaded;
        img.onerror = markLoaded;
        img.src     = currentFramePath(i);
        if (img.complete && img.naturalWidth > 0) markLoaded();
        images.push(img);
      }
    });

    // ── 5. Cleanup on unmount ───────────────────────────────────────────────
    return () => {
      clearTimeout(scrollResetTimer);
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert(); // kills all timelines + ScrollTriggers created above
    };
  }, []);

  return (
    <section ref={heroRef} className={styles.hero} id="hero">
      <div className={styles.heroImgWrap}>
        <canvas ref={canvasRef} className={styles.heroCanvas} />
        <div className={styles.heroOverlay} />
      </div>

      {/* Scrolling Text Scrubbing Layer */}
      <div className={styles.textScrubContainer}>
        <div ref={text1Ref} className={`${styles.scrubText} ${styles.scrubText1}`}>
          {t('hero.scrubText1')}
        </div>
        <div ref={text2Ref} className={styles.scrubText}>
          {t('hero.scrubText2')}
        </div>
        <div ref={text3Ref} className={styles.scrubText}>
          {t('hero.scrubText3')}
        </div>
      </div>

      {/* Scroll cue */}
      <div className={styles.heroScroll}>
        <span className={styles.heroScrollText}>{t('hero.scrollCue')}</span>
        <div className={styles.heroScrollLine} />
      </div>
    </section>
  );
}
