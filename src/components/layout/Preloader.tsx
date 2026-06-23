'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import styles from './Preloader.module.css';

export default function Preloader() {
  const [active, setActive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scrolling initially
    document.body.style.overflow = 'hidden';

    // Timeline for preloader
    const tl = gsap.timeline({
      onComplete: () => {
        // Slide up the container smoothly
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            document.body.style.overflow = '';
            setActive(false);
          }
        });
      }
    });

    // 1. Fade in the logo in the center
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    });

    // 2. Animate the loading bar from 0% to 100%
    tl.to(progressRef.current, {
      width: '100%',
      duration: 1.4,
      ease: 'power2.inOut'
    }, '-=0.3');

    // 3. Fade out the logo slightly before sliding up the page
    tl.to(logoRef.current, {
      scale: 0.96,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in'
    }, '+=0.1');

  }, []);

  if (!active) return null;

  return (
    <div ref={containerRef} className={styles.preloaderContainer}>
      <div className={styles.centerContent}>
        {/* Logo badge in center */}
        <div ref={logoRef} className={styles.logoWrap}>
          <Image
            src="/images/logo.png"
            alt="Arema Foods"
            width={100}
            height={100}
            priority
            className={styles.logoImg}
          />
        </div>
        
        {/* Elegant small progress loading bar below logo */}
        <div className={styles.loaderBarContainer}>
          <div ref={progressRef} className={styles.loaderBarProgress} />
        </div>
      </div>
    </div>
  );
}
