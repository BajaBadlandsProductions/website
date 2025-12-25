# Content Management

This directory contains the data files and utilities for managing content on the Baja Badlands Productions website.

## Data Files

### `films.json`
Contains all film data including:
- Basic information (title, year, description)
- Media assets (poster images, hero videos, YouTube IDs)
- Production credits
- Categorization and featured status

### `team.json`
Contains team member information including:
- Personal details (name, role)
- Profile images
- Biographical information

### `site-config.json`
Contains site-wide configuration including:
- Company information
- Contact details
- Social media links
- SEO metadata

## Adding New Content

### Adding a New Film

1. Add film data to `films.json` following the existing structure
2. Ensure all required fields are present:
   - `id`: Unique identifier (auto-generated from title)
   - `title`: Film title
   - `year`: Release year
   - `slug`: URL-friendly version of title (auto-generated)
   - `description`: Short description for cards
   - `posterImage`: Path to poster image
   - `category`: 'film', 'commercial', or 'music-video'
   - `featured`: Boolean for homepage display

3. Optional fields:
   - `longDescription`: Detailed description for film pages
   - `heroVideo`: Path to hero video file
   - `youtubeId`: YouTube video ID for embedding
   - `trailerUrl`: External trailer URL
   - `credits`: Production credits object

### Adding a New Team Member

1. Add member data to `team.json` following the existing structure
2. Required fields:
   - `id`: Unique identifier (auto-generated from name)
   - `name`: Full name
   - `role`: Job title/role
   - `image`: Path to profile image

3. Optional fields:
   - `bio`: Biographical information

## Asset Organization

### Images
- Film posters: `/public/images/films/[film-slug]-poster.jpg`
- Team photos: `/public/images/team/[member-name].jpg`
- General images: `/public/images/`

### Videos
- Hero videos: `/public/videos/[filename].mp4`
- Ensure videos are optimized for web (H.264, reasonable file size)

## Data Validation

The system includes comprehensive validation:
- Type checking with TypeScript interfaces
- Runtime validation with type guards
- Asset path validation
- URL and email format validation
- YouTube ID format validation

## Utilities

### Data Loading (`src/lib/data.ts`)
- `getFilmBySlug(slug)`: Find film by URL slug
- `getFeaturedFilms()`: Get films marked as featured
- `getFilmsByCategory(category)`: Filter films by category

### Content Management (`src/lib/content-management.ts`)
- `createFilm(data)`: Create new film with validation
- `createTeamMember(data)`: Create new team member
- Asset path helpers and validation functions

### Validation (`src/lib/validation.ts`)
- Type guards for runtime validation
- Format validation for emails, URLs, slugs
- Array validation functions

## Development Workflow

1. Update JSON files with new content
2. Run build process to validate data
3. Add corresponding media assets to `/public/`
4. Test locally before deployment
5. Deploy - Vercel will automatically rebuild with new content

## SEO Considerations

- Film slugs are automatically generated to be SEO-friendly
- Metadata is extracted from film data for social sharing
- All URLs follow consistent patterns for better indexing