'use client';

import { ReactNode, useEffect } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useLanguage } from '@/i18n/LanguageContext';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useSmoothScroll();
  const { lang, isRTL } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [lang, isRTL]);

  return <>{children}</>;
}
