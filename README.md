# Baja Badlands Productions Website

A modern, minimalist production company website built with Next.js 14, featuring sophisticated dark mode support and cinematic aesthetics inspired by A24 Films.

## ✨ Design Features

- **🌙 Automatic Dark Mode** - Seamlessly adapts to system preferences with smooth transitions
- **🎨 Modern Typography** - Variable fonts (Inter, Playfair Display, JetBrains Mono) with perfect spacing
- **✨ Sophisticated Animations** - Smooth cubic-bezier transitions and micro-interactions
- **🎬 Cinematic Aesthetic** - A24-inspired minimal design with high-contrast elements
- **📱 Responsive Design** - Mobile-first approach with fluid layouts
- **⚡ Performance Optimized** - Built for speed with Next.js 14 optimizations

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom design system
- **Fonts**: Inter Variable, Playfair Display Variable, JetBrains Mono
- **Deployment**: Vercel-ready
- **Dark Mode**: CSS media queries with system preference detection

## Design System

### Color Palette
- **Primary**: Sophisticated grayscale (50-950)
- **Accent**: Modern purple gradient (#ec5eff)
- **Gold**: Warm accent color (#f59e0b)
- **Semantic**: Context-aware light/dark variants

### Typography Scale
- **Display**: Playfair Display Variable (headings)
- **Body**: Inter Variable (content)
- **Mono**: JetBrains Mono Variable (code)
- **Sizes**: Fluid scale from xs (0.75rem) to 9xl (8rem)

### Animation System
- **Easing**: Custom cubic-bezier curves for smooth motion
- **Keyframes**: Fade, slide, scale, shimmer, glow, and float effects
- **Timing**: Carefully crafted durations (300-600ms)
- **Delays**: Staggered animations for visual hierarchy

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── films/[slug]/      # Dynamic film detail pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout with SEO & dark mode
│   └── page.tsx           # Homepage with modern hero
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── film/             # Film-specific components
├── data/                 # Static data files
├── lib/                  # Utility functions and config
└── types/                # TypeScript type definitions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to see the modern design in action.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Modern Features

### 🌙 Dark Mode
- Automatic system preference detection
- Smooth color transitions
- Optimized contrast ratios
- Theme-aware components

### ✨ Animations
- **Fade In Up**: Staggered content reveals
- **Scale In**: Smooth element entrances
- **Shimmer**: Loading state effects
- **Glow**: Accent highlights
- **Float**: Subtle background elements

### 🎨 Glass Morphism
- Backdrop blur effects
- Translucent surfaces
- Modern card designs
- Layered visual hierarchy

### 📱 Responsive Design
- Mobile-first approach
- Fluid typography scaling
- Adaptive spacing system
- Touch-friendly interactions

## Component Library

### Buttons
- `btn-primary` - Main action button with hover effects
- `btn-secondary` - Outline button with fill animation
- `btn-accent` - Gradient button with glow effect

### Surfaces
- `card` - Elevated surface with hover animations
- `glass` - Glass morphism effect
- `surface` - Theme-aware background
- `surface-elevated` - Raised surface variant

### Effects
- `gradient-text` - Animated gradient text
- `shimmer` - Loading shimmer animation
- `film-card` - Specialized film poster card

## Performance

- ✅ Next.js 14 App Router optimizations
- ✅ Automatic code splitting
- ✅ Image optimization ready
- ✅ Font optimization with variable fonts
- ✅ CSS-in-JS with zero runtime cost
- ✅ Tree-shaking enabled

## SEO & Accessibility

- ✅ Comprehensive metadata setup
- ✅ Open Graph and Twitter cards
- ✅ Semantic HTML structure
- ✅ Color contrast compliance
- ✅ Keyboard navigation support
- ✅ Screen reader optimization

## Next Steps

This enhanced foundation is ready for implementing:
- 🎬 Immersive film portfolio with video backgrounds
- 🎭 Interactive hero sections with parallax effects
- 📱 Advanced mobile navigation
- 🎨 Custom video players
- 📧 Modern contact forms
- 🚀 Performance monitoring

The design system provides a solid foundation for building a world-class production company website that rivals the best in the industry.
