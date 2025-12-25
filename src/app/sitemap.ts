import { MetadataRoute } from 'next';
import { getAllFilms } from '@/lib/data';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const films = getAllFilms();
  
  // Static pages
  const staticPages = [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${siteConfig.url}/films`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Dynamic film pages
  const filmPages = films.map((film) => ({
    url: `${siteConfig.url}/films/${film.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...filmPages];
}