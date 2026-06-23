'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HeroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 80;

const pad = (num: number, size: number) => {
  let s = num + '';
  while (s.length < size) s = '0' + s;
  return s;
};

const currentFramePath = (index: number) => {
  return `/images/hero-frames/ezgif-frame-${pad(index + 1, 3)}.jpg`;
};

const drawImageProp = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x = 0,
  y = 0,
  w: number,
  h: number,
  offsetX = 0.5,
  offsetY = 0.5
) => {
  const iw = img.width;
  const ih = img.height;
  const r = Math.min(w / iw, h / ih);
  let nw = iw * r;
  let nh = ih * r;
  let cx = 0;
  let cy = 0;
  let cw = iw;
  let ch = ih;
  let ar = 1;

  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
  nw *= ar;
  nh *= ar;

  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
};

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll to top immediately on mount to prevent scroll restoration from messing up initialization
    window.scrollTo(0, 0);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    const loadedIndices = new Set<number>();
    const frameObj = { frame: 0 };

    // Load first frame immediately for instant visual
    const firstImg = new window.Image();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const currentFrameIndex = Math.round(frameObj.frame);
      if (loadedIndices.size === TOTAL_FRAMES && images[currentFrameIndex]) {
        drawImageProp(ctx, images[currentFrameIndex], 0, 0, canvas.width, canvas.height);
      } else if (firstImg.complete) {
        drawImageProp(ctx, firstImg, 0, 0, canvas.width, canvas.height);
      }
    };

    const handleFirstLoad = () => {
      resizeCanvas();
      drawImageProp(ctx, firstImg, 0, 0, canvas.width, canvas.height);
    };

    firstImg.onload = handleFirstLoad;
    firstImg.src = currentFramePath(0);
    if (firstImg.complete) handleFirstLoad();

    window.addEventListener('resize', resizeCanvas);

    // Wrap in gsap.context so everything created inside is automatically cleaned up on revert()
    const gsapCtx = gsap.context(() => {
      // Preload all remaining frames
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new window.Image();
        const index = i;
        
        const markLoaded = () => {
          if (loadedIndices.has(index)) return;
          loadedIndices.add(index);
          
          if (loadedIndices.size === TOTAL_FRAMES) {
            const scrollTimeline = gsap.timeline({
              scrollTrigger: {
                id: 'hero-trigger',
                trigger: heroRef.current,
                start: 'top top',
                end: '+=150%', // Pinned scroll scrubbing distance
                pin: true,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });

            // 1. Scrub canvas frames from index 0 to 79
            scrollTimeline.to(frameObj, {
              frame: TOTAL_FRAMES - 1,
              ease: 'none',
              duration: 1,
              onUpdate: () => {
                const imgIndex = Math.round(frameObj.frame);
                if (images[imgIndex]) {
                  drawImageProp(ctx, images[imgIndex], 0, 0, canvas.width, canvas.height);
                }
              },
            }, 0);

            // 2. Scrub text opacities sequentially
            // Text 1 starts visible (opacity: 1) and fades out at 0.18 to 0.26
            scrollTimeline.to(text1Ref.current, { opacity: 0, ease: 'power1.inOut', duration: 0.08 }, 0.18);

            // Text 2 starts invisible (opacity: 0), fades in at 0.33 to 0.41, fades out at 0.58 to 0.66
            scrollTimeline.to(text2Ref.current, { opacity: 1, ease: 'power1.inOut', duration: 0.08 }, 0.33);
            scrollTimeline.to(text2Ref.current, { opacity: 0, ease: 'power1.inOut', duration: 0.08 }, 0.58);

            // Text 3 starts invisible (opacity: 0), fades in at 0.73 to 0.81, fades out at 0.92 to 1.0
            scrollTimeline.to(text3Ref.current, { opacity: 1, ease: 'power1.inOut', duration: 0.08 }, 0.73);
            scrollTimeline.to(text3Ref.current, { opacity: 0, ease: 'power1.inOut', duration: 0.08 }, 0.92);
            
            ScrollTrigger.refresh();
          }
        };

        img.onload = markLoaded;
        img.onerror = markLoaded;
        img.src = currentFramePath(i);
        
        if (img.complete && img.naturalWidth > 0) {
          markLoaded();
        }
        images.push(img);
      }
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert(); // Reverts and destroys all ScrollTriggers and timelines created in context
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
          Every grain carries a story.
        </div>
        <div ref={text2Ref} className={styles.scrubText}>
          A story born in the fields of Palakkad.
        </div>
        <div ref={text3Ref} className={styles.scrubText}>
          Now reaching tables across the world.
        </div>
      </div>

      {/* Scroll cue */}
      <div className={styles.heroScroll}>
        <span className={styles.heroScrollText}>SCROLL TO ENTER</span>
        <div className={styles.heroScrollLine} />
      </div>
    </section>
  );
}
