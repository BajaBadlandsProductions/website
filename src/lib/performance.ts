/**
 * Performance utilities for optimizing website performance
 */

// Intersection Observer for lazy loading
export function createIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  };

  return new IntersectionObserver(callback, defaultOptions);
}

// Preload critical resources
export function preloadResource(href: string, as: string, type?: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  
  document.head.appendChild(link);
}

// Prefetch resources for next navigation
export function prefetchResource(href: string): void {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  
  document.head.appendChild(link);
}

// Get connection information for adaptive loading
export function getConnectionInfo(): {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
} {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return {};
  }

  const connection = (navigator as unknown as { connection?: NetworkInformation }).connection;
  return {
    effectiveType: connection?.effectiveType,
    downlink: connection?.downlink,
    rtt: connection?.rtt,
    saveData: connection?.saveData,
  };
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Debounce function for performance optimization
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle function for scroll events
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Generate optimized image sizes for responsive images
export function generateImageSizes(breakpoints: number[] = [640, 768, 1024, 1280, 1536]): string {
  return breakpoints
    .map((bp, index) => {
      if (index === 0) return `(max-width: ${bp}px) 100vw`;
      if (index === breakpoints.length - 1) return `${Math.round(100 / (index + 1))}vw`;
      return `(max-width: ${bp}px) ${Math.round(100 / (index + 1))}vw`;
    })
    .join(', ');
}

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Mark the start of a performance measurement
  mark(name: string): void {
    if (typeof performance !== 'undefined') {
      performance.mark(`${name}-start`);
    }
  }

  // Mark the end and measure performance
  measure(name: string): number | null {
    if (typeof performance === 'undefined') return null;

    try {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name, 'measure')[0];
      const duration = measure?.duration || 0;
      
      this.metrics.set(name, duration);
      return duration;
    } catch (error) {
      console.warn(`Performance measurement failed for ${name}:`, error);
      return null;
    }
  }

  // Get all metrics
  getMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics);
  }

  // Clear all metrics
  clear(): void {
    this.metrics.clear();
    if (typeof performance !== 'undefined') {
      performance.clearMarks();
      performance.clearMeasures();
    }
  }
}

// Web Vitals monitoring
export function measureWebVitals(): void {
  if (typeof window === 'undefined') return;

  // Measure Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Measure First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEventTiming;
          if (fidEntry.processingStart) {
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Measure Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: PerformanceEntry & { value?: number; hadRecentInput?: boolean }) => {
          if (!entry.hadRecentInput && entry.value) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Web Vitals measurement failed:', error);
    }
  }
}

// Resource hints for better performance
export function addResourceHints(): void {
  if (typeof document === 'undefined') return;

  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.youtube.com',
  ];

  preconnectDomains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // DNS prefetch for other domains
  const dnsPrefetchDomains = [
    'https://i.ytimg.com', // YouTube thumbnails
  ];

  dnsPrefetchDomains.forEach((domain) => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

// Image optimization utilities
export function getOptimizedImageUrl(
  src: string,
  width: number,
  quality: number = 85
): string {
  // This would integrate with your image optimization service
  // For now, return the original URL
  console.log(`Optimizing image: ${src} at ${width}px with ${quality}% quality`);
  return src;
}

// Video optimization utilities
export function getOptimizedVideoUrl(
  src: string,
  videoQuality: 'low' | 'medium' | 'high' = 'medium'
): string {
  const qualityMap = {
    low: '_360p',
    medium: '_720p',
    high: '_1080p',
  };

  // Check if optimized version exists
  const optimizedSrc = src.replace(/\.(mp4|webm)$/, `${qualityMap[videoQuality]}.$1`);
  return optimizedSrc;
}

// Critical resource loading
export function loadCriticalResources(): void {
  if (typeof window === 'undefined') return;

  // Preload critical fonts
  preloadResource('/fonts/inter-var.woff2', 'font', 'font/woff2');
  preloadResource('/fonts/playfair-display-var.woff2', 'font', 'font/woff2');

  // Add resource hints
  addResourceHints();

  // Start web vitals monitoring
  measureWebVitals();
}

// Network Information API types
interface NetworkInformation {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

// Performance API types
interface PerformanceEventTiming extends PerformanceEntry {
  processingStart?: number;
}