'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/config';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Films', href: '/films' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20">
      <nav className="container-custom" aria-label="Top">
        <div className="flex h-12 sm:h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                {/* White circle sized to fully cover skull */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full"></div>
                <Image 
                  src="/images/logo_vector.svg" 
                  alt="Baja Badlands Productions" 
                  width={40}
                  height={40}
                  className="w-full h-full relative z-10"
                  priority
                />
              </div>
              <span className="text-base sm:text-lg font-bold">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-gray-700 dark:hover:text-gray-300 relative ${
                  pathname === item.href
                    ? 'text-gray-900 dark:text-white after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 dark:after:bg-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="touch-target-lg inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${mobileMenuOpen ? 'hidden' : 'block'} h-5 w-5 sm:h-6 sm:w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${mobileMenuOpen ? 'block' : 'hidden'} h-5 w-5 sm:h-6 sm:w-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen
              ? 'max-h-64 opacity-100 visible'
              : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
          id="mobile-menu"
        >
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-3 text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white touch-target ${
                  pathname === item.href
                    ? 'text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}