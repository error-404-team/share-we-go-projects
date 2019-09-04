// import warning from 'warning';
import { createStyles as createStylesOriginal } from 'share-we-go-styles';

// let warnOnce = false;

// To remove in v5
export default function createStyles(styles) {
  // warning(
  //   warnOnce,
  //   [
  //     'Material-UI: createStyles from share-we-go-ui/styles is deprecated.',
  //     'Please use share-we-go-styles/createStyles',
  //   ].join('\n'),
  // );
  // warnOnce = true;
  return createStylesOriginal(styles);
}
