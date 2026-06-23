'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProductDetailPage.module.css';

gsap.registerPlugin(ScrollTrigger);

interface RiceGrain {
  id: number;
  top: string;
  left?: string;
  right?: string;
  width: number;
  height: number;
  rotation: number;
}

const RICE_GRAINS: RiceGrain[] = [
  { id: 1, top: '12%', left: '8%', width: 42, height: 29, rotation: 15 },
  { id: 2, top: '25%', left: '42%', width: 32, height: 22, rotation: -35 },
  { id: 3, top: '75%', left: '15%', width: 38, height: 26, rotation: 45 },
  { id: 4, top: '85%', left: '45%', width: 28, height: 19, rotation: -15 },
  { id: 5, top: '15%', right: '12%', width: 36, height: 25, rotation: 75 },
  { id: 6, top: '48%', right: '35%', width: 30, height: 20, rotation: -60 },
  { id: 7, top: '65%', right: '8%', width: 40, height: 27, rotation: 110 },
  { id: 8, top: '82%', right: '40%', width: 34, height: 23, rotation: 20 },
  { id: 9, top: '5%', left: '25%', width: 30, height: 20, rotation: -10 },
  { id: 10, top: '38%', left: '10%', width: 36, height: 25, rotation: 125 },
  { id: 11, top: '60%', left: '30%', width: 26, height: 18, rotation: 50 },
  { id: 12, top: '90%', left: '20%', width: 34, height: 23, rotation: -45 },
  { id: 13, top: '8%', right: '28%', width: 28, height: 19, rotation: -80 },
  { id: 14, top: '30%', right: '18%', width: 40, height: 27, rotation: 95 },
  { id: 15, top: '55%', right: '22%', width: 32, height: 22, rotation: 15 },
  { id: 16, top: '72%', right: '28%', width: 38, height: 26, rotation: -105 },
];

interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  image: string;
  gradient: string;
}

interface ProductDetailClientProps {
  product: Product;
  otherProducts: Product[];
}

