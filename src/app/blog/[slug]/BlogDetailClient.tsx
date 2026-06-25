'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import styles from './BlogDetailPage.module.css';

interface Article {
  id: string;
  category: string;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  body: string[];
  author: string;
  authorRole: string;
}

export default function BlogDetailClient({ article }: { article: Article }) {
  const { currentTranslations, t } = useLanguage();

  const trans = currentTranslations.blogData?.[article.id];
  const translatedArticle = {
    ...article,
    category: trans?.category || article.category,
    readTime: trans?.readTime || article.readTime,
    date: trans?.date || article.date,
    title: trans?.title || article.title,
    excerpt: trans?.excerpt || article.excerpt,
    body: trans?.body || article.body,
    image: (trans as any)?.image_url || article.image,
  };

  useEffect(() => {
    document.title = `${translatedArticle.title} — Arema Foods`;
  }, [translatedArticle.title]);

  return (
    <main className={styles.main}>
      {/* ── HERO IMAGE ─────────────────────────────── */}
      <div className={styles.hero}>
        <Image
          src={translatedArticle.image}
          alt={translatedArticle.title}
          fill
          className={styles.heroImg}
          priority
        />
        <div className={styles.heroOverlay} />
        {/* Overlay content */}
        <div className={styles.heroContent}>
          <Link href="/blog" className={styles.backLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            {t('blogPage.eyebrow')}
          </Link>
          <div className={styles.metaRow}>
            <span className={styles.metaCategory}>{translatedArticle.category}</span>
            <span className={styles.metaDot} />
            <span className={styles.metaText}>{translatedArticle.readTime}</span>
            <span className={styles.metaDot} />
            <span className={styles.metaText}>{translatedArticle.date}</span>
          </div>
          <h1 className={styles.title}>{translatedArticle.title}</h1>
        </div>
      </div>

      {/* ── ARTICLE BODY ───────────────────────────── */}
      <article className={styles.article}>
        {/* Byline */}
        <div className={styles.byline}>
          <div className={styles.authorAvatar}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(250,248,245,0.8)" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <p className={styles.authorName}>{translatedArticle.author}</p>
            <p className={styles.authorRole}>{translatedArticle.authorRole}</p>
          </div>
        </div>

        {/* Lead */}
        <p className={styles.excerpt}>
          {translatedArticle.excerpt}
        </p>

        {/* Body paragraphs */}
        {translatedArticle.body.map((para, i) => (
          <p key={i} className={styles.paragraph}>
            {para}
          </p>
        ))}

        {/* Back link */}
        <div className={styles.footerRow}>
          <Link href="/blog" className={styles.bottomBackLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            {t('blogPage.backToBlog')}
          </Link>
        </div>
      </article>
    </main>
  );
}
