import { ponyfillGlobal } from 'share-we-go-utils';

/* Warning if there are several instances of share-we-go-styles */
if (
  process.env.NODE_ENV !== 'production' &&
  process.env.NODE_ENV !== 'test' &&
  typeof window !== 'undefined'
) {
  ponyfillGlobal['__share-we-go-styles-init__'] =
    ponyfillGlobal['__share-we-go-styles-init__'] || 0;

  if (ponyfillGlobal['__share-we-go-styles-init__'] === 1) {
    // eslint-disable-next-line no-console
    console.warn(
      [
        'It looks like there are several instances of `share-we-go-styles` initialized in this application.',
        'This may cause theme propagation issues, broken class names, ' +
          'specificity issues, and makes your application bigger without a good reason.',
        '',
        'See https://material-ui.com/r/styles-instance-warning for more info.',
      ].join('\n'),
    );
  }

  ponyfillGlobal['__share-we-go-styles-init__'] += 1;
}

export { default as createGenerateClassName } from './createGenerateClassName';
export { default as createStyles } from './createStyles';
export { default as getThemeProps } from './getThemeProps';
export { default as jssPreset } from './jssPreset';
export { default as makeStyles } from './makeStyles';
export { default as mergeClasses } from './mergeClasses';
export { default as ServerStyleSheets } from './ServerStyleSheets';
export { default as styled } from './styled';
export { default as StylesProvider } from './StylesProvider';
export { default as ThemeProvider } from './ThemeProvider';
export { default as useTheme } from './useTheme';
export { default as withStyles } from './withStyles';
export { default as withTheme, withThemeCreator } from './withTheme';
