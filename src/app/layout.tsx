import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'film production',
    'video production',
    'cinematography',
    'Baja Badlands',
    'production company',
    'Los Angeles',
    'creative services',
    'visual storytelling',
    'commercial production',
    'music videos',
    'short films',
    'post-production',
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@bajabadlands',
    site: '@bajabadlands',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/site.webmanifest',
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="color-scheme" content="dark light" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
        <meta name="application-name" content={siteConfig.name} />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/logo.png" as="image" type="image/png" />
      </head>
      <body className="antialiased font-sans">
        {children}
        
        {/* Performance monitoring script */}
        <Script
          id="performance-monitor"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
                try {
                  // Monitor LCP
                  const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    if (lastEntry && lastEntry.startTime) {
                      console.log('LCP:', Math.round(lastEntry.startTime));
                    }
                  });
                  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

                  // Monitor FID
                  const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                      const fid = entry.processingStart - entry.startTime;
                      console.log('FID:', Math.round(fid));
                    });
                  });
                  fidObserver.observe({ entryTypes: ['first-input'] });

                  // Monitor CLS
                  let clsValue = 0;
                  const clsObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                      if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                      }
                    });
                    console.log('CLS:', Math.round(clsValue * 1000) / 1000);
                  });
                  clsObserver.observe({ entryTypes: ['layout-shift'] });
                } catch (error) {
                  // Silently fail if performance monitoring is not supported
                }
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
