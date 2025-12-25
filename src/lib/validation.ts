import { Film, TeamMember, ContactFormData, SiteConfig } from '@/types';

// Type guards for runtime validation
export function isFilm(obj: unknown): obj is Film {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'title' in obj &&
    'year' in obj &&
    'slug' in obj &&
    'description' in obj &&
    'posterImage' in obj &&
    'featured' in obj &&
    'category' in obj &&
    'credits' in obj &&
    typeof (obj as Record<string, unknown>).id === 'string' &&
    typeof (obj as Record<string, unknown>).title === 'string' &&
    typeof (obj as Record<string, unknown>).year === 'number' &&
    typeof (obj as Record<string, unknown>).slug === 'string' &&
    typeof (obj as Record<string, unknown>).description === 'string' &&
    typeof (obj as Record<string, unknown>).posterImage === 'string' &&
    typeof (obj as Record<string, unknown>).featured === 'boolean' &&
    ['film', 'commercial', 'music-video', 'anthology'].includes((obj as Record<string, unknown>).category as string) &&
    ((obj as Record<string, unknown>).longDescription === undefined || typeof (obj as Record<string, unknown>).longDescription === 'string') &&
    ((obj as Record<string, unknown>).heroVideo === undefined || typeof (obj as Record<string, unknown>).heroVideo === 'string') &&
    ((obj as Record<string, unknown>).trailerUrl === undefined || typeof (obj as Record<string, unknown>).trailerUrl === 'string') &&
    ((obj as Record<string, unknown>).youtubeId === undefined || typeof (obj as Record<string, unknown>).youtubeId === 'string') &&
    typeof (obj as Record<string, unknown>).credits === 'object' &&
    (obj as Record<string, unknown>).credits !== null
  );
}

export function isTeamMember(obj: unknown): obj is TeamMember {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'role' in obj &&
    'image' in obj &&
    typeof (obj as Record<string, unknown>).id === 'string' &&
    typeof (obj as Record<string, unknown>).name === 'string' &&
    typeof (obj as Record<string, unknown>).role === 'string' &&
    typeof (obj as Record<string, unknown>).image === 'string' &&
    ((obj as Record<string, unknown>).bio === undefined || typeof (obj as Record<string, unknown>).bio === 'string')
  );
}

export function isContactFormData(obj: unknown): obj is ContactFormData {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'email' in obj &&
    'message' in obj &&
    'services' in obj &&
    typeof (obj as Record<string, unknown>).name === 'string' &&
    typeof (obj as Record<string, unknown>).email === 'string' &&
    typeof (obj as Record<string, unknown>).message === 'string' &&
    Array.isArray((obj as Record<string, unknown>).services) &&
    ((obj as Record<string, unknown>).services as unknown[]).every((service: unknown) => typeof service === 'string')
  );
}

export function isSiteConfig(obj: unknown): obj is SiteConfig {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'name' in obj &&
    'description' in obj &&
    'url' in obj &&
    'ogImage' in obj &&
    'links' in obj &&
    typeof (obj as Record<string, unknown>).name === 'string' &&
    typeof (obj as Record<string, unknown>).description === 'string' &&
    typeof (obj as Record<string, unknown>).url === 'string' &&
    typeof (obj as Record<string, unknown>).ogImage === 'string' &&
    typeof (obj as Record<string, unknown>).links === 'object' &&
    (obj as Record<string, unknown>).links !== null &&
    'email' in ((obj as Record<string, unknown>).links as Record<string, unknown>) &&
    typeof ((obj as Record<string, unknown>).links as Record<string, unknown>).email === 'string'
  );
}

// Validation functions that throw errors
export function validateFilm(obj: unknown): Film {
  if (!isFilm(obj)) {
    throw new Error(`Invalid film object: ${JSON.stringify(obj)}`);
  }
  return obj;
}

export function validateTeamMember(obj: unknown): TeamMember {
  if (!isTeamMember(obj)) {
    throw new Error(`Invalid team member object: ${JSON.stringify(obj)}`);
  }
  return obj;
}

export function validateContactFormData(obj: unknown): ContactFormData {
  if (!isContactFormData(obj)) {
    throw new Error(`Invalid contact form data: ${JSON.stringify(obj)}`);
  }
  return obj;
}

export function validateSiteConfig(obj: unknown): SiteConfig {
  if (!isSiteConfig(obj)) {
    throw new Error(`Invalid site config: ${JSON.stringify(obj)}`);
  }
  return obj;
}

// Array validation functions
export function validateFilms(arr: unknown): Film[] {
  if (!Array.isArray(arr)) {
    throw new Error('Films data must be an array');
  }
  return arr.map(validateFilm);
}

export function validateTeamMembers(arr: unknown): TeamMember[] {
  if (!Array.isArray(arr)) {
    throw new Error('Team members data must be an array');
  }
  return arr.map(validateTeamMember);
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// URL validation
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Slug validation (for SEO-friendly URLs)
export function isValidSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugRegex.test(slug);
}

// YouTube ID validation
export function isValidYouTubeId(id: string): boolean {
  const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;
  return youtubeIdRegex.test(id);
}