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
  onError,
  fallbackSrc,
  ...props
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
    onError?.();
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
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      priority={priority}
      className={className}
      sizes={sizes}
      onError={handleError}
      {...props}
    />
  );
}