'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/products', label: 'Products' },
  { href: '/why-arema', label: 'Why Arema' },
  { href: '/certificates', label: 'Certificates' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const showLinks = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; }, [menuOpen]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${isHome ? styles.homeNav : ''}`}>
        <div className={styles.inner}>
          {/* Logo — Always visible on all pages */}
          <Link href="/" className={styles.wordmark}>
            <div className={styles.logoIcon}>
              <Image
                src="/images/logo.png"
                alt="Arema Foods Logo"
                width={54}
                height={54}
                priority
                className={styles.logoImg}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links — Slides in from right-to-left on scroll */}
          <div className={`${styles.desktopLinks} ${showLinks ? styles.desktopLinksVisible : ''}`}>
            {navLinks.map((link) => {
              const isContact = link.href === '/contact';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${isContact ? styles.navContactBtn : styles.navLink} ${pathname === link.href ? styles.activeNavLink : ''}`}
                >
                  {link.label}
                  {isContact && ' ↗'}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburg menu button — Visible only on mobile screens */}
          <div className={styles.mobileMenuContainer}>
            <button
              className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={styles.menuLabel}>{menuOpen ? 'CLOSE' : 'MENU'}</span>
              <div className={styles.hamburger}>
                <span />
                <span />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      <div className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`} aria-hidden={!menuOpen}>
        <div className={styles.overlayInner}>
          <ul className={styles.overlayLinks}>
            {navLinks.map((link, i) => (
              <li key={link.href} style={{ transitionDelay: `${60 + i * 55}ms` }}>
                <Link
                  href={link.href}
                  className={`${styles.overlayLink} ${pathname === link.href ? styles.active : ''}`}
                >
                  <span className={styles.overlayNum}>0{i + 1}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.overlayFooter}>
            <Link href="/contact" className={styles.overlayContact}>GET IN TOUCH →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
