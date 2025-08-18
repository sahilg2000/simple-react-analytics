import colors from './colors';

/* Accent -> main accent color */
export const ACCENTS = {
  blue:   colors.blue_accent,
  red:    colors.red_accent,
  green:  colors.green_accent,
  orange: colors.orange_accent,
};

/* Accent -> matching pale surface for LIGHT mode */
const SURFACES_LIGHT = {
  blue:   colors.blue_background,
  red:    colors.red_background,
  green:  colors.green_background,
  orange: colors.orange_background,
};

/* Base per-mode values that don’t depend on accent */
export const MODES = {
  light: {                         // used for common light values
    background: colors.light,      // page background
    text:       colors.black,
  },
  dark: {
    background: colors.black,
    surface:    colors.dark,       // fixed dark surface
    text:       colors.white,
  },
};

/* Factory */
export function createPalette({ accent = 'blue', mode = 'light' } = {}) {
  const base      = MODES[mode];
  const surface   =
    mode === 'light' ? SURFACES_LIGHT[accent] : base.surface; // accent-matched

  return {
    ...base,
    surface,                 // light mode: accent surface, dark: fixed dark
    accent: ACCENTS[accent],
  };
}

/* default export – light mode, blue accent */
export default createPalette;
