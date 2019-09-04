import React from 'react';
import Container from 'share-we-go-ui/Container';
import Typography from 'share-we-go-ui/Typography';
import Box from 'share-we-go-ui/Box';
import ProTip from './ProTip';
import Link from 'share-we-go-ui/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Server Rendering v4-beta example
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
