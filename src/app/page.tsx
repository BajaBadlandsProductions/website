import { PageWrapper } from '@/components/layout';
import { FilmHero, FilmGrid } from '@/components/film';
import { getLatestFeaturedFilm, getAllFilms } from '@/lib/data';
import { generateOrganizationStructuredData, generateWebsiteStructuredData, generateJsonLd } from '@/lib/seo';
import Script from 'next/script';

export default function Home() {
  const allFilms = getAllFilms();
  
  // Get the latest featured film for the hero section (most recent by year)
  const heroFilm = getLatestFeaturedFilm();

  // Generate structured data
  const organizationData = generateOrganizationStructuredData();
  const websiteData = generateWebsiteStructuredData();

  return (
    <PageWrapper>
      {/* Structured Data */}
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(organizationData)}
      />
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(websiteData)}
      />
      
      {/* Hero Section with Video Background */}
      {heroFilm && (
        <FilmHero 
          film={heroFilm}
          showOverlay={true}
        />
      )}
      
      {/* Featured Films Grid */}
      <FilmGrid 
        films={allFilms}
        title="Featured Films"
        subtitle="Explore our latest cinematic works and visual storytelling projects"
        showFeaturedOnly={true}
        className="bg-gradient-to-b from-black/20 via-gray-50 to-white dark:from-black/40 dark:via-gray-900 dark:to-black"
      />
    </PageWrapper>
  );
}
