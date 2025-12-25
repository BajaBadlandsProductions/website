'use client';

import { useState } from 'react';

interface YouTubeVideoProps {
  videoId: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  poster?: string;
  onError?: () => void;
  onLoad?: () => void;
  priority?: boolean;
  title?: string;
}

export function YouTubeVideo({
  videoId,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false,
  className = '',
  poster,
  onError,
  onLoad,
  title = 'Video',
}: YouTubeVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showVideo, setShowVideo] = useState(autoPlay);

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  const handleIframeLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleIframeError = () => {
    setHasError(true);
    onError?.();
  };

  // Build YouTube URL with parameters
  const getYouTubeUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoPlay && showVideo ? '1' : '0',
      mute: muted ? '1' : '0',
      loop: loop ? '1' : '0',
      controls: controls ? '1' : '0',
      modestbranding: '1',
      rel: '0',
      showinfo: '0',
      iv_load_policy: '3',
      playsinline: '1',
    });

    if (loop) {
      params.set('playlist', videoId);
    }

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  // Fallback content
  const FallbackContent = () => (
    <div className={`bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center ${className}`}>
      {poster ? (
        <div className="relative w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-3xl sm:text-4xl md:text-5xl mb-4">▶️</div>
              <p className="text-sm sm:text-base">Video not available</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-3xl sm:text-4xl md:text-5xl mb-4">🎬</div>
          <p className="text-sm sm:text-base">Video not available</p>
        </div>
      )}
    </div>
  );

  if (hasError) {
    return <FallbackContent />;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Poster/Thumbnail with Play Button */}
      {!showVideo && poster && (
        <div className="relative w-full h-full cursor-pointer" onClick={handlePlayClick}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-full h-full object-cover"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors shadow-lg">
              <div className="w-0 h-0 border-l-[16px] sm:border-l-[20px] md:border-l-[24px] border-l-black border-y-[8px] sm:border-y-[10px] md:border-y-[12px] border-y-transparent ml-1"></div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Iframe */}
      {showVideo && (
        <iframe
          src={getYouTubeUrl()}
          title={title}
          className={`w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
        />
      )}

      {/* Loading state for iframe */}
      {showVideo && !isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-2 mx-auto"></div>
            <p className="text-xs">Loading video...</p>
          </div>
        </div>
      )}
    </div>
  );
}