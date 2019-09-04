import React from 'react';
import ListItem from 'share-we-go-ui/ListItem';
import ListItemText from 'share-we-go-ui/ListItemText';

export default function SimpleListItem() {
  return (
    <div style={{ backgroundColor: '#fff', width: 300 }}>
      <ListItem>
        <ListItemText primary="Primary" />
      </ListItem>
      <ListItem>
        <ListItemText primary="Primary" secondary="Secondary" />
      </ListItem>
      <ListItem dense>
        <ListItemText primary="Primary" />
      </ListItem>
      <ListItem dense>
        <ListItemText primary="Primary" secondary="Secondary" />
      </ListItem>
      <ListItem selected>
        <ListItemText primary="Primary" />
      </ListItem>
    </div>
  );
}
