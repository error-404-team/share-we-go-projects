import * as React from 'react';
import { StandardProps } from 'share-we-go-ui';
import { ButtonProps } from 'share-we-go-ui/Button';
import { TooltipProps } from 'share-we-go-ui/Tooltip';

export interface SpeedDialActionProps
  extends StandardProps<Partial<TooltipProps>, SpeedDialActionClassKey> {
  ButtonProps?: Partial<ButtonProps>;
  delay?: number;
  icon: React.ReactNode;
  TooltipClasses?: TooltipProps['classes'];
  tooltipPlacement?: TooltipProps['placement'];
  tooltipTitle?: React.ReactNode;
  tooltipOpen?: boolean;
}

export type SpeedDialActionClassKey = 'root' | 'button' | 'buttonClosed';

declare const SpeedDialAction: React.ComponentType<SpeedDialActionProps>;

export default SpeedDialAction;
