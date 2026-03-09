import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import Artist from '../components/Artist';

export const metadata: Metadata = {
  title: 'Artists – Oneiros 2026 | Headline Performers',
  description:
    'See the headline artists and performers at Oneiros 2026, the annual cultural fest of Manipal University Jaipur.',
  alternates: { canonical: 'https://mujoneiros.in/artist' },
};

export default function ArtistPage() {
  return (
    <PageOverlayWrapper>
      <Artist />
    </PageOverlayWrapper>
  );
}
