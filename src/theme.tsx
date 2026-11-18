import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  PALETTE_VARS,
  defaultPalette,
  getPalette,
  palettes,
  type ThemePalette,
} from './theme-palettes';

export const THEME_STORAGE_KEY = 'ali-portfolio-palette';

type ThemeCtx = {
  palette: ThemePalette;
  setPalette: (id: string) => void;
  palettes: ThemePalette[];
  panelOpen: boolean;
  setPanelOpen: (open: boolean) => void;
};

const Ctx = createContext<ThemeCtx>({
  palette: defaultPalette,
  setPalette: () => {},
  palettes,
  panelOpen: false,
  setPanelOpen: () => {},
});

export const useTheme = () => useContext(Ctx);

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function applyVars(p: ThemePalette) {
  const root = document.documentElement;
  const vars = PALETTE_VARS[p.id];
  if (vars) Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.dataset.palette = p.id;
  root.dataset.mode = p.dark ? 'dark' : 'light';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', p.hex.bg);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<ThemePalette>(defaultPalette);
  const [panelOpen, setPanelOpen] = useState(false);
  const [wash, setWash] = useState<{ key: number; color: string; color2: string } | null>(null);
  const [toast, setToast] = useState<{ key: number; name: string; mood: string } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const washTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore the saved palette on mount (the inline boot script in index.html
  // already painted it, so this just syncs React state — silently).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && saved !== defaultPalette.id) {
        const p = getPalette(saved);
        applyVars(p);
        setPaletteState(p);
      }
    } catch {
      /* storage unavailable — default palette stands */
    }
  }, []);

  const setPalette = useCallback((id: string) => {
    const p = getPalette(id);
    applyVars(p);
    setPaletteState(p);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
    if (!reducedMotion()) {
      // Colour-wash sweep in the NEW palette's colours.
      if (washTimer.current) clearTimeout(washTimer.current);
      setWash({ key: Date.now(), color: p.hex.accent, color2: p.hex.accent2 });
      washTimer.current = setTimeout(() => setWash(null), 950);
    }
    // "Now showing" toast.
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ key: Date.now(), name: p.name, mood: p.mood });
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  return (
    <Ctx.Provider value={{ palette, setPalette, palettes, panelOpen, setPanelOpen }}>
      {children}

      {/* Full-screen colour-wash sweep on every switch */}
      {wash && (
        <div
          key={wash.key}
          aria-hidden
          className="wash-sweep"
          style={{
            background: `linear-gradient(105deg, transparent 0%, ${wash.color} 38%, ${wash.color2} 62%, transparent 100%)`,
          }}
        />
      )}

      {/* Now-showing toast — bottom-left, above the dock */}
      {toast && (
        <div
          key={toast.key}
          role="status"
          className="toast-pop fixed bottom-24 left-4 z-[70] flex items-center gap-3 rounded-full border border-white/10 bg-panel py-2 pl-3 pr-5 shadow-2xl sm:left-6"
        >
          <span className="flex overflow-hidden rounded-full">
            <span className="h-5 w-2.5" style={{ background: palette.hex.accent }} />
            <span className="h-5 w-2.5" style={{ background: palette.hex.accent2 }} />
            <span className="h-5 w-2.5" style={{ background: palette.hex.bg }} />
          </span>
          <span className="whitespace-nowrap text-sm text-cream">
            Now showing: <strong className="font-semibold">{toast.name}</strong>
            <span className="text-muted"> — {toast.mood}</span>
          </span>
        </div>
      )}
    </Ctx.Provider>
  );
}
