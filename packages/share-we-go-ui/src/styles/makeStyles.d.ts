import { Theme as DefaultTheme } from './createMuiTheme';
import { Styles, WithStylesOptions } from 'share-we-go-styles/withStyles';
import { StylesHook } from 'share-we-go-styles/makeStyles';
import { Omit } from 'share-we-go-types';

export default function makeStyles<
  Theme = DefaultTheme,
  Props extends {} = {},
  ClassKey extends string = string
>(
  styles: Styles<Theme, Props, ClassKey>,
  options?: Omit<WithStylesOptions<Theme>, 'withTheme'>,
): StylesHook<Styles<Theme, Props, ClassKey>>;
