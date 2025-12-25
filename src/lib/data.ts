import { Film, TeamMember, SiteConfig } from '@/types';
import { validateFilms, validateTeamMembers, validateSiteConfig } from './validation';

// Import JSON data
import filmsData from '@/data/films.json';
import teamData from '@/data/team.json';
import siteConfigData from '@/data/site-config.json';

// Validated data exports
export const films: Film[] = validateFilms(filmsData);
export const teamMembers: TeamMember[] = validateTeamMembers(teamData);
export const siteConfig: SiteConfig = validateSiteConfig(siteConfigData);

// Utility functions for data access
export function getFilmBySlug(slug: string): Film | undefined {
  return films.find(film => film.slug === slug);
}

export function getFilmById(id: string): Film | undefined {
  return films.find(film => film.id === id);
}

export function getFeaturedFilms(): Film[] {
  return films.filter(film => film.featured);
}

export function getLatestFeaturedFilm(): Film | undefined {
  const featuredFilms = getFeaturedFilms();
  if (featuredFilms.length === 0) {
    // If no featured films, return the most recent film overall
    return films.sort((a, b) => b.year - a.year)[0];
  }
  // Return the most recent featured film
  return featuredFilms.sort((a, b) => b.year - a.year)[0];
}

export function getFilmsByCategory(category: Film['category']): Film[] {
  return films.filter(film => film.category === category);
}

export function getBCUFilms(): Film[] {
  return films.filter(film => film.category === 'bcu').sort((a, b) => a.year - b.year);
}

export function getOtherFilms(): Film[] {
  return films.filter(film => film.category !== 'bcu').sort((a, b) => b.year - a.year);
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(member => member.id === id);
}

export function getAllFilms(): Film[] {
  return [...films];
}

export function getAllTeamMembers(): TeamMember[] {
  return [...teamMembers];
}

// Generate film slugs for static generation
export function getFilmSlugs(): string[] {
  return films.map(film => film.slug);
}

// Validate that all referenced assets exist (for build-time validation)
export function validateAssetReferences(): {
  missingImages: string[];
  missingVideos: string[];
} {
  const missingImages: string[] = [];
  const missingVideos: string[] = [];

  // Check film poster images
  films.forEach(film => {
    // Note: In a real implementation, you'd check if files exist
    // For now, we'll just collect the paths for validation
    if (!film.posterImage.startsWith('/images/')) {
      missingImages.push(film.posterImage);
    }
    
    if (film.heroVideo && !film.heroVideo.startsWith('/videos/')) {
      missingVideos.push(film.heroVideo);
    }
  });

  // Check team member images
  teamMembers.forEach(member => {
    if (!member.image.startsWith('/images/')) {
      missingImages.push(member.image);
    }
  });

  return { missingImages, missingVideos };
}

// Content management helpers
export function createFilmSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
}

export function generateFilmId(title: string): string {
  return createFilmSlug(title);
}

// SEO helpers (deprecated - use generateFilmMetadata from @/lib/seo instead)
export function getFilmMetadata(film: Film) {
  return {
    title: `${film.title} (${film.year}) - ${siteConfig.name}`,
    description: film.longDescription || film.description,
    openGraph: {
      title: film.title,
      description: film.description,
      images: [
        {
          url: film.posterImage,
          width: 1200,
          height: 630,
          alt: film.title,
        },
      ],
      type: 'video.movie',
    },
  };
}