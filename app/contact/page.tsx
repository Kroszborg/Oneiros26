import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import Contact from '../components/Contact';

export const metadata: Metadata = {
  title: 'Contact – Oneiros 2026 | Get in Touch',
  description:
    'Contact the Oneiros 2026 team at Manipal University Jaipur. Reach out for sponsorship, media enquiries, or general questions.',
  alternates: { canonical: 'https://mujoneiros.in/contact' },
};

export default function ContactPage() {
  return (
    <PageOverlayWrapper>
      <Contact />
    </PageOverlayWrapper>
  );
}
