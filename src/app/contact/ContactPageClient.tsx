'use client';

import { ContactForm } from '@/components/ui';
import { ContactFormData } from '@/types';
import { siteConfig } from '@/lib/data';
import { useState } from 'react';

export function ContactPageClient() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      // In a real implementation, this would send to an API endpoint
      // For now, we'll simulate the submission and log the data
      console.log('Contact form submission:', data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission failed:', error);
      setSubmitStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="container-custom section-padding">
      {/* Header Section */}
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Get In Touch
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Ready to bring your vision to life? We&apos;d love to hear about your project and discuss how we can help create something extraordinary together.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Contact Form */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Send us a message
          </h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                Thank you for your message! We&apos;ll get back to you soon.
              </p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200">
                Sorry, there was an error sending your message. Please try again or contact us directly.
              </p>
            </div>
          )}
          
          <ContactForm onSubmit={handleFormSubmit} />
        </div>

        {/* Contact Information */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Contact Information
          </h2>
          
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 mt-1">
                <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
                <a 
                  href={`mailto:${siteConfig.links.email}`}
                  className="text-accent-500 hover:text-accent-600 transition-colors"
                >
                  {siteConfig.links.email}
                </a>
              </div>
            </div>

            {/* Phone */}
            {siteConfig.links.phone && (
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 mt-1">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Phone</h3>
                  <a 
                    href={`tel:${siteConfig.links.phone}`}
                    className="text-accent-500 hover:text-accent-600 transition-colors"
                  >
                    {siteConfig.links.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-6 h-6 mt-1">
                <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Location</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Los Angeles, California
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {siteConfig.links.instagram && (
                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent-500 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.315 0-.612-.123-.833-.344-.221-.221-.344-.518-.344-.833 0-.315.123-.612.344-.833.221-.221.518-.344.833-.344s.612.123.833.344c.221.221.344.518.344.833 0 .315-.123.612-.344.833-.221.221-.518.344-.833.344z"/>
                    </svg>
                  </a>
                )}
                {siteConfig.links.youtube && (
                  <a
                    href={siteConfig.links.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent-500 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
                {siteConfig.links.facebook && (
                  <a
                    href={siteConfig.links.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent-500 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {siteConfig.links.twitter && (
                  <a
                    href={siteConfig.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-accent-500 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}