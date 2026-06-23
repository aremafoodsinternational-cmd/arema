'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProductsSection.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const RECOMMENDED_PRODUCTS = [
  {
    id: 'matta-rice',
    name: 'Palakkad Matta Rice',
    category: 'Kerala Heritage',
    tagline: 'The nutrient-dense red-bran heritage grain.',
    image: '/images/product-bag-nobg.png',
  },
  {
    id: 'kuruva-rice',
    name: 'Premium Kuruva Rice',
    category: 'Premium Grade',
    tagline: 'Plump, double-boiled short grains for daily dining.',
    image: '/images/product-bag-nobg.png',
  },
  {
    id: 'aromatic-rice',
    name: 'Jeerakasala Rice',
    category: 'Aromatic Collection',
    tagline: 'Naturally fragrant grains perfect for festive cooking.',
    image: '/images/product-bag-nobg.png',
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          Array.from(cards),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} id="products">
      <div className={styles.container}>
        {/* Header Section */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>Our Most Recommended</span>
          <h2 className={styles.heading}>Heritage Grains. Sourced with Integrity.</h2>
          <p className={styles.body}>
            Altogether we offer a full collection of premium products, but these three signature varieties carry the heart of Palakkad to dinner tables around the world.
          </p>
        </div>

        {/* 3-Column Grid */}
        <div ref={gridRef} className={styles.grid}>
          {RECOMMENDED_PRODUCTS.map((prod) => (
            <Link key={prod.id} href={`/products/${prod.id}`} className={styles.card}>
              <div className={styles.imageContainer}>
                {/* Radial Spotlight Light Glow */}
                <div className={styles.spotlight} />
                {/* Floating Rice Bag */}
                <div className={styles.bagWrapper}>
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    width={300}
                    height={390}
                    className={styles.riceBag}
                    priority
                  />
                </div>
                {/* Shadow underneath to enhance float effect */}
                <div className={styles.shadow} />
              </div>
              <div className={styles.info}>
                <span className={styles.cardCategory}>{prod.category}</span>
                <h3 className={styles.cardTitle}>{prod.name}</h3>
                <p className={styles.cardTagline}>{prod.tagline}</p>
                <span className={styles.viewDetails}>
                  View Details
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore More CTA */}
        <div className={styles.ctaWrapper}>
          <Link href="/products" className="btn btn--primary">
            View More Products
          </Link>
        </div>
      </div>
    </section>
  );
}
