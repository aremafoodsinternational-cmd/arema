'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyAremaSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pillars = [
  {
    title: 'Natural',
    desc: 'Pure goodness from the fertile soil of Bharathapuzha.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22 16 8" />
        <path d="M17.5 6.5c2.3-2.3 4.5-4.5 4.5-4.5s-2.2 2.2-4.5 4.5c-3.1 3.1-4 7.6-1.5 10.1 2.5 2.5 7-1.6 10.1-4.7z" />
        <path d="M12 17c-1 2-3 4-5 4" />
        <path d="M8 13c.5-1 1.5-2 3-2" />
      </svg>
    ),
  },
  {
    title: 'Quality',
    desc: 'Every grain is carefully tested to ensure the best quality.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="3" />
      </svg>
    ),
  },
  {
    title: 'Healthy',
    desc: 'Fresh, healthy and natural food for a better lifestyle.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    title: 'Originality',
    desc: 'Authentic flavours with zero artificial additives.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.7 10.3a2.4 2.4 0 0 0 0 3.4l3.7 3.7a2.4 2.4 0 0 0 3.4 0l10.5-10.5a2.4 2.4 0 0 0 0-3.4L16.6 2.2a2.4 2.4 0 0 0-3.4 0L2.7 10.3Z" />
        <path d="m12 12-1.5 1.5M9 15l-1.5 1.5" />
      </svg>
    ),
  },
  {
    title: 'Trust',
    desc: 'Honest, transparent and reliable in every step we take.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function WhyAremaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

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

      const cards = pillarsRef.current?.querySelectorAll('[data-pillar]');
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
    <section ref={sectionRef} className={styles.section} id="why-arema">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left info */}
          <div ref={leftRef} className={styles.left}>
            <span className={styles.eyebrow}>WHY CHOOSE AREMA</span>
            <h2 className={styles.heading}>
              Pure by nature.<br />
              Trusted by the world.
            </h2>
          </div>

          {/* Right pillars list */}
          <div ref={pillarsRef} className={styles.pillars} id="why-arema-pillars">
            {pillars.map((p) => (
              <div key={p.title} className={styles.pillar} data-pillar>
                <div className={styles.icon}>{p.icon}</div>
                <h4 className={styles.title}>{p.title}</h4>
                <p className={styles.desc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
