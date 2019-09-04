import * as React from 'react';

import { StandardProps } from 'share-we-go-ui';

export interface ToggleButtonGroupProps
  extends StandardProps<
    React.HTMLAttributes<HTMLDivElement>,
    ToggleButtonGroupClassKey,
    'onChange'
  > {
  selected?: boolean;
  exclusive?: boolean;
  onChange?: (event: React.MouseEvent<HTMLElement>, value: any) => void;
  size?: 'small' | 'medium' | 'large';
  value?: any;
}

export type ToggleButtonGroupClassKey =
  | 'root'
  | 'grouped'
  | 'groupedSizeSmall'
  | 'groupedSizeLarge';

declare const ToggleButtonGroup: React.ComponentType<ToggleButtonGroupProps>;

export default ToggleButtonGroup;
