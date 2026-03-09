import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import Team from '../components/Team';

export const metadata: Metadata = {
  title: 'Team – Oneiros 2026 | Organising Committee',
  description:
    'Meet the organising committee behind Oneiros 2026 – the Convenors, Co-Convenors, and Organising Secretaries who make the fest possible.',
  alternates: { canonical: 'https://mujoneiros.in/team' },
};

export default function TeamPage() {
  return (
    <PageOverlayWrapper>
      <Team />
    </PageOverlayWrapper>
  );
}
