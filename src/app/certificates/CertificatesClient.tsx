'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import styles from './page.module.css';
import CertificatesGallery from './CertificatesGallery';

export default function CertificatesPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t('certsPage.eyebrow')} — Arema Foods International`;
  }, [t]);

  return (
    <main className={styles.main}>
      {/* ── HEADER ───────────────────────────────────── */}
      <section className={styles.headerSection}>
        <div className="container">
          <span className={`eyebrow ${styles.eyebrow}`}>
            {t('certsPage.eyebrow')}
          </span>
          <h1 className={`display-xl ${styles.title}`}>
            {t('certsPage.heading')}<br />
            <em className={styles.titleEm}>{t('certsPage.headingEm')}</em>
          </h1>
          <p className={`body-lg ${styles.description}`}>
            {t('certsPage.desc')}
          </p>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────── */}
      <section className={styles.gallerySection}>
        <div className="container">
          <CertificatesGallery />
        </div>
      </section>
    </main>
  );
}
