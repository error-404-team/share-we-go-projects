import { useTheme, makeStyles, styled } from 'share-we-go-styles';
import Grid from 'share-we-go-ui/Grid';

declare module 'share-we-go-styles' {
  interface DefaultTheme {
    myProperty: string;
  }
}

{
  // $ExpectType string
  const value = useTheme().myProperty;
}

{
  makeStyles(theme => {
    // $ExpectType string
    const value = theme.myProperty;

    return {
      root: {
        width: 1,
      },
    };
  });
}

{
  styled(Grid)(({ theme }) => {
    // $ExpectType string
    const value = theme.myProperty;

    return {
      width: 1,
    };
  });
}
