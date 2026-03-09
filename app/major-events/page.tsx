import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import MajorEvents from '../components/MajorEvents';

export const metadata: Metadata = {
  title: 'Major Events – Oneiros 2026 | Competitions & Performances',
  description:
    'Explore the major events at Oneiros 2026: Requiem (music), Destival (dance), Cosmos (fashion), Spot Photography, Behas (debate), and Nukkad Natak. Prize pools up to ₹60,000.',
  alternates: { canonical: 'https://mujoneiros.in/major-events' },
};

export default function MajorEventsPage() {
  return (
    <PageOverlayWrapper>
      <MajorEvents />
    </PageOverlayWrapper>
  );
}
