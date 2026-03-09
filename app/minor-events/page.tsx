import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import MinorEvents from '../components/MinorEvents';

export const metadata: Metadata = {
  title: 'Minor Events – Oneiros 2026 | Workshops & Activities',
  description:
    'Discover the minor events at Oneiros 2026 – workshops, hackathons, mini-games, and club activities at Manipal University Jaipur.',
  alternates: { canonical: 'https://mujoneiros.in/minor-events' },
};

export default function MinorEventsPage() {
  return (
    <PageOverlayWrapper>
      <MinorEvents />
    </PageOverlayWrapper>
  );
}
