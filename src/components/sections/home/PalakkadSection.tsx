'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PalakkadSection.module.css';
import { useLanguage } from '@/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const advantagesIcons = [
  // Bharathapuzha
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="M2.5 12h19M12 2.5a15.3 15.3 0 0 1 4 9.5 15.3 15.3 0 0 1-4 9.5M12 2.5A15.3 15.3 0 0 0 8 12a15.3 15.3 0 0 0 4 9.5" />
    </svg>
  ),
  // GI Tagged
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="15.5" fontStyle="normal" fontWeight="bold" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">GI</text>
    </svg>
  ),
  // Traditional Aging
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  // Authentic Taste
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h18M12 3v18M12 12l6.5-6.5M12 12L5.5 18.5" />
    </svg>
  ),
  // Farm Traceability
  (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
];

export default function PalakkadSection() {
  const { t, currentTranslations } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const langAdvantages = currentTranslations.palakkad.advantages || [];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('[data-adv-card]');
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="palakkad">
      {/* Background stalks design (Subtle watermarked look) */}
      <div className={styles.stalksBg} aria-hidden="true">
        <svg width="400" height="600" viewBox="0 0 200 300" fill="none" className={styles.stalksSvg}>
          <path d="M30 300 Q80 200 40 50" stroke="rgba(139,90,60,0.06)" strokeWidth="1" strokeLinecap="round" />
          <path d="M38 120 Q20 90 10 95" stroke="rgba(139,90,60,0.06)" strokeWidth="1" />
          <path d="M41 90 Q30 60 20 65" stroke="rgba(139,90,60,0.06)" strokeWidth="1" />
          <path d="M43 60 Q40 30 32 35" stroke="rgba(139,90,60,0.06)" strokeWidth="1" />
          <path d="M60 300 Q110 180 90 30" stroke="rgba(139,90,60,0.06)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M92 100 Q80 70 70 75" stroke="rgba(139,90,60,0.06)" strokeWidth="1" />
          <path d="M91 70 Q90 40 80 45" stroke="rgba(139,90,60,0.06)" strokeWidth="1" />
        </svg>
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left info */}
          <div ref={leftRef} className={styles.left}>
            <span className={styles.eyebrow}>{t('palakkad.eyebrow')}</span>
            <h2 className={styles.heading}>
              {t('palakkad.heading')}
            </h2>
          </div>

          {/* Right Cards */}
          <div ref={cardsRef} className={styles.advantages}>
            {langAdvantages.map((adv, idx) => (
              <div key={idx} className={styles.card} data-adv-card>
                <div className={styles.icon}>{advantagesIcons[idx]}</div>
                <h4 className={styles.title}>{adv.title}</h4>
                <p className={styles.desc}>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
