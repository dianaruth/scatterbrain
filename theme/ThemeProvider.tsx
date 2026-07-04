import { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

import {
  colors,
  fonts,
  radii,
  spacing,
  typeColors,
  type ColorScheme,
} from './tokens';

type ThemeColors = (typeof colors)[ColorScheme];

type ThemeContextValue = {
  scheme: ColorScheme;
  colors: ThemeColors;
  fonts: typeof fonts;
  radii: typeof radii;
  spacing: typeof spacing;
  typeColors: typeof typeColors;
};

export const ThemeContext = createContext<ThemeContextValue>({
  scheme: 'dark',
  colors: colors.dark,
  fonts,
  radii,
  spacing,
  typeColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const scheme: ColorScheme = systemScheme === 'light' ? 'light' : 'dark';

  const value: ThemeContextValue = {
    scheme,
    colors: colors[scheme],
    fonts,
    radii,
    spacing,
    typeColors,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
