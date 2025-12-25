import { Metadata } from 'next';
import { PageWrapper } from '@/components/layout';
import { ContactPageClient } from './ContactPageClient';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact',
  description: 'Get in touch with Baja Badlands Productions for your next project. We offer film production, video production, and creative services in Los Angeles.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <PageWrapper>
      <ContactPageClient />
    </PageWrapper>
  );
}