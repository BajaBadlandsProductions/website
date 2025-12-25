import { Metadata } from 'next';
import { Film } from '@/types';
import { siteConfig } from './config';

// Generate structured data for the organization
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    image: siteConfig.ogImage,
    sameAs: [
      siteConfig.links.instagram,
      siteConfig.links.youtube,
      siteConfig.links.vimeo,
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.links.email,
      telephone: siteConfig.links.phone,
      contactType: 'customer service',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Los Angeles',
      addressRegion: 'CA',
      addressCountry: 'US',
    },
  };
}

// Generate structured data for a film
export function generateFilmStructuredData(film: Film) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: film.title,
    description: film.longDescription || film.description,
    dateCreated: film.year.toString(),
    image: `${siteConfig.url}${film.posterImage}`,
    url: `${siteConfig.url}/films/${film.slug}`,
    productionCompany: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    director: film.credits.director ? {
      '@type': 'Person',
      name: film.credits.director,
    } : undefined,
    producer: film.credits.producer ? {
      '@type': 'Person',
      name: film.credits.producer,
    } : undefined,
    genre: film.category === 'bcu' ? 'Drama' : 'Short Film',
  };
}

// Generate structured data for the website
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/films?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

// Enhanced metadata generation for films
export function generateFilmMetadata(film: Film): Metadata {
  const title = `${film.title} (${film.year})`;
  const description = film.longDescription || film.description;
  const imageUrl = `${siteConfig.url}${film.posterImage}`;
  
  return {
    title,
    description,
    keywords: [
      film.title,
      film.year.toString(),
      'film',
      'movie',
      'cinema',
      'production',
      siteConfig.name,
      film.credits.director,
      film.credits.producer,
      film.category === 'bcu' ? 'Baja Cinematic Universe' : 'short film',
    ].filter((keyword): keyword is string => Boolean(keyword)),
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/films/${film.slug}`,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${film.title} movie poster`,
          type: 'image/jpeg',
        },
      ],
      locale: 'en_US',
      type: 'video.movie',
      videos: film.youtubeId ? [
        {
          url: `https://www.youtube.com/watch?v=${film.youtubeId}`,
          type: 'text/html',
          width: 1280,
          height: 720,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@bajabadlands',
      site: '@bajabadlands',
    },
    alternates: {
      canonical: `${siteConfig.url}/films/${film.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Enhanced metadata generation for pages
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const url = `${siteConfig.url}${path}`;
  const imageUrl = image ? `${siteConfig.url}${image}` : siteConfig.ogImage;

  return {
    title: fullTitle,
    description,
    keywords: [
      'film production',
      'video production',
      'cinematography',
      'Los Angeles',
      'production company',
      'creative services',
      'visual storytelling',
      siteConfig.name,
    ],
    authors: [
      {
        name: siteConfig.name,
        url: siteConfig.url,
      },
    ],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@bajabadlands',
      site: '@bajabadlands',
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// Generate JSON-LD script tag
export function generateJsonLd(data: object) {
  return {
    __html: JSON.stringify(data, null, 2),
  };
}