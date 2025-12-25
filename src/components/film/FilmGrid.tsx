import { Film } from '@/types';
import { FilmCard } from './FilmCard';

interface FilmGridProps {
  films: Film[];
  title?: string;
  subtitle?: string;
  className?: string;
  showFeaturedOnly?: boolean;
  maxItems?: number;
}

export function FilmGrid({ 
  films, 
  title = "Featured Films", 
  subtitle,
  className = '',
  showFeaturedOnly = false,
  maxItems
}: FilmGridProps) {
  // Filter films based on props
  let displayFilms = showFeaturedOnly ? films.filter(film => film.featured) : films;
  
  // Limit number of items if specified
  if (maxItems) {
    displayFilms = displayFilms.slice(0, maxItems);
  }

  if (displayFilms.length === 0) {
    return (
      <section className={`section-padding ${className}`}>
        <div className="container-custom">
          <div className="text-center">
            <h2 className="text-responsive-2xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-responsive-base text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="text-gray-500 dark:text-gray-400">
              <div className="text-4xl sm:text-5xl md:text-6xl mb-4">🎬</div>
              <p className="text-responsive-sm">No films available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`section-padding ${className}`}>
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-responsive-2xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-responsive-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Films Grid - Responsive grid with proper spacing */}
        <div className="grid-responsive-3 gap-responsive">
          {displayFilms.map((film, index) => (
            <FilmCard 
              key={film.id} 
              film={film} 
              priority={index < 3} // Prioritize loading for first 3 images
            />
          ))}
        </div>

        {/* View More Link */}
        {maxItems && films.length > maxItems && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <a 
              href="/films"
              className="btn-primary inline-flex items-center touch-target"
            >
              View All Films
              <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}