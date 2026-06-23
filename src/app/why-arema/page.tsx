import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './WhyArema.module.css';

export const metadata: Metadata = {
  title: 'Why Choose Arema — Authentic Palakkadan Matta',
  description: 'Bringing the pure goodness of the Bharathapuzha river to your table. Discover why Arema is the trusted choice for fresh, natural, and authentic Palakkadan Matta.',
};

const PILLARS = [
  {
    title: 'Natural',
    body: 'Bringing the pure goodness of the Bharathapuzha river to your table, our products are harvested fresh and natural, just as nature intended.',
  },
  {
    title: 'Quality',
    body: 'We never compromise on quality. Every Arema product is carefully checked to ensure you get only the best.',
  },
  {
    title: 'Healthy',
    body: 'We offer fresh, healthy, and natural food to support your family\'s well-being and a balanced lifestyle.',
  },
  {
    title: 'Originality',
    body: 'We believe in authentic flavors. Our products are always fresh and free from any artificial additives.',
  },
  {
    title: 'Trust',
    body: 'We believe in being honest and transparent. You can trust us to provide safe, genuine, and quality products every time.',
  },
];

export default function WhyAremaPage() {
  return (
    <main>
      
      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroLabel}>The Arema Difference</span>
          <h1 className={styles.heroTitle}>
            Nothing added.<br />
            <em className={styles.heroTitleEm}>Nothing compromised.</em>
          </h1>
          <p className={styles.heroDesc}>
            From the fertile banks of the Bharathapuzha directly to your dining table. 
            We do not alter what nature perfected; we only preserve it. 
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ACCENT IMAGE STRIP
      ══════════════════════════════════════════════ */}
      <div className={styles.heroImageStrip}>
        <Image 
          src="/images/tl-02.png" 
          alt="Palakkadan paddy fields" 
          fill 
          sizes="100vw"
        />
      </div>

      {/* ══════════════════════════════════════════════
          THE 5 PILLARS (From PDF)
      ══════════════════════════════════════════════ */}
      <section className={styles.pillars}>
        <div className={styles.pillarsInner}>
          {/* Left Column - Sticky Header */}
          <div className={styles.pillarsSticky}>
            <span className={styles.pillarsLabel}>Our Core Values</span>
            <h2 className={styles.pillarsHeading}>
              Why Choose<br />
              <em className={styles.pillarsHeadingEm}>Arema.</em>
            </h2>
          </div>

          {/* Right Column - Editorial List */}
          <div className={styles.pillarsList}>
            {PILLARS.map((pillar, index) => (
              <div key={pillar.title} className={styles.pillarItem}>
                <span className={styles.pillarIndex}>0{index + 1}</span>
                <div className={styles.pillarContent}>
                  <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                  <p className={styles.pillarBody}>{pillar.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURE SPLIT
      ══════════════════════════════════════════════ */}
      <section className={styles.feature}>
        <div className={styles.featureInner}>
          <div className={styles.featureImageWrap}>
            <Image 
              src="/images/tl-04.png" 
              alt="Hands holding pure Palakkadan Matta rice" 
              fill 
              sizes="50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.featureContent}>
            <h2 className={styles.featureTitle}>
              Rooted in<br />
              <em className={styles.featureTitleEm}>tradition.</em>
            </h2>
            <p className={styles.featureBody}>
              Every grain of Arema Matta rice is a testament to the centuries-old 
              agricultural heritage of Palakkad. When you choose Arema, you are 
              choosing authenticity that you can taste in every bite.
            </p>
            <div className={styles.featureList}>
              {['Sourced from Bharathapuzha Basin', '100% Free of Artificial Additives', 'Rigorous Quality Checks', 'Transparent Supply Chain'].map(item => (
                <div key={item} className={styles.featureListItem}>
                  <span className={styles.featureListDot} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
