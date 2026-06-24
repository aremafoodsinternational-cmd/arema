import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/layout/Preloader';
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import { LanguageProvider } from '@/i18n/LanguageContext';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export const metadata: Metadata = {
  title: {
    template: '%s | Arema Foods International',
    default: 'Arema Foods International — Premium Kerala Rice Exporters',
  },
  description: 'Arema Foods International exports the finest rice from the fertile fields of Palakkad, Kerala to global markets. Heritage grains, international standards.',
  keywords: ['Kerala rice export', 'Palakkad Matta rice', 'premium rice', 'India food export', 'Arema Foods'],
  openGraph: {
    siteName: 'Arema Foods International',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <LanguageProvider>
          <Preloader />
          <div className="grain-overlay" aria-hidden="true" />
          <Navbar />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
          <WhatsAppButton />
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
