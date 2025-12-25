'use client';

import { Film } from '@/types';
import Link from 'next/link';
import { OptimizedImage } from '@/components/ui';

interface FilmCardProps {
  film: Film;
  className?: string;
  priority?: boolean;
}

export function FilmCard({ film, className = '', priority = false }: FilmCardProps) {
  return (
    <Link 
      href={`/films/${film.slug}`}
      className={`film-card group block relative overflow-hidden bg-gray-100 dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${className}`}
    >
      {/* Film Poster */}
      <div className="relative aspect-responsive-film overflow-hidden">
        <OptimizedImage
          src={film.posterImage}
          alt={`${film.title} poster`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={90}
          placeholder="blur"
          loading={priority ? 'eager' : 'lazy'}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
            <div className="w-0 h-0 border-l-[8px] sm:border-l-[10px] md:border-l-[12px] border-l-black border-y-[6px] sm:border-y-[7px] md:border-y-[8px] border-y-transparent ml-1" />
          </div>
        </div>

        {/* Year Badge */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded backdrop-blur-sm">
          {film.year}
        </div>

        {/* Featured Badge */}
        {film.featured && (
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 px-2 py-1 bg-yellow-500/90 text-black text-xs font-medium rounded backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>

      {/* Film Information */}
      <div className="spacing-sm">
        <h3 className="text-responsive-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {film.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-responsive-sm mb-3 sm:mb-4 line-clamp-3">
          {film.description}
        </p>

        {/* Credits */}
        {film.credits.director && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className="font-medium">Directed by:</span> {film.credits.director}
          </div>
        )}

        {/* Category and Arrow */}
        <div className="flex items-center justify-between">
          <span className="inline-block px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full capitalize">
            {film.category === 'bcu' ? 'BCU' : film.category.replace('-', ' ')}
          </span>
          
          {/* Arrow indicator */}
          <div className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}