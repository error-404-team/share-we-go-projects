import { createMuiTheme } from 'share-we-go-ui/styles';

{
  let theme;
  theme = createMuiTheme({
    spacing: 8,
  });
  theme = createMuiTheme({
    spacing: (factor: number) => `${0.8 * factor}rem`,
  });
}
