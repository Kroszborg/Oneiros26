'use client';

import type { ReactNode } from 'react';
import { useAppState } from './AppStateContext';

export function PageOverlayWrapper({ children }: { children: ReactNode }) {
  const { activePage, handleNavigate } = useAppState();

  return (
    <div className="page-overlay">
      <button
        onClick={() => handleNavigate(null)}
        className="page-overlay-close"
        aria-label="Close"
      >
        ✕
      </button>

      {activePage !== 'contact' && (
        <>
          {/* Desktop: static hint */}
          <span
            style={{
              position: 'fixed',
              bottom: 24,
              right: 28,
              zIndex: 1001,
              padding: '8px 16px',
              borderRadius: 8,
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.7)',
              fontSize: 13,
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: '0.3px',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
            className="back-hint-desktop"
          >
            Press{' '}
            <kbd
              style={{
                padding: '2px 6px',
                borderRadius: 4,
                background: 'rgba(255,255,255,0.12)',
                fontWeight: 600,
                color: '#fff',
              }}
            >
              E
            </kbd>{' '}
            to go back
          </span>

          {/* Mobile: tappable pill */}
          <button
            onClick={() => handleNavigate(null)}
            className="back-hint-mobile"
            style={{
              position: 'fixed',
              bottom: 36,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 1001,
              padding: '12px 28px',
              borderRadius: 50,
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.22)',
              color: 'rgba(255,255,255,0.85)',
              fontSize: 14,
              fontFamily: "'Inter', system-ui, sans-serif",
              letterSpacing: '0.3px',
              cursor: 'pointer',
              userSelect: 'none',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            Tap here to go back
          </button>
        </>
      )}

      {children}
    </div>
  );
}
