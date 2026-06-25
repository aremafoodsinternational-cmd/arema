'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from './Preloader.module.css';

export default function Preloader() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith('/cms')) return;

    const alreadySeen = sessionStorage.getItem('arema-preloader-done');
    if (alreadySeen) {
      setActive(false);
      return;
    }

    setActive(true);
    document.body.style.overflow = 'hidden';

    // After 5 seconds, start the hiding animation (logo fades out)
    const hideTimer = setTimeout(() => {
      setHiding(true);
    }, 5000);

    // After 5.8 seconds, physically remove it from the screen and unlock scrolling
    const removeTimer = setTimeout(() => {
      document.body.style.overflow = '';
      sessionStorage.setItem('arema-preloader-done', '1');
      setActive(false);
    }, 5800);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, [pathname]);

  if (!active) return null;

  return (
    <div className={`${styles.preloaderContainer} ${hiding ? styles.hidden : ''}`}>
      <div className={styles.centerContent}>
        <div className={`${styles.logoWrap} ${hiding ? styles.hiding : ''}`}>
          <Image
            src="/images/logo.png"
            alt="Arema Foods"
            width={100}
            height={100}
            priority
            className={styles.logoImg}
          />
        </div>
        <div className={styles.loaderBarContainer}>
          <div className={styles.loaderBarProgress} />
        </div>
      </div>
    </div>
  );
}
