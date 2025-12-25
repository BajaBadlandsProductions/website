import { Film, TeamMember } from '@/types';
import { createFilmSlug, generateFilmId } from './data';
import { isValidSlug, isValidYouTubeId, isValidUrl } from './validation';

// Content management utilities for easy updates

export interface NewFilmData {
  title: string;
  year: number;
  description: string;
  longDescription?: string;
  posterImage: string;
  heroVideo?: string;
  trailerUrl?: string;
  youtubeId?: string;
  credits: {
    director?: string;
    producer?: string;
    cinematographer?: string;
    editor?: string;
  };
  featured?: boolean;
  category: 'film' | 'commercial' | 'music-video';
}

export interface NewTeamMemberData {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

// Create a new film object with auto-generated ID and slug
export function createFilm(data: NewFilmData): Film {
  const slug = createFilmSlug(data.title);
  const id = generateFilmId(data.title);

  // Validate slug
  if (!isValidSlug(slug)) {
    throw new Error(`Generated slug "${slug}" is not valid. Please use a different title.`);
  }

  // Validate YouTube ID if provided
  if (data.youtubeId && !isValidYouTubeId(data.youtubeId)) {
    throw new Error(`YouTube ID "${data.youtubeId}" is not valid.`);
  }

  // Validate URLs if provided
  if (data.trailerUrl && !isValidUrl(data.trailerUrl)) {
    throw new Error(`Trailer URL "${data.trailerUrl}" is not valid.`);
  }

  return {
    id,
    slug,
    title: data.title,
    year: data.year,
    description: data.description,
    longDescription: data.longDescription,
    posterImage: data.posterImage,
    heroVideo: data.heroVideo,
    trailerUrl: data.trailerUrl,
    youtubeId: data.youtubeId,
    credits: data.credits,
    featured: data.featured ?? false,
    category: data.category,
  };
}

// Create a new team member object with auto-generated ID
export function createTeamMember(data: NewTeamMemberData): TeamMember {
  const id = data.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();

  return {
    id,
    name: data.name,
    role: data.role,
    image: data.image,
    bio: data.bio,
  };
}

// Asset path helpers
export function getFilmPosterPath(filmSlug: string): string {
  return `/images/films/${filmSlug}-poster.jpg`;
}

export function getFilmHeroVideoPath(filmSlug: string): string {
  return `/videos/${filmSlug}.mp4`;
}

export function getTeamMemberImagePath(memberName: string): string {
  const slug = memberName.toLowerCase().replace(/\s+/g, '-');
  return `/images/team/${slug}.jpg`;
}

// Content validation helpers
export function validateFilmAssets(film: Film): string[] {
  const issues: string[] = [];

  // Check required poster image
  if (!film.posterImage) {
    issues.push('Poster image is required');
  } else if (!film.posterImage.startsWith('/images/')) {
    issues.push('Poster image should be in /images/ directory');
  }

  // Check hero video if provided
  if (film.heroVideo && !film.heroVideo.startsWith('/videos/')) {
    issues.push('Hero video should be in /videos/ directory');
  }

  // Check YouTube ID format
  if (film.youtubeId && !isValidYouTubeId(film.youtubeId)) {
    issues.push('YouTube ID format is invalid');
  }

  // Check trailer URL format
  if (film.trailerUrl && !isValidUrl(film.trailerUrl)) {
    issues.push('Trailer URL format is invalid');
  }

  return issues;
}

export function validateTeamMemberAssets(member: TeamMember): string[] {
  const issues: string[] = [];

  // Check required image
  if (!member.image) {
    issues.push('Team member image is required');
  } else if (!member.image.startsWith('/images/')) {
    issues.push('Team member image should be in /images/ directory');
  }

  return issues;
}

// Export templates for easy content creation
export const FILM_TEMPLATE: NewFilmData = {
  title: '',
  year: new Date().getFullYear(),
  description: '',
  longDescription: '',
  posterImage: '',
  heroVideo: '',
  youtubeId: '',
  credits: {
    director: 'Joaquin Bronco',
    producer: 'Baja Badlands Productions',
    cinematographer: 'Orlando Ortega',
  },
  featured: false,
  category: 'film',
};

export const TEAM_MEMBER_TEMPLATE: NewTeamMemberData = {
  name: '',
  role: '',
  image: '',
  bio: '',
};