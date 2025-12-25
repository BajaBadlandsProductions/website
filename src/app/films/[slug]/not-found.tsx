import { PageWrapper } from '@/components/layout';
import Link from 'next/link';

export default function FilmNotFound() {
  return (
    <PageWrapper>
      <div className="container-custom section-padding">
        <div className="text-center animate-fade-in-up">
          <div className="text-8xl mb-8">🎬</div>
          <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
            Film Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            The film you&apos;re looking for doesn&apos;t exist or may have been moved. 
            Explore our complete portfolio to discover our latest work.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/films"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              View All Films
            </Link>
            
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              Go Home
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}