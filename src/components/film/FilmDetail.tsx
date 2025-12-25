'use client';

import { Film } from '@/types';
import Link from 'next/link';
import { OptimizedImage, OptimizedVideo } from '@/components/ui';

interface FilmDetailProps {
  film: Film;
}

export function FilmDetail({ film }: FilmDetailProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      {film.heroVideo && (
        <div className="relative hero-video-container overflow-hidden">
          <OptimizedVideo
            src={film.heroVideo}
            poster={film.posterImage}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            priority={true}
            fallbackImage={film.posterImage}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl padding-responsive">
              <h1 className="text-responsive-3xl font-bold mb-4 animate-fade-in-up">
                {film.title}
              </h1>
              <p className="text-responsive-xl mb-6 animate-fade-in-up animation-delay-200">
                {film.year}
              </p>
              <p className="text-responsive-base max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
                {film.description}
              </p>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1 sm:mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container-custom section-padding">
        {/* Navigation Back */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/films"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 touch-target"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-responsive-sm">Back to Portfolio</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {/* Film Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="relative aspect-responsive-film overflow-hidden rounded-lg shadow-2xl">
                <OptimizedImage
                  src={film.posterImage}
                  alt={`${film.title} poster`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  quality={95}
                  placeholder="empty"
                />
              </div>
            </div>
          </div>

          {/* Film Information */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Title and Year (if no hero video) */}
            {!film.heroVideo && (
              <div className="border-b border-gray-200 dark:border-gray-700 pb-6 sm:pb-8">
                <h1 className="text-responsive-2xl font-bold text-black dark:text-white mb-4">
                  {film.title}
                </h1>
                <p className="text-responsive-lg text-gray-600 dark:text-gray-400">
                  {film.year}
                </p>
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-responsive-xl font-semibold text-black dark:text-white mb-4">
                Synopsis
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-responsive-base leading-relaxed">
                {film.longDescription || film.description}
              </p>
            </div>

            {/* YouTube Film */}
            {film.youtubeId && (
              <div>
                <h2 className="text-responsive-xl font-semibold text-black dark:text-white mb-4">
                  {film.title}
                </h2>
                <div className="video-container rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={`https://www.youtube.com/embed/${film.youtubeId}?rel=0&modestbranding=1`}
                    title={`${film.title}`}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Production Credits */}
            <div>
              <h2 className="text-responsive-xl font-semibold text-black dark:text-white mb-4">
                Credits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {film.credits.director && (
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Director
                    </span>
                    <span className="text-responsive-base text-gray-900 dark:text-white">
                      {film.credits.director}
                    </span>
                  </div>
                )}
                
                {film.credits.producer && (
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Producer
                    </span>
                    <span className="text-responsive-base text-gray-900 dark:text-white">
                      {film.credits.producer}
                    </span>
                  </div>
                )}
                
                {film.credits.cinematographer && (
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Cinematographer
                    </span>
                    <span className="text-responsive-base text-gray-900 dark:text-white">
                      {film.credits.cinematographer}
                    </span>
                  </div>
                )}
                
                {film.credits.editor && (
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Editor
                    </span>
                    <span className="text-responsive-base text-gray-900 dark:text-white">
                      {film.credits.editor}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Film Category and Year */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
              <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full capitalize">
                {film.category === 'anthology' ? 'The Anthology' : film.category.replace('-', ' ')}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-responsive-sm">
                Released {film.year}
              </span>
            </div>
          </div>
        </div>

        {/* Additional Navigation */}
        <div className="mt-12 sm:mt-14 md:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link 
              href="/films"
              className="btn-primary inline-flex items-center gap-2 touch-target"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View All Films
            </Link>
            
            <Link 
              href="/contact"
              className="btn-secondary inline-flex items-center gap-2 touch-target"
            >
              Get in Touch
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}