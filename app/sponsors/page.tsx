import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import Sponsors from '../components/Sponsors';

export const metadata: Metadata = {
  title: 'Sponsors – Oneiros 2026 | Our Partners',
  description:
    'Meet the sponsors and partners powering Oneiros 2026, the annual cultural fest of Manipal University Jaipur.',
  alternates: { canonical: 'https://mujoneiros.in/sponsors' },
};

export default function SponsorsPage() {
  return (
    <PageOverlayWrapper>
      <Sponsors />
    </PageOverlayWrapper>
  );
}
