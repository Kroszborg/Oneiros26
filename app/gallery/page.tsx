import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import Gallery from '../components/Gallery';

export const metadata: Metadata = {
  title: 'Gallery – Oneiros 2026 | Photos & Highlights',
  description:
    'Browse the photo gallery from Oneiros 2026 – highlights, performances, and memories from the Manipal University Jaipur cultural fest.',
  alternates: { canonical: 'https://mujoneiros.in/gallery' },
};

export default function GalleryPage() {
  return (
    <PageOverlayWrapper>
      <Gallery />
    </PageOverlayWrapper>
  );
}
