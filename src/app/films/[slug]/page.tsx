import { PageWrapper } from '@/components/layout';
import { FilmDetail } from '@/components/film';
import { getFilmBySlug, getFilmSlugs } from '@/lib/data';
import { generateFilmMetadata, generateFilmStructuredData, generateBreadcrumbStructuredData, generateJsonLd } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';

interface FilmPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all films
export async function generateStaticParams() {
  const slugs = getFilmSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each film page
export async function generateMetadata({ params }: FilmPageProps): Promise<Metadata> {
  const film = getFilmBySlug(params.slug);
  
  if (!film) {
    return {
      title: 'Film Not Found',
    };
  }

  return generateFilmMetadata(film);
}

export default function FilmPage({ params }: FilmPageProps) {
  const film = getFilmBySlug(params.slug);

  if (!film) {
    notFound();
  }

  // Generate structured data for the film
  const filmStructuredData = generateFilmStructuredData(film);
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Films', url: '/films' },
    { name: film.title, url: `/films/${film.slug}` },
  ]);

  return (
    <PageWrapper>
      {/* Structured Data */}
      <Script
        id="film-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(filmStructuredData)}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbStructuredData)}
      />
      
      <FilmDetail film={film} />
    </PageWrapper>
  );
}