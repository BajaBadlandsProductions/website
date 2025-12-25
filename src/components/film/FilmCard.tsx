'use client';

import { Film } from '@/types';
import Link from 'next/link';
import { OptimizedImage, OptimizedVideo } from '@/components/ui';
import { useState } from 'react';

interface FilmCardProps {
  film: Film;
  className?: string;
  priority?: boolean;
}

export function FilmCard({ film, className = '', priority = false }: FilmCardProps) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <Link 
      href={`/films/${film.slug}`}
      className={`film-card group block relative overflow-hidden bg-white dark:bg-gray-900 transition-all duration-700 ease-out hover:scale-[1.02] ${className}`}
      onMouseEnter={() => film.heroVideo && setShowVideo(true)}
      onMouseLeave={() => setShowVideo(false)}
    >
      {/* Film Background - Video or Poster */}
      <div className="relative aspect-responsive-film overflow-hidden">
        {/* Video Background (shows on hover if available) */}
        {film.heroVideo && showVideo && (
          <OptimizedVideo
            src={film.heroVideo}
            poster={film.posterImage}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
        )}
        
        {/* Poster Image (default or fallback) */}
        <OptimizedImage
          src={film.posterImage}
          alt={`${film.title} poster`}
          fill
          className={`object-cover transition-all duration-700 ${showVideo && film.heroVideo ? 'opacity-0' : 'opacity-100 group-hover:scale-105'}`}
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Subtle Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />

        {/* Year Badge - Minimal Design */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-black/90 text-black dark:text-white text-xs font-light tracking-wider backdrop-blur-sm">
          {film.year}
        </div>

        {/* Featured Badge - Minimal Design */}
        {film.featured && (
          <div className="absolute top-4 left-4 w-2 h-2 bg-black dark:bg-white rounded-full" />
        )}

        {/* Soundtrack Indicator */}
        {film.spotifyEmbedId && (
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center opacity-80">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
          </div>
        )}
      </div>

      {/* Film Information - A24 Style */}
      <div className="spacing-md">
        <h3 className="text-responsive-lg font-light text-black dark:text-white mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors duration-500 tracking-wide">
          {film.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-responsive-sm mb-6 line-clamp-2 font-light leading-relaxed">
          {film.description}
        </p>

        {/* Credits - Minimal */}
        {film.credits.director && (
          <div className="text-xs text-gray-500 dark:text-gray-500 mb-6 font-light tracking-wide">
            <span className="uppercase tracking-widest">Directed by</span>
            <br />
            <span className="font-normal">{film.credits.director}</span>
          </div>
        )}

        {/* Category and Arrow - Refined */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-widest font-light">
            {film.category === 'anthology' ? 'The Anthology' : film.category.replace('-', ' ')}
          </span>
          
          {/* Minimal Arrow indicator */}
          <div className="text-gray-300 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}