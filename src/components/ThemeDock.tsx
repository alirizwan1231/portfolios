import { useEffect } from 'react';
import { Check, Palette, X } from 'lucide-react';
import { useTheme } from '../theme';
import type { ThemePalette } from '../theme-palettes';

/* ------------------------- Palette card ------------------------- */

function PaletteCard({ p }: { p: ThemePalette }) {
  const { palette, setPalette, setPanelOpen } = useTheme();
  const active = p.id === palette.id;
  const h = p.hex;
  const apply = () => {
    setPalette(p.id);
    setPanelOpen(false);
  };
  return (
    <button
      type="button"
      onClick={apply}
      aria-pressed={active}
      aria-label={`Apply ${p.name} palette`}
      className="group rounded-2xl border p-3.5 text-left transition-transform duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: h.bg,
        color: h.text,
        borderColor: active ? h.accent : 'rgba(127,127,127,0.28)',
        boxShadow: active ? `0 0 0 2px ${h.accent}` : undefined,
      }}
    >
      {/* mini preview painted in this palette's panel colour */}
      <span className="mb-3 block rounded-xl p-3" style={{ backgroundColor: h.panel }}>
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: h.accent }} />
          <span className="h-2 w-3/5 rounded-full" style={{ backgroundColor: h.text, opacity: 0.85 }} />
        </span>
        <span className="mt-2.5 block h-2 w-2/5 rounded-full" style={{ backgroundColor: h.text, opacity: 0.45 }} />
        <span
          className="mt-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold"
          style={{ backgroundColor: h.accent, color: h.onAccent }}
        >
          Accent
        </span>
      </span>

      <span className="block font-display text-[15px] font-bold leading-tight">{p.name}</span>
      <span className="mt-0.5 block text-xs" style={{ color: h.muted }}>{p.mood}</span>

      {/* 5-swatch strip */}
      <span
        className="mt-3 flex h-2.5 overflow-hidden rounded-full"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(127,127,127,0.3)' }}
        aria-hidden
      >
        {[h.bg, h.panel, h.text, h.accent, h.accent2].map((c, i) => (
          <span key={i} className="flex-1" style={{ backgroundColor: c }} />
        ))}
      </span>

      <span className="mt-3.5 flex items-center justify-between">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em]" style={{ color: h.muted }}>
          {p.dark ? 'Dark' : 'Light'}
        </span>
        {active ? (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold"
            style={{ backgroundColor: h.accent, color: h.onAccent }}
          >
            <Check className="h-3 w-3" /> Active
          </span>
        ) : (
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-bold transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundColor: h.accent, color: h.onAccent }}
          >
            Apply
          </span>
        )}
      </span>
    </button>
  );
}

/* ------------------------- Palette panel ------------------------- */

function PalettePanel() {
  const { palette, palettes, panelOpen, setPanelOpen } = useTheme();

  useEffect(() => {
    if (!panelOpen) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPanelOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [panelOpen, setPanelOpen]);

  if (!panelOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-8"
      onClick={e => {
        if (e.target === e.currentTarget) setPanelOpen(false);
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Choose a colour palette"
    >
      <div
        className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 p-6 shadow-2xl sm:p-8"
        style={{ backgroundColor: 'rgb(var(--c-bg))' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Pick a colour mood</h2>
            <p className="mt-1.5 text-sm text-muted">
              Now showing: <strong className="font-semibold text-cream">{palette.name}</strong> — {palette.mood}.
              Tap any palette and the whole site repaints.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            aria-label="Close palette picker"
            className="shrink-0 rounded-full border border-white/15 p-2.5 transition hover:border-lime/50 hover:text-lime"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3.5 md:grid-cols-3 xl:grid-cols-4">
          {palettes.map(p => (
            <PaletteCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------- Floating dock ------------------------- */

export default function ThemeDock() {
  const { palette, setPalette, palettes, setPanelOpen } = useTheme();
  const quick = palettes.slice(0, 8);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 sm:bottom-5">
        <div className="pointer-events-auto flex max-w-[96vw] items-center gap-2 overflow-x-auto rounded-full border border-white/10 bg-panel/85 py-2 pl-3 pr-2 shadow-2xl backdrop-blur-xl sm:gap-2.5 sm:pl-4">
          <span className="hidden shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted md:flex">
            <Palette className="h-4 w-4 text-lime" />
            Theme
          </span>

          <span className="hidden h-6 w-px shrink-0 bg-white/10 md:block" />

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {quick.map(p => {
              const active = p.id === palette.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPalette(p.id)}
                  title={`${p.name} — ${p.mood}`}
                  aria-label={`Apply ${p.name} palette`}
                  aria-pressed={active}
                  className="h-7 w-7 shrink-0 rounded-full transition-transform duration-300 hover:scale-110"
                  style={{
                    background: `conic-gradient(from 210deg, ${p.hex.accent} 0 50%, ${p.hex.accent2} 50% 78%, ${p.hex.bg} 78% 100%)`,
                    boxShadow: active
                      ? '0 0 0 2px rgb(var(--c-panel)), 0 0 0 4px rgb(var(--c-accent))'
                      : 'inset 0 0 0 1px rgba(127,127,127,0.35)',
                    transform: active ? 'scale(1.12)' : undefined,
                  }}
                />
              );
            })}
          </div>

          <span className="hidden max-w-[110px] shrink-0 truncate text-xs font-medium text-cream lg:block">
            {palette.name}
          </span>

          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="shrink-0 whitespace-nowrap rounded-full bg-lime px-4 py-2 text-xs font-bold uppercase tracking-wider text-onaccent transition-transform duration-300 hover:-translate-y-0.5"
          >
            All 20
          </button>
        </div>
      </div>

      <PalettePanel />
    </>
  );
}
