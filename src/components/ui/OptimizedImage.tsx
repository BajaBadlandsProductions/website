'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onError?: () => void;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onError,
  fallbackSrc,
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  // Generate blur placeholder for better loading experience
  const generateBlurDataURL = (w: number, h: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  // Fallback component for error states
  const FallbackImage = () => (
    <div className={`bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${className}`}>
      <div className="text-center text-gray-500 dark:text-gray-400">
        <div className="text-2xl sm:text-3xl md:text-4xl mb-2">🎬</div>
        <p className="text-xs sm:text-sm">Image not available</p>
      </div>
    </div>
  );

  if (imageError && !fallbackSrc) {
    return <FallbackImage />;
  }

  const imageSrc = imageError && fallbackSrc ? fallbackSrc : src;

  return (
    <div className="relative">
      {/* Loading shimmer effect */}
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        sizes={sizes || (fill ? '100vw' : undefined)}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || (width && height ? generateBlurDataURL(width, height) : undefined)}
        loading={priority ? 'eager' : loading}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
}