'use client';

import dynamic from 'next/dynamic';
import { useAppState } from './AppStateContext';

// Dynamically import with ssr:false — Three.js MUST NOT run on the server
const Map = dynamic(() => import('./Map'), { ssr: false });
const Preloader = dynamic(() => import('./Preloader'), { ssr: false });
const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

export default function PersistentCanvas() {
  const { preloaderDone, setPreloaderDone, activePage, handleNavigate } = useAppState();

  return (
    <div className="app-root">
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <Map
        onNavigate={(page) => handleNavigate(page)}
        onClose={() => handleNavigate(null)}
        activePage={activePage}
      />
      <Navbar onNavigate={(page) => handleNavigate(page || null)} />
    </div>
  );
}
