import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import Events from '../components/Events';

export const metadata: Metadata = {
  title: 'Events – Oneiros 2026 | All Activities',
  description:
    'Explore all events at Oneiros 2026 – the annual cultural fest of Manipal University Jaipur featuring competitions, workshops, and live performances.',
  alternates: { canonical: 'https://mujoneiros.in/events' },
};

export default function EventsPage() {
  return (
    <PageOverlayWrapper>
      <Events />
    </PageOverlayWrapper>
  );
}
