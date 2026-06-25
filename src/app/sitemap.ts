import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aremafoodsinternational.com';

  // 1. Static pages
  const staticRoutes = [
    '',
    '/our-story',
    '/why-arema',
    '/certificates',
    '/contact',
    '/products',
    '/blog',
  ];

  const staticUrls = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Fetch all products from Supabase
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const { data: products } = await supabase.from('products').select('id, created_at');
    if (products) {
      productUrls = products.map((p) => ({
        url: `${baseUrl}/products/${p.id}`,
        lastModified: p.created_at ? new Date(p.created_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error('Sitemap generation error (products):', e);
  }

  // 3. Fetch all blogs from Supabase
  let blogUrls: MetadataRoute.Sitemap = [];
  try {
    const { data: blogs } = await supabase.from('blogs').select('id, created_at');
    if (blogs) {
      blogUrls = blogs.map((b) => ({
        url: `${baseUrl}/blog/${b.id}`,
        lastModified: b.created_at ? new Date(b.created_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    }
  } catch (e) {
    console.error('Sitemap generation error (blogs):', e);
  }

  return [...staticUrls, ...productUrls, ...blogUrls];
}
