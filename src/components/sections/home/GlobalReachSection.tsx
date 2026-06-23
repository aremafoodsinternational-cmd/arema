'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './GlobalReachSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GlobalReachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="global-reach">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          {/* Left content (Land / Truck mapping) */}
          <div ref={leftRef} className={styles.left}>
            <span className={styles.eyebrow}>WHAT WE DO</span>
            <h2 className={styles.heading}>
              From Palakkad<br />to the World.
            </h2>
            <p className={styles.body}>
              We export the finest certified Palakkad specialty grains, managing the entire supply chain by land, sea, and air to ensure premium quality reaches your table.
            </p>
            <Link href="/contact" className={styles.cta}>
              EXPLORE OUR EXPORT CAPABILITIES
              <span className={styles.arrowCircle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Section Footer for qualities */}
        <div ref={footerRef} className={styles.sectionFooter}>
          <div className={styles.qualityItem}>
            <span className={styles.qualityLabel}>30+ COUNTRIES</span>
          </div>
          <div className={styles.qualityDivider} />
          <div className={styles.qualityItem}>
            <span className={styles.qualityLabel}>100% CERTIFIED</span>
          </div>
          <div className={styles.qualityDivider} />
          <div className={styles.qualityItem}>
            <span className={styles.qualityLabel}>DIRECT SOURCING</span>
          </div>
          <div className={styles.qualityDivider} />
          <div className={styles.qualityItem}>
            <span className={styles.qualityLabel}>PREMIUM PACKAGING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
