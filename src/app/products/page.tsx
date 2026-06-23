import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductsPage.module.css';

export const metadata: Metadata = {
  title: 'Products | Arema Foods',
  description: 'Explore our curated collection of premium Kerala rice varieties from Palakkad — Matta, Kuruva, Jeerakasala, and specialty heritage grains.',
};

const CATALOG_PRODUCTS = [
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
  {
    id: 'biryani-rice',
    name: 'Malabar Biryani Rice',
    category: 'Aromatic Collection',
    tagline: 'Superfine aged grains bringing authentic scent to Malabar Biryani.',
    image: '/images/product-bag-nobg.png',
  },
  {
    id: 'navara-rice',
    name: 'Traditional Navara Rice',
    category: 'Medicinal & Heritage',
    tagline: 'Revered ancient grain of Kerala used in traditional health systems.',
    image: '/images/product-bag-nobg.png',
  },
  {
    id: 'gandhakasala-rice',
    name: 'Gandhakasala Rice',
    category: 'Specialty Aromatic',
    tagline: 'Rare aromatic variety from Wayanad and Palakkad hills.',
    image: '/images/product-bag-nobg.png',
  },
];

export default function ProductsPage() {
  return (
    <main className={styles.main}>
      {/* ── HERO HEADER ────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Our Collection</span>
          <h1 className={styles.title}>The Grains of Palakkad</h1>
          <p className={styles.subtitle}>
            A curated range of authentic, premium Kerala rice varieties, processed with care and exported to tables across the world.
          </p>
        </div>
      </section>

      {/* ── CATALOG GRID SECTION ──────────────────────────── */}
      <section className={styles.catalogSection}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {CATALOG_PRODUCTS.map((prod) => (
              <Link key={prod.id} href={`/products/${prod.id}`} className={styles.card}>
                <div className={styles.imageContainer}>
                  {/* Floating Rice Bag */}
                  <div className={styles.bagWrapper}>
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      width={280}
                      height={360}
                      className={styles.riceBag}
                      priority
                    />
                  </div>
                  {/* Shadow underneath to enhance float effect */}
                  <div className={styles.shadow} />
                </div>
                <div className={styles.info}>
                  <span className={styles.cardCategory}>{prod.category}</span>
                  <h2 className={styles.cardTitle}>{prod.name}</h2>
                  <p className={styles.cardTagline}>{prod.tagline}</p>
                  <span className={styles.viewDetails}>
                    View Specifications
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
