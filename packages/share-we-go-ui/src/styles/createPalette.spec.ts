import { Color } from 'share-we-go-ui';
import { blue } from 'share-we-go-ui/colors';
import {
  createPalette,
  PaletteColorOptions,
  SimplePaletteColorOptions,
} from 'share-we-go-ui/styles';

{
  const palette = createPalette({});
  const color: Color = blue;
  const option: SimplePaletteColorOptions = { main: blue[400] };
  const colorOrOption: PaletteColorOptions = undefined as any;

  palette.augmentColor(color);
  palette.augmentColor(color, 400);
  palette.augmentColor(color, 400, 200, 600);
  palette.augmentColor(color, 400, undefined, 600);
  palette.augmentColor(option);
  palette.augmentColor(option, 400); // $ExpectError
  palette.augmentColor(colorOrOption);
  palette.augmentColor(colorOrOption, 400); // $ExpectError
  const augmentedColor = palette.augmentColor(colorOrOption);
}
