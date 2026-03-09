import type { Metadata, Viewport } from 'next';
import { orbitron, exo2, manrope, cinzel, cormorantGaramond } from './fonts';
import { AppStateProvider } from './components/AppStateContext';
import PersistentCanvas from './components/PersistentCanvas';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oneiros 2026 – MUJ Cultural Fest | Events & Competitions',
  description:
    'Join Oneiros 2026 – the annual cultural fest of Manipal University Jaipur featuring competitions, performances, and exciting events.',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Oneiros 2026',
    title: 'Oneiros 2026 – MUJ Cultural Fest',
    description: 'Explore competitions, performances and events at Oneiros 2026.',
    images: [
      {
        url: 'https://mujoneiros.in/preview.png',
        width: 1200,
        height: 630,
        alt: 'Oneiros 2026 cultural fest logo',
      },
    ],
    url: 'https://mujoneiros.in',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@oneiros',
    title: 'Oneiros 2026 – MUJ Cultural Fest',
    description: 'Explore competitions, performances and events at Oneiros 2026.',
    images: {
      url: 'https://mujoneiros.in/preview.png',
      alt: 'Oneiros 2026 cultural fest logo',
    },
  },
  alternates: {
    canonical: 'https://mujoneiros.in/',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Intentionally disabled — 3D joystick controls require touch-action: none
  // The accessibility trade-off is accepted for this immersive WebGL experience
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#000000',
};

const fontVars = [
  orbitron.variable,
  exo2.variable,
  manrope.variable,
  cinzel.variable,
  cormorantGaramond.variable,
].join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/intro_enhanced.webm" as="video" type="video/webm" />
        <link rel="preload" href="/oneiros-logo.webp" as="image" />
        {/* GLBs: preload as fetch so the browser starts downloading before Three.js loads */}
        <link rel="preload" href="/map.glb" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/character.glb" as="fetch" crossOrigin="anonymous" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: 'Oneiros 2026 Cultural Fest',
              description: 'Annual cultural fest featuring competitions, performances and events.',
              startDate: '2026-03-13',
              endDate: '2026-03-15',
              eventStatus: 'https://schema.org/EventScheduled',
              eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
              url: 'https://mujoneiros.in/',
              image: ['https://mujoneiros.in/preview.png'],
              location: {
                '@type': 'Place',
                name: 'Manipal University Jaipur',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Jaipur',
                  addressCountry: 'India',
                },
              },
              organizer: {
                '@type': 'Organization',
                name: 'Manipal University Jaipur',
                url: 'https://mujoneiros.in/',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Oneiros Cultural Fest',
              url: 'https://mujoneiros.in',
              logo: 'https://mujoneiros.in/oneiros-logo.webp',
            }),
          }}
        />
      </head>
      <body>
        {/* Mobile joystick — controlled by JS in Map.tsx */}
        <div id="joystick-zone">
          <div id="joystick-base">
            <div id="joystick-knob"></div>
          </div>
        </div>

        <AppStateProvider>
          {/* Persistent 3D canvas layer — never remounted across routes */}
          <PersistentCanvas />
          {/* Page overlays render as children on top of canvas */}
          {children}
        </AppStateProvider>
      </body>
    </html>
  );
}
