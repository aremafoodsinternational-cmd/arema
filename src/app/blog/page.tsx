import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Blog.module.css';
import NewsletterForm from './NewsletterForm';

export const metadata: Metadata = {
  title: 'Field Notes — Arema Foods International',
  description:
    'Stories, insights, and perspectives from Arema Foods International — on farming, quality, heritage, and the global food trade.',
};

/* ── Article Data ──────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Heritage', 'Farming', 'Quality', 'Trade', 'Process'];

const articles = [
  {
    id: 'matta-rice-world-stage',
    category: 'Heritage',
    readTime: '6 min read',
    date: 'March 2024',
    title: 'How Palakkad Matta Rice Found Its Place on the World Stage',
    excerpt:
      'For centuries, Matta rice was the staple of Kerala\'s working families. Today, it commands premium positioning in European health food markets and Michelin-starred restaurant menus. The journey of a grain that never needed to change.',
    image: '/images/blog-images.png',
    featured: true,
  },
  {
    id: 'palakkad-farmers',
    category: 'Farming',
    readTime: '5 min read',
    date: 'November 2023',
    title: 'The Farmers Behind Every Arema Grain',
    excerpt:
      'We work with a curated network of farmers who share one belief: that how you grow something is as important as what you grow. Meet the families behind the fields.',
    image: '/images/tl-01.png',
    featured: false,
  },
  {
    id: 'export-standards',
    category: 'Quality',
    readTime: '4 min read',
    date: 'January 2024',
    title: 'Why Export Quality Is a Philosophy, Not a Certificate',
    excerpt:
      'Certifications matter — but they are the floor, not the ceiling. At Arema, we believe true quality is built in the field, not the laboratory.',
    image: '/images/tl-02.png',
    featured: false,
  },
  {
    id: 'global-rice-markets',
    category: 'Trade',
    readTime: '7 min read',
    date: 'September 2023',
    title: 'Navigating the Global Rice Market in 2024',
    excerpt:
      'As global food supply chains continue to evolve, premium origin products are finding new audiences. Here is what the market is telling us.',
    image: '/images/tl-03.png',
    featured: false,
  },
  {
    id: 'parboiling-process',
    category: 'Process',
    readTime: '5 min read',
    date: 'July 2023',
    title: 'The Science and Tradition of Parboiling',
    excerpt:
      'Parboiling is one of the oldest forms of rice processing — and one of the most misunderstood. We explain why it matters for nutrition, texture, and shelf life.',
    image: '/images/tl-04.png',
    featured: false,
  },
];

/* ── Arrow Icon ─────────────────────────────────────────────── */
function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function BlogPage() {
  const featured = articles.find((a) => a.featured)!;
  const rest = articles.filter((a) => !a.featured);

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className={styles.hero}>
        <Image
          src="/images/hero.png"
          alt="Palakkad rice fields at golden hour"
          fill
          className={styles.heroBg}
          priority
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Field Notes</p>
          <h1 className={styles.heroTitle}>
            Stories from <em>the&nbsp;Source</em>
          </h1>
          <div className={styles.heroMeta}>
            <span className={styles.articleCount}>{articles.length} Articles</span>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ──────────────────────────── */}
      <nav className={styles.filterBar} aria-label="Blog categories">
        <div className={styles.filterInner}>
          <span className={styles.filterLabel}>Filter</span>
          {CATEGORIES.map((cat) => (
            <span key={cat} className={`${styles.pill} ${cat === 'All' ? styles.pillActive : ''}`}>
              {cat}
            </span>
          ))}
        </div>
      </nav>

      {/* ── FEATURED ARTICLE ─────────────────────────── */}
      <section className={styles.featuredSection}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>Featured Story</p>
          <Link href={`/blog/${featured.id}`} className={styles.featuredCard}>
            {/* Image */}
            <div className={styles.featuredImageWrap}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className={styles.featuredImg}
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />
              <span className={styles.featuredBadge}>Featured</span>
            </div>

            {/* Body */}
            <div className={styles.featuredBody}>
              <div className={styles.cardMeta}>
                <span className={styles.categoryTag}>{featured.category}</span>
                <span className={styles.dot} />
                <span className={styles.readTime}>{featured.readTime}</span>
              </div>
              <p className={styles.dateText}>{featured.date}</p>
              <h2 className={styles.cardTitle}>{featured.title}</h2>
              <p className={styles.cardExcerpt}>{featured.excerpt}</p>
              <span className={styles.readLink}>
                Read Article <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── ARTICLE GRID ─────────────────────────────── */}
      <section className={styles.gridSection}>
        <div className={styles.sectionInner}>
          <p className={styles.sectionLabel}>More Stories</p>
          <div className={styles.grid}>
            {rest.map((article) => (
              <Link key={article.id} href={`/blog/${article.id}`} className={styles.articleCard}>
                {/* Thumbnail */}
                <div className={styles.cardImageWrap}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className={styles.cardImg}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className={styles.cardCategoryBadge}>{article.category}</span>
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <div className={styles.cardMeta}>
                    <span className={styles.readTime}>{article.readTime}</span>
                  </div>
                  <h3 className={styles.cardTitleSm}>{article.title}</h3>
                  <p className={styles.cardExcerptSm}>{article.excerpt}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardDate}>{article.date}</span>
                    <span className={styles.cardArrow}>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────── */}
      <section className={styles.newsletter}>
        <Image
          src="/images/tl-05.png"
          alt="Global trade — cargo ship at sunset"
          fill
          className={styles.newsletterBg}
          sizes="100vw"
        />
        <div className={styles.newsletterOverlay} />
        <div className={styles.newsletterContent}>
          <p className={styles.newsletterEyebrow}>Stay Informed</p>
          <h2 className={styles.newsletterTitle}>
            Grains, Markets &amp; More — In Your Inbox
          </h2>
          <p className={styles.newsletterBody}>
            Subscribe to Field Notes for monthly dispatches on heritage rice, sustainable farming,
            and the stories behind Arema&apos;s global reach.
          </p>
          <NewsletterForm />
          <p className={styles.privacyNote}>No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>
    </main>
  );
}
