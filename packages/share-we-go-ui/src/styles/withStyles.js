import { withStyles as withStylesWithoutDefault } from 'share-we-go-styles';
import defaultTheme from './defaultTheme';

function withStyles(stylesOrCreator, options) {
  return withStylesWithoutDefault(stylesOrCreator, {
    defaultTheme,
    ...options,
  });
}

export default withStyles;
