import { Metadata } from 'next';
import { Header } from './Header';
import { Footer } from './Footer';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black">
      <Header />
      <main className={`flex-1 pt-12 sm:pt-14 ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

// Utility function for generating page metadata
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bajabadlands.com';
  const fullUrl = `${siteUrl}${path}`;
  const ogImage = image || '/images/og-image.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}