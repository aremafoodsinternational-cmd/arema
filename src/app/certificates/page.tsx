import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Certificates — Arema Foods International',
  description: 'View our official certifications, GI tags, and quality assurance documents.',
};

export default function CertificatesPage() {
  // We have 16 pages from page_0 to page_15
  const certificates = Array.from({ length: 16 }).map((_, i) => `/images/certificates/page_${i}.png`);

  return (
    <main style={{ paddingTop: 'var(--nav-height)' }}>
      {/* ── HEADER ───────────────────────────────────── */}
      <section style={{ padding: 'var(--space-12) 0 var(--space-8)', background: 'var(--pale-sand-20)' }}>
        <div className="container">
          <span className="eyebrow" style={{ display: 'block', marginBottom: 'var(--space-5)' }}>Our Certifications</span>
          <h1 className="display-xl" style={{ color: 'var(--dark-text)', maxWidth: '16ch' }}>
            Proof of<br />
            <em style={{ fontStyle: 'italic', color: 'var(--arema-brown)' }}>Authenticity</em>
          </h1>
          <p className="body-lg" style={{ color: 'var(--charcoal)', maxWidth: '60ch', marginTop: 'var(--space-5)' }}>
            We do not just claim authenticity; we prove it. Below are our official certifications, 
            GI tags, and quality assurance documents that guarantee the purity of Arema Foods.
          </p>
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────── */}
      <section className={styles.gallerySection}>
        <div className="container">
          <div className={styles.grid}>
            {certificates.map((src, index) => (
              <div key={src} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={src}
                    alt={`Arema Certification Document ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className={styles.cardLabel}>Document {index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