export default function ProductDetailClient({ product, otherProducts }: ProductDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bagAreaRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const titlePanelRef = useRef<HTMLDivElement>(null);
  const detailPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll to top immediately on mount to prevent scroll restoration from messing up initialization
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop layout Scroll Animation
      mm.add('(min-width: 1025px)', () => {
        // Timeline for the scroll-bound split-screen transition
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current, // Target scroll wrapper container
            start: 'top top',
            end: () => '+=' + window.innerHeight * 1.0, // Finish animation after 100vh scroll (before unpinning)
            scrub: 0.3, // Snappy scrub to avoid lagging or glitchy feel
          },
        });

        // Translate the entire bag area (bag + shadow) from Left Panel to Right Panel
        // xPercent translates relative to width of bagArea (50vw), moving it exactly to the right panel
        tl.to(bagAreaRef.current, {
          xPercent: 100,
          duration: 0.8,
          ease: 'power1.inOut',
        }, 0);

        // Fade out Title and Category on the Right
        tl.to(titlePanelRef.current, {
          opacity: 0,
          y: -60,
          duration: 0.5,
          ease: 'power1.inOut',
        }, 0);

        // Fade in details/description panel on the Left
        tl.fromTo(detailPanelRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power1.inOut',
          },
          0.3 // fade in description slightly after title starts fading out
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={containerRef} className={styles.scrollWrapper}>
      {/* ── PINNED HERO / DETAIL SECTION ──────────────── */}
      <section className={styles.heroSection} style={{ background: product.gradient }}>
        {/* Floating Rice Grains Background */}
        {RICE_GRAINS.map((grain) => (
          <div
            key={grain.id}
            className={styles.riceGrainWatermark}
            style={{
              top: grain.top,
              left: grain.left,
              right: grain.right,
              width: `${grain.width}px`,
              height: `${grain.height}px`,
              transform: `rotate(${grain.rotation}deg)`
            }}
          >
            <Image
              src="/images/rice-grain-single.png"
              alt=""
              width={grain.width}
              height={grain.height}
              className={styles.grainImage}
            />
          </div>
        ))}

        {/* Background Watermark Rice Stalks (Left & Right) */}
        <div className={styles.bgWatermarkLeft}>
          <Image
            src="/images/rice-stalk.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 45vw"
            priority
            className={styles.watermarkImage}
          />
        </div>
        <div className={styles.bgWatermarkRight}>
          <Image
            src="/images/rice-stalk.png"
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 45vw"
            priority
            className={styles.watermarkImage}
          />
        </div>

        <div className={styles.splitScreen}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            {/* Screen 2: Description & Details (fades in on scroll) */}
            <div ref={detailPanelRef} className={styles.detailPanel}>
              <span className={styles.category}>{product.category}</span>
              <h2 className={styles.panelTitle}>{product.name}</h2>
              <p className={styles.description}>{product.description}</p>
              
              {/* Highlights Chips */}
              <div className={styles.highlightsContainer}>
                <h3 className={styles.subHeading}>Key Characteristics</h3>
                <div className={styles.highlightsGrid}>
                  {product.highlights.map((highlight, index) => (
                    <div key={index} className={styles.highlightChip}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={styles.checkIcon}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Suspended Rice Bag & Shadow (translates left-to-right on scroll) */}
            <div ref={bagAreaRef} className={styles.bagArea}>
              <div ref={bagRef} className={styles.bagWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={390}
                  height={520}
                  className={styles.suspendedImage}
                  priority
                />
              </div>
              <div ref={shadowRef} className={styles.shadow} />
            </div>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            {/* Screen 1: Title & Category (fades out on scroll) */}
            <div ref={titlePanelRef} className={styles.titlePanel}>
              <Link href="/products" className={styles.backLink}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                All products
              </Link>
              <span className={styles.category}>{product.category}</span>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.tagline}>{product.tagline}</p>
              <div className={styles.scrollIndicator}>
                <span>Scroll down to discover</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={styles.bounceArrow}>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    {/* ── UNPINNED ADDITIONAL SPECS & CTA SECTION ────── */}
    <section className={styles.specsSection}>
        <div className={styles.container}>
          <div className={styles.specsGrid}>
            {/* Specifications Card */}
            <div className={styles.specsContainer}>
              <h3 className={styles.subHeading}>Product Specifications</h3>
              <div className={styles.specsTable}>
                {product.specs.map((spec, index) => (
                  <div key={index} className={styles.specRow}>
                    <div className={styles.specLabel}>{spec.label}</div>
                    <div className={styles.specValue}>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Enquiry Card */}
            <div className={styles.enquiryBlock}>
              <h4 className={styles.enquiryTitle}>Wholesale & Global Export Enquiries</h4>
              <p className={styles.enquiryText}>
                We supply premium grade grains in customizable packaging options for international distributors, supermarkets, and catering chains.
              </p>
              <div className={styles.enquiryActions}>
                <Link href="/contact" className="btn btn--primary">
                  Request Wholesale Quote
                </Link>
                <a href="mailto:aremafoodsinternational@gmail.com" className={styles.mailLink}>
                  aremafoodsinternational@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Recommendations Row */}
          <div className={styles.recommendationsSection}>
            <h2 className={styles.recHeading}>Explore Other Recommended Varieties</h2>
            <div className={styles.recGrid}>
              {otherProducts.map((p, idx) => (
                <Link key={p.id} href={`/products/${p.id}`} className={styles.recCard}>
                  <div className={styles.recImageContainer}>
                    <div className={`${styles.recBagWrapper} ${idx === 0 ? styles.floatA : styles.floatB}`}>
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={160}
                        height={210}
                        className={styles.recImage}
                      />
                    </div>
                    <div className={styles.recShadow} />
                  </div>
                  <div className={styles.recInfo}>
                    <span className={styles.recCategory}>{p.category}</span>
                    <h3 className={styles.recCardTitle}>{p.name}</h3>
                    <span className={styles.recLink}>
                      View Specifications
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
