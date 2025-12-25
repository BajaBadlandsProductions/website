import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatYear(year: number): string {
  return year.toString();
}

export function getYouTubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube.com/embed/${youtubeId}`;
}