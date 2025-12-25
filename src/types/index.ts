export interface Film {
  id: string;
  title: string;
  year: number;
  slug: string;
  description: string;
  longDescription?: string;
  posterImage: string;
  heroVideo?: string;
  trailerUrl?: string;
  youtubeId?: string;
  spotifyEmbedId?: string;
  credits: {
    director?: string;
    producer?: string;
    cinematographer?: string;
    editor?: string;
    composer?: string;
  };
  featured: boolean;
  category: 'film' | 'commercial' | 'music-video' | 'anthology';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  services: string[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    email: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    whatsapp?: string;
    vimeo?: string;
  };
}