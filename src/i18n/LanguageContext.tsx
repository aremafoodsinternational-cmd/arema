'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, LANGUAGES, LanguageCode, TranslationSchema } from './translations';

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  isRTL: boolean;
  t: (key: string) => string;
  currentTranslations: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always default to 'en' during server-side rendering
  const [lang, setLangState] = useState<LanguageCode>('en');

  // Load persisted language preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('arema-lang') as LanguageCode;
    if (saved && translations[saved]) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: LanguageCode) => {
    if (translations[newLang]) {
      setLangState(newLang);
      localStorage.setItem('arema-lang', newLang);
    }
  };

  const isRTL = lang === 'ar';
  const currentTranslations = translations[lang] || translations['en'];

  // Safe translation resolver supporting dot-notation keys
  const t = (key: string): string => {
    try {
      const parts = key.split('.');
      let obj: any = currentTranslations;
      for (const part of parts) {
        obj = obj[part];
        if (obj === undefined) break;
      }
      if (typeof obj === 'string') return obj;
    } catch (e) {
      console.warn(`Translation key not found: ${key}`);
    }
    
    // Fallback to English if translation is missing
    try {
      const parts = key.split('.');
      let obj: any = translations['en'];
      for (const part of parts) {
        obj = obj[part];
        if (obj === undefined) break;
      }
      if (typeof obj === 'string') return obj;
    } catch (e) {}

    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isRTL, t, currentTranslations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
