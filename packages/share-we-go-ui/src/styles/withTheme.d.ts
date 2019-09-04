import { Theme } from './createMuiTheme';
import { PropInjector } from 'share-we-go-types';

export interface WithTheme {
  theme: Theme;
}

export interface ThemedComponentProps extends Partial<WithTheme> {
  innerRef?: React.Ref<any>;
}

declare const withTheme: PropInjector<WithTheme, ThemedComponentProps>;

export default withTheme;
