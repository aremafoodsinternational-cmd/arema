'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import styles from './Blog.module.css';

export default function NewsletterForm() {
  const { t } = useLanguage();

  return (
    <form
      className={styles.newsletterForm}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        id="newsletter-email"
        type="email"
        placeholder={t('blogPage.newsletterPlaceholder')}
        className={styles.newsletterInput}
        aria-label={t('blogPage.newsletterPlaceholder')}
      />
      <button type="submit" className={styles.newsletterBtn}>
        {t('blogPage.newsletterSubmit')}
      </button>
    </form>
  );
}
