'use client';

import { useState } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
  priority?: boolean;
  fallbackImage?: string;
}

export function OptimizedVideo({
  src,
  poster,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  playsInline = true,
  preload = 'metadata',
  className = '',
  onError,
  onLoad,
  fallbackImage,
}: OptimizedVideoProps) {
  const [videoError, setVideoError] = useState(false);

  const handleError = () => {
    setVideoError(true);
    onError?.();
  };

  const handleCanPlay = () => {
    onLoad?.();
  };

  // Fallback component for error states
  const FallbackContent = () => (
    <div className={`bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${className}`}>
      {fallbackImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={fallbackImage}
          alt="Video fallback"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-3xl sm:text-4xl md:text-5xl mb-4">🎬</div>
          <p className="text-sm sm:text-base">Video not available</p>
        </div>
      )}
    </div>
  );

  if (videoError) {
    return <FallbackContent />;
  }

  return (
    <video
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline={playsInline}
      preload={preload}
      poster={poster}
      onCanPlay={handleCanPlay}
      onError={handleError}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}