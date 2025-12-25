import { Metadata } from 'next';
import { PageWrapper } from '@/components/layout';
import { FilmGrid } from '@/components/film';
import { getBCUFilms, getOtherFilms } from '@/lib/data';
import { generatePageMetadata, generateBreadcrumbStructuredData, generateJsonLd } from '@/lib/seo';
import Script from 'next/script';

export const metadata: Metadata = generatePageMetadata({
  title: 'Films',
  description: 'Explore our collection of cinematic works, from compelling narratives to visual storytelling that pushes creative boundaries.',
  path: '/films',
});

export default function FilmsPage() {
  const bcuFilms = getBCUFilms();
  const otherFilms = getOtherFilms();

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'Films', url: '/films' },
  ]);

  return (
    <PageWrapper>
      {/* Structured Data */}
      <Script
        id="films-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbData)}
      />
      
      <div className="container-custom section-padding">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
            Our Films
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our collection of cinematic works, from compelling narratives 
            to visual storytelling that pushes creative boundaries.
          </p>
        </div>
        
        {/* Baja Cinematic Universe Section */}
        {bcuFilms.length > 0 && (
          <div className="mb-16">
            <FilmGrid 
              films={bcuFilms}
              title="Baja Cinematic Universe"
              subtitle="An interconnected series of films exploring themes of identity, reality, and human connection through the lens of surreal storytelling"
              showFeaturedOnly={false}
              className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black"
            />
          </div>
        )}
        
        {/* Other Films Section */}
        {otherFilms.length > 0 && (
          <div>
            <FilmGrid 
              films={otherFilms}
              title="Other Works"
              subtitle="Additional cinematic projects and creative explorations"
              showFeaturedOnly={false}
              className="bg-white dark:bg-black"
            />
          </div>
        )}
      </div>
    </PageWrapper>
  );
}