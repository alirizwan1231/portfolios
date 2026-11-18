/* ------------------------------------------------------------------ */
/*  Whole-site colour palettes for the portfolio theme switcher.       */
/*  Hex values are the single source of truth — the boot script in     */
/*  index.html embeds the same data as RGB triplets to avoid a flash   */
/*  of the default theme before React mounts.                          */
/* ------------------------------------------------------------------ */

export type PaletteHex = {
  bg: string;
  panel: string;
  panel2: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  onAccent: string;
};

export type ThemePalette = {
  id: string;
  name: string;
  mood: string;
  dark: boolean;
  hex: PaletteHex;
};

/** Field order used everywhere (boot script included): bg, panel, panel2, text, muted, accent, accent2, onAccent */
export const PALETTE_FIELDS: (keyof PaletteHex)[] = [
  'bg', 'panel', 'panel2', 'text', 'muted', 'accent', 'accent2', 'onAccent',
];

export const CSS_VAR_NAMES = [
  '--c-bg', '--c-panel', '--c-panel2', '--c-text', '--c-muted', '--c-accent', '--c-accent2', '--c-onaccent',
] as const;

export const palettes: ThemePalette[] = [
  {
    id: 'oled-lime', name: 'OLED Lime', mood: 'Signature dark', dark: true,
    hex: { bg: '#0A0C0A', panel: '#12150F', panel2: '#171C13', text: '#F2F5EC', muted: '#9AA48F', accent: '#B8F135', accent2: '#2EF2A0', onAccent: '#0A0C0A' },
  },
  {
    id: 'ivory-travertine', name: 'Ivory Travertine', mood: 'Warm gallery neutral', dark: false,
    hex: { bg: '#F4EFE6', panel: '#FFFFFF', panel2: '#EAE1D0', text: '#1C1917', muted: '#7A6F60', accent: '#BC3B24', accent2: '#C8A15A', onAccent: '#FFFFFF' },
  },
  {
    id: 'midnight-violet', name: 'Midnight Violet', mood: 'Cosmic purple dark', dark: true,
    hex: { bg: '#12081F', panel: '#1D1033', panel2: '#29184A', text: '#F3EEFF', muted: '#A68FD0', accent: '#A855F7', accent2: '#EC4899', onAccent: '#FFFFFF' },
  },
  {
    id: 'ocean-depth', name: 'Ocean Depth', mood: 'Deep-sea calm', dark: true,
    hex: { bg: '#06202B', panel: '#0B3040', panel2: '#114155', text: '#EAF7FA', muted: '#8FB8C4', accent: '#38BDF8', accent2: '#2DD4BF', onAccent: '#06202B' },
  },
  {
    id: 'sunset-sorbet', name: 'Sunset Sorbet', mood: 'Golden-hour glow', dark: false,
    hex: { bg: '#FFF3E4', panel: '#FFFFFF', panel2: '#FFE3C2', text: '#33160B', muted: '#96604A', accent: '#FF6B35', accent2: '#FFB703', onAccent: '#FFFFFF' },
  },
  {
    id: 'forest-sage', name: 'Forest Sage', mood: 'Botanical calm', dark: false,
    hex: { bg: '#EDF2E4', panel: '#FBFDF7', panel2: '#DCE8CC', text: '#1E2B1A', muted: '#64755A', accent: '#3E7C4F', accent2: '#A9C46B', onAccent: '#FFFFFF' },
  },
  {
    id: 'rose-blush', name: 'Rose Blush', mood: 'Soft romantic', dark: false,
    hex: { bg: '#FDF0F2', panel: '#FFFFFF', panel2: '#FADCE2', text: '#33161D', muted: '#96626E', accent: '#E5486C', accent2: '#F2A0B5', onAccent: '#FFFFFF' },
  },
  {
    id: 'charcoal-gold', name: 'Charcoal Gold', mood: 'Luxe after dark', dark: true,
    hex: { bg: '#131313', panel: '#1E1E1E', panel2: '#2A2A2A', text: '#F5EFE0', muted: '#A79C83', accent: '#D4AF37', accent2: '#8C6D1F', onAccent: '#131313' },
  },
  {
    id: 'desert-sand', name: 'Desert Sand', mood: 'Sun-baked minimal', dark: false,
    hex: { bg: '#F3E9D7', panel: '#FBF6EC', panel2: '#E7D5B5', text: '#2E2118', muted: '#8A7157', accent: '#C96F2E', accent2: '#A98A5B', onAccent: '#FFFFFF' },
  },
  {
    id: 'crimson-editorial', name: 'Crimson Editorial', mood: 'Magazine bold', dark: false,
    hex: { bg: '#FAF6F0', panel: '#FFFFFF', panel2: '#EFE6D8', text: '#191410', muted: '#7D7264', accent: '#C8102E', accent2: '#E4B15E', onAccent: '#FFFFFF' },
  },
  {
    id: 'teal-lagoon', name: 'Teal Lagoon', mood: 'Fresh aquatic', dark: false,
    hex: { bg: '#E6F4F1', panel: '#FFFFFF', panel2: '#CBE8E1', text: '#0C2B26', muted: '#5C7A74', accent: '#0E9594', accent2: '#F2C94C', onAccent: '#FFFFFF' },
  },
  {
    id: 'lavender-haze', name: 'Lavender Haze', mood: 'Dreamy pastel', dark: false,
    hex: { bg: '#F0EDFA', panel: '#FFFFFF', panel2: '#DED4F5', text: '#241B3A', muted: '#7A6FA0', accent: '#7C5CD6', accent2: '#B8A9E8', onAccent: '#FFFFFF' },
  },
  {
    id: 'sakura', name: 'Sakura', mood: 'Cherry-blossom soft', dark: false,
    hex: { bg: '#FFF5F7', panel: '#FFFFFF', panel2: '#FBDCE4', text: '#33202A', muted: '#96707E', accent: '#E86A92', accent2: '#B56576', onAccent: '#FFFFFF' },
  },
  {
    id: 'slate-ember', name: 'Slate Ember', mood: 'Navy with fire', dark: true,
    hex: { bg: '#0F172A', panel: '#1E293B', panel2: '#2A3A55', text: '#E2E8F0', muted: '#8CA0B8', accent: '#F59E0B', accent2: '#38BDF8', onAccent: '#0F172A' },
  },
  {
    id: 'matcha', name: 'Matcha', mood: 'Earthy green tea', dark: false,
    hex: { bg: '#F1F3E6', panel: '#FCFDF6', panel2: '#E0E5C8', text: '#232B1B', muted: '#6E7858', accent: '#7A9B3E', accent2: '#D9C98A', onAccent: '#FFFFFF' },
  },
  {
    id: 'royal-indigo', name: 'Royal Indigo', mood: 'Regal night', dark: true,
    hex: { bg: '#0B1030', panel: '#151B45', panel2: '#202861', text: '#ECEEFF', muted: '#9298D6', accent: '#6366F1', accent2: '#F472B6', onAccent: '#FFFFFF' },
  },
  {
    id: 'peach-cream', name: 'Peach Cream', mood: 'Warm & friendly', dark: false,
    hex: { bg: '#FFF1E6', panel: '#FFFFFF', panel2: '#FFDCC4', text: '#33241A', muted: '#96755F', accent: '#FF8C5A', accent2: '#5FA8A0', onAccent: '#FFFFFF' },
  },
  {
    id: 'porcelain-sky', name: 'Porcelain Sky', mood: 'Clean corporate blue', dark: false,
    hex: { bg: '#EEF4FA', panel: '#FFFFFF', panel2: '#D8E7F3', text: '#16283C', muted: '#64809C', accent: '#2B6CB0', accent2: '#63B3ED', onAccent: '#FFFFFF' },
  },
  {
    id: 'volt-night', name: 'Volt Night', mood: 'Electric dark', dark: true,
    hex: { bg: '#0A0F0A', panel: '#121A12', panel2: '#1A261A', text: '#F2F5EC', muted: '#9DB08F', accent: '#B8F135', accent2: '#2EF2A0', onAccent: '#0A0F0A' },
  },
  {
    id: 'mono-ink', name: 'Mono Ink', mood: 'Pure black & white', dark: false,
    hex: { bg: '#F7F7F5', panel: '#FFFFFF', panel2: '#E8E8E4', text: '#111111', muted: '#6E6E6A', accent: '#111111', accent2: '#8A8A8A', onAccent: '#FFFFFF' },
  },
];

export const defaultPalette = palettes[0];

export function getPalette(id: string | null | undefined): ThemePalette {
  return palettes.find(p => p.id === id) ?? defaultPalette;
}

/** '#B8F135' -> '184 241 53' (space-separated RGB triplet for CSS vars) */
export function hexToRgbTriplet(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** CSS variable map for one palette, keyed by the var names in CSS_VAR_NAMES. */
export function paletteVars(p: ThemePalette): Record<string, string> {
  const vars: Record<string, string> = {};
  PALETTE_FIELDS.forEach((field, i) => {
    vars[CSS_VAR_NAMES[i]] = hexToRgbTriplet(p.hex[field]);
  });
  return vars;
}

/** id -> CSS var map for every palette (used by the React provider). */
export const PALETTE_VARS: Record<string, Record<string, string>> = Object.fromEntries(
  palettes.map(p => [p.id, paletteVars(p)]),
);
