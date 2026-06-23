'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './BlogSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const blogPosts = [
  {
    category: 'HERITAGE',
    title: 'The Authenticity of the Granary',
    img: '/images/blog-images.png',
    position: '0% 0%',
  },
  {
    category: 'HEALTH',
    title: "Why doesn't Matta taste like the 90's anymore?",
    img: '/images/blog-images.png',
    position: '50% 0%',
  },
  {
    category: 'FARMERS',
    title: 'Bharathapuzha Farmers: Our True Partners',
    img: '/images/blog-images.png',
    position: '100% 0%',
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      const cards = gridRef.current?.querySelectorAll('[data-blog-card]');
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="blog">
      <div className={styles.container}>
        {/* Header row */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.eyebrow}>INSIGHTS &amp; STORIES</span>
            <h2 className={styles.heading}>
              Stories from our land.<br />
              For the world.
            </h2>
          </div>
          <Link href="/blog" className={styles.headerLink}>
            VIEW ALL ARTICLES
            <span className={styles.arrowCircle}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className={styles.grid}>
          {blogPosts.map((post, i) => (
            <Link href="/blog" key={i} className={styles.card} data-blog-card>
              <div className={styles.imageContainer}>
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className={styles.image}
                  style={{ objectPosition: post.position }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 24vw"
                />
                <div className={styles.overlay} />
              </div>
              <div className={styles.content}>
                <span className={styles.category}>{post.category}</span>
                <h4 className={styles.title}>{post.title}</h4>
                <div className={styles.readMore}>
                  READ MORE
                  <span className={styles.readMoreArrow}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
