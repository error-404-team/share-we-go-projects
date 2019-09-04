import { makeStyles as makeStylesWithoutDefault } from 'share-we-go-styles';
import defaultTheme from './defaultTheme';

function makeStyles(stylesOrCreator, options = {}) {
  return makeStylesWithoutDefault(stylesOrCreator, {
    defaultTheme,
    ...options,
  });
}

export default makeStyles;
