'use client';

import { Film } from '@/types';
import { OptimizedVideo } from '@/components/ui';

interface FilmHeroProps {
  film: Film;
  showOverlay?: boolean;
  className?: string;
}

export function FilmHero({ film, showOverlay = true, className = '' }: FilmHeroProps) {
  return (
    <section className={`relative hero-video-container flex items-center justify-center overflow-hidden ${className}`}>
      {/* Video Background */}
      {film.heroVideo && (
        <div className="absolute inset-0 z-0">
          <OptimizedVideo
            src={film.heroVideo}
            poster={film.posterImage}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            priority={true}
            fallbackImage={film.posterImage}
          />
          
          {/* Video overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Fallback background image if video doesn't exist */}
      {!film.heroVideo && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${film.posterImage})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      {/* Content Overlay */}
      {showOverlay && (
        <div className="relative z-10 container-custom text-center text-white">
          <div className="max-w-4xl mx-auto padding-responsive">
            {/* Company Name and Tagline */}
            <h1 className="mb-4 sm:mb-6 md:mb-8 text-responsive-3xl font-bold tracking-tight">
              <span className="block mb-2">Baja Badlands</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light opacity-90">
                Productions
              </span>
            </h1>
            
            <p className="text-responsive-lg font-light opacity-80 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-12">
              Creating compelling films and visual stories with cinematic excellence and artistic vision
            </p>

            {/* Featured Film Info */}
            <div className="mt-8 sm:mt-10 md:mt-12 p-4 sm:p-5 md:p-6 bg-black/20 dark:bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 dark:border-black/20">
              <p className="text-xs sm:text-sm uppercase tracking-wider opacity-70 mb-2 text-white dark:text-gray-300">
                Latest Film
              </p>
              <h2 className="text-responsive-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-white dark:text-white">
                {film.title}
              </h2>
              <p className="text-responsive-base opacity-80 mb-4 sm:mb-5 md:mb-6 text-white dark:text-gray-200">
                {film.year} • {film.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="btn-primary touch-target">
                  Watch Now
                </button>
                <button className="btn-secondary touch-target">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1 sm:mt-2" />
        </div>
      </div>
    </section>
  );
}