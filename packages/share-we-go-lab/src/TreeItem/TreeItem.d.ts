import * as React from 'react';
import { StandardProps } from 'share-we-go-ui';
import { TransitionProps } from 'share-we-go-ui/transitions/transition';

export interface TreeItemProps
  extends StandardProps<React.HTMLAttributes<HTMLLIElement>, TreeItemClassKey> {
  collapseIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  nodeId: string;
  TransitionComponent?: React.ComponentType<TransitionProps>;
}

export type TreeItemClassKey =
  | 'root'
  | 'expanded'
  | 'group'
  | 'content'
  | 'iconContainer'
  | 'label';

declare const TreeItem: React.ComponentType<TreeItemProps>;

export default TreeItem;
