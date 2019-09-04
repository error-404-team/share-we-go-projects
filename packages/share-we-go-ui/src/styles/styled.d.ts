import { Omit, IsAny, CoerceEmptyInterface } from 'share-we-go-types';
import {
  CreateCSSProperties,
  StyledComponentProps,
  WithStylesOptions,
} from 'share-we-go-styles/withStyles';
import { Theme as DefaultTheme } from './createMuiTheme';
import * as React from 'react';

// These definitions are almost identical to the ones in share-we-go-styles/styled
// Only difference is that ComponentCreator has a default theme type
// If you need to change these types, update the ones in share-we-go-styles as well

/**
 * @internal
 */
export type ComponentCreator<Component extends React.ElementType> = <
  Theme = DefaultTheme,
  Props extends {} = any
>(
  styles:
    | CreateCSSProperties<Props>
    | ((props: { theme: Theme } & CoerceEmptyInterface<Props>) => CreateCSSProperties<Props>),
  options?: WithStylesOptions<Theme>,
) => React.ComponentType<
  Omit<
    JSX.LibraryManagedAttributes<Component, React.ComponentProps<Component>>,
    'classes' | 'className'
  > &
    StyledComponentProps<'root'> & { className?: string } & CoerceEmptyInterface<
      Props extends { theme: Theme } ? Omit<Props, 'theme'> & { theme?: Theme } : Props
    >
>;

export interface StyledProps {
  className: string;
}

export default function styled<Component extends React.ElementType>(
  Component: Component,
): ComponentCreator<Component>;
