'use client';

import styles from './Blog.module.css';

export default function NewsletterForm() {
  return (
    <form
      className={styles.newsletterForm}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        id="newsletter-email"
        type="email"
        placeholder="Your email address"
        className={styles.newsletterInput}
        aria-label="Email address"
      />
      <button type="submit" className={styles.newsletterBtn}>
        Subscribe
      </button>
    </form>
  );
}
