import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/data';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Films', href: '/films' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  {
    name: 'Instagram',
    href: siteConfig.links.instagram,
    icon: (
      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.315 0-.612-.123-.833-.344-.221-.221-.344-.518-.344-.833 0-.315.123-.612.344-.833.221-.221.518-.344.833-.344s.612.123.833.344c.221.221.344.518.344.833 0 .315-.123.612-.344.833-.221.221-.518.344-.833.344z"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: siteConfig.links.youtube,
    icon: (
      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: siteConfig.links.facebook,
    icon: (
      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: siteConfig.links.twitter,
    icon: (
      <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
  },
].filter(link => link.href); // Filter out any undefined links

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container-custom py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                {/* White circle sized to fully cover skull */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full"></div>
                <Image 
                  src="/images/logo_vector.svg" 
                  alt="Baja Badlands Productions" 
                  width={40}
                  height={40}
                  className="w-full h-full relative z-10"
                />
              </div>
              <h3 className="text-responsive-lg font-semibold text-gray-900 dark:text-white">
                {siteConfig.name}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-responsive-sm mb-4 max-w-md">
              {siteConfig.description}
            </p>
            <div className="space-y-2">
              <p className="text-responsive-xs text-gray-600 dark:text-gray-400">
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="hover:text-gray-900 dark:hover:text-white transition-colors touch-target"
                >
                  {siteConfig.links.email}
                </a>
              </p>
              {siteConfig.links.phone && (
                <p className="text-responsive-xs text-gray-600 dark:text-gray-400">
                  <a
                    href={`tel:${siteConfig.links.phone}`}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors touch-target"
                  >
                    {siteConfig.links.phone}
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-responsive-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3 sm:mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-responsive-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors touch-target block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-responsive-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3 sm:mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors touch-target-lg p-2 -m-2"
                >
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-responsive-xs text-gray-600 dark:text-gray-400 text-center sm:text-left">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <div className="text-center sm:text-right">
              <p className="text-responsive-xs text-gray-600 dark:text-gray-400">
                Crafted with passion for visual storytelling
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}