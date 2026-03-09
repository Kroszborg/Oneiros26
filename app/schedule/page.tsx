import type { Metadata } from 'next';
import { PageOverlayWrapper } from '../components/PageOverlayWrapper';
import Schedule from '../components/Schedule';

export const metadata: Metadata = {
  title: 'Schedule – Oneiros 2026 | Event Timetable',
  description:
    'View the full event schedule for Oneiros 2026, March 13–15 at Manipal University Jaipur. Plan your festival experience.',
  alternates: { canonical: 'https://mujoneiros.in/schedule' },
};

export default function SchedulePage() {
  return (
    <PageOverlayWrapper>
      <Schedule />
    </PageOverlayWrapper>
  );
}
