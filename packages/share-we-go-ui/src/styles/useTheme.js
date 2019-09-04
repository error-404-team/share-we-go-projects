import { useTheme as useThemeWithoutDefault } from 'share-we-go-styles';
import defaultTheme from './defaultTheme';

export default function useTheme() {
  return useThemeWithoutDefault() || defaultTheme;
}
