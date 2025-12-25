'use client';

import { useState, useRef, useEffect } from 'react';

interface NetworkInformation {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

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
  priority = false,
  fallbackImage,
}: OptimizedVideoProps) {
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(priority);
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading for priority videos

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1,
      }
    );

    if (videoRef.current) {
      observerRef.current.observe(videoRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority]);

  // Handle video loading states
  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setVideoError(true);
    setIsLoading(false);
    onError?.();
  };

  // Progressive video quality based on connection
  const getVideoSrc = () => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as { connection?: NetworkInformation }).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        
        // Adjust quality based on connection speed
        if (effectiveType === 'slow-2g' || effectiveType === '2g') {
          return src.replace(/\.(mp4|webm)$/, '_low.$1');
        } else if (effectiveType === '3g') {
          return src.replace(/\.(mp4|webm)$/, '_medium.$1');
        }
      }
    }
    
    // Default to original quality
    return src;
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
    <div className="relative">
      {/* Loading state */}
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center ${className}`}>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-2"></div>
            <p className="text-xs">Loading video...</p>
          </div>
        </div>
      )}

      {/* Video element - only render when in view or priority */}
      {isInView && (
        <video
          ref={videoRef}
          className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline={playsInline}
          preload={preload}
          poster={poster}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
        >
          {/* Multiple source formats for better browser support */}
          <source src={getVideoSrc().replace(/\.mp4$/, '.webm')} type="video/webm" />
          <source src={getVideoSrc()} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Placeholder when not in view */}
      {!isInView && poster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt="Video poster"
          className={`w-full h-full object-cover ${className}`}
        />
      )}
    </div>
  );
}