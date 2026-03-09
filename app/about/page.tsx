import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import About from '../components/About';

export const metadata: Metadata = {
  title: 'About Oneiros 2026 – Manipal University Jaipur Cultural Fest',
  description:
    'Learn about Oneiros 2026, the annual cultural fest of Manipal University Jaipur. Discover our theme "The Celestial Canvas" and the story behind the event.',
  alternates: { canonical: 'https://mujoneiros.in/about' },
};

export default function AboutPage() {
  return (
    <PageOverlayWrapper>
      <About />
    </PageOverlayWrapper>
  );
}
