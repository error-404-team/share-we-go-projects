import React from 'react';
import DialogActions from 'share-we-go-ui/DialogActions';
import DialogContent from 'share-we-go-ui/DialogContent';
import DialogContentText from 'share-we-go-ui/DialogContentText';
import DialogTitle from 'share-we-go-ui/DialogTitle';
import Paper from 'share-we-go-ui/Paper';
import Button from 'share-we-go-ui/Button';

export default function AlertDialog() {
  return (
    <Paper
      elevation={8}
      style={{
        width: 300,
      }}
    >
      <DialogTitle>{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Disagree</Button>
        <Button color="primary">Agree</Button>
      </DialogActions>
    </Paper>
  );
}
