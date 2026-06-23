import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = {
  pages: [
    { href: '/', label: 'Home' },
    { href: '/our-story', label: 'Our Story' },
    { href: '/products', label: 'Products' },
    { href: '/why-arema', label: 'Why Arema' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  products: [
    { href: '/products#matta-rice', label: 'Matta Rice' },
    { href: '/products#white-rice', label: 'White Rice' },
    { href: '/products#aromatic-rice', label: 'Aromatic Rice' },
    { href: '/products#value-added', label: 'Value Added Products' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brand}>
              <div className={styles.wordmark}>
                <span className={styles.wordmarkText}>AREMA</span>
                <span className={styles.wordmarkSub}>Foods International</span>
              </div>
              <p className={styles.tagline}>
                From the fertile fields of Palakkad to tables across the world —
                carrying nature&apos;s finest with honesty and heritage.
              </p>
              <div className={styles.socials}>
                <a href="#" aria-label="LinkedIn" className={styles.social}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className={styles.social}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter / X" className={styles.social}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Pages */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Navigate</h4>
              <ul className={styles.colList} role="list">
                {footerLinks.pages.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.colLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Products</h4>
              <ul className={styles.colList} role="list">
                {footerLinks.products.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.colLink}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>Contact</h4>
              <address className={styles.address}>
                <p>Arema Foods International</p>
                <p>27/665, 1st floor, Das complex,</p>
                <p>Near Builtech Pavilion, NH-47,</p>
                <p>Bypass Kadamkode, Palakkad,</p>
                <p>Kerala, South India - 678013</p>
                <a href="mailto:aremafoodsinternational@gmail.com" className={styles.colLink}>
                  aremafoodsinternational@gmail.com
                </a>
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <a href="tel:+919778339292" className={styles.colLink}>
                    +91 9778339292
                  </a>
                  <span style={{ color: 'var(--charcoal-60)' }}>|</span>
                  <a href="tel:04913589795" className={styles.colLink}>
                    0491 3589 795
                  </a>
                </div>
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.registrations} style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '16px', 
            paddingBottom: '24px',
            borderBottom: '1px solid var(--pale-sand-40)',
            marginBottom: '24px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.65rem',
            color: 'var(--charcoal-60)'
          }}>
            <span><strong>FSSAI:</strong> 21325213000680</span>
            <span><strong>APEDA RCMC:</strong> RCMC/APEDA/22572/2025-2026</span>
            <span><strong>IEC:</strong> BBDPB1139G</span>
            <span><strong>GSTIN:</strong> 32BBDPB1139G1ZF</span>
          </div>
          <div className={styles.bottomInner}>
            <p className={styles.copy}>
              &copy; {year} Arema Foods International. All rights reserved.
            </p>
            <div className={styles.legal}>
              <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link>
              <span className={styles.dot}>·</span>
              <Link href="/terms" className={styles.legalLink}>Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
