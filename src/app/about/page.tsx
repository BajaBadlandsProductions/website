import { Metadata } from 'next';
import { PageWrapper } from '@/components/layout';
import { TeamMember } from '@/components/ui';
import { teamMembers, siteConfig } from '@/lib/data';
import { generatePageMetadata, generateBreadcrumbStructuredData, generateJsonLd } from '@/lib/seo';
import Script from 'next/script';

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description: 'Meet the team behind Baja Badlands Productions and learn about our story, values, and commitment to visual storytelling excellence.',
  path: '/about',
});

export default function AboutPage() {
  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  return (
    <PageWrapper>
      {/* Structured Data */}
      <Script
        id="about-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={generateJsonLd(breadcrumbData)}
      />
      
      <div className="container-custom section-padding">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            {siteConfig.description}
          </p>
        </div>

        {/* Company Story Section */}
        <div className="mb-20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Founded with a passion for visual storytelling, Baja Badlands Productions emerged from a shared vision to create compelling multimedia content that resonates with audiences. Our journey began with a simple belief: every story deserves to be told with authenticity, creativity, and technical excellence.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Based in Los Angeles, we specialize in film production, commercial work, and music videos, bringing together a diverse team of creative professionals who share our commitment to quality and innovation. From concept development to post-production, we handle every aspect of the creative process with meticulous attention to detail.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our work spans multiple genres and formats, but our approach remains consistent: we collaborate closely with our clients to understand their vision, then leverage our technical expertise and creative insights to bring that vision to life in ways that exceed expectations.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Meet Our Team
          </h2>
          
          {teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <TeamMember member={member} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 glass rounded-full">
                <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Team Profiles Coming Soon
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Values Section */}
        <div className="mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Creative Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe in the power of visual storytelling to connect, inspire, and move audiences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Quality Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every project receives our full attention to detail and commitment to professional standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Collaborative Spirit
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We work closely with our clients as partners to bring their unique vision to life.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Whether you have a clear vision or just the beginning of an idea, we&apos;d love to discuss how we can help bring your project to life.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-accent-500 focus:ring-offset-2"
            >
              Get In Touch
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}