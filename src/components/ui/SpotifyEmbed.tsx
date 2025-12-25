'use client';

interface SpotifyEmbedProps {
  embedId: string;
  title?: string;
  className?: string;
}

export function SpotifyEmbed({ embedId, title = "Soundtrack", className = '' }: SpotifyEmbedProps) {
  return (
    <div className={`w-full ${className}`}>
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: '12px' }}
        src={`https://open.spotify.com/embed/album/${embedId}?utm_source=generator`}
        width="100%"
        height="352"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title={`${title} - Spotify Embed`}
      />
    </div>
  );
}