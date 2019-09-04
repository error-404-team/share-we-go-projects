import {
  ButtonBaseClassKey,
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from 'share-we-go-ui/ButtonBase';
import { OverrideProps } from 'share-we-go-ui/OverridableComponent';

export type ToggleButtonTypeMap<
  P = {},
  D extends React.ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & {
    disableFocusRipple?: boolean;
    selected?: boolean;
    value?: any;
  };
  defaultComponent: D;
  classKey: ToggleButtonClassKey;
}>;

declare const ToggleButton: ExtendButtonBase<ToggleButtonTypeMap>;

export type ToggleButtonProps<
  D extends React.ElementType = ToggleButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ToggleButtonTypeMap<P, D>, D>;

export type ToggleButtonClassKey =
  | 'root'
  | 'disabled'
  | 'selected'
  | 'label'
  | 'sizeSmall'
  | 'sizeLarge';

export default ToggleButton;
