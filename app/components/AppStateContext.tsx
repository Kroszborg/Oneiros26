'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AppStateContextValue {
  preloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
  activePage: string | null;
  handleNavigate: (page: string | null) => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Derive active page from URL (e.g. "/about" → "about", "/" → null)
  const activePage = (() => {
    const clean = pathname.replace(/^\/+/, '').replace(/\/+$/, '');
    return clean || null;
  })();

  const handleNavigate = useCallback(
    (page: string | null) => {
      if (page) {
        router.push(`/${page}`);
      } else {
        router.push('/');
      }
    },
    [router],
  );

  return (
    <AppStateContext.Provider value={{ preloaderDone, setPreloaderDone, activePage, handleNavigate }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used inside AppStateProvider');
  return ctx;
}
