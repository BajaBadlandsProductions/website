import { Metadata } from 'next';
import Link from 'next/link';
import { PageWrapper } from '@/components/layout';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="container-custom section-padding">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              The page you are looking for might have been removed, had its name changed, 
              or is temporarily unavailable.
            </p>
          </div>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Link>
            
            <Link
              href="/films"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 4h6V3H9v1zm-4 3v9h14V7H5z" />
              </svg>
              View Films
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}