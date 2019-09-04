import { withThemeCreator } from 'share-we-go-styles';
import defaultTheme from './defaultTheme';

const withTheme = withThemeCreator({
  defaultTheme,
});

export default withTheme;
