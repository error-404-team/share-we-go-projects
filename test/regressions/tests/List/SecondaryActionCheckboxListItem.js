import React from 'react';
import List from 'share-we-go-ui/List';
import ListItem from 'share-we-go-ui/ListItem';
import ListItemText from 'share-we-go-ui/ListItemText';
import ListItemSecondaryAction from 'share-we-go-ui/ListItemSecondaryAction';
import Checkbox from 'share-we-go-ui/Checkbox';

export default function SecondaryActionCheckboxListItem() {
  return (
    <div style={{ backgroundColor: '#fff', width: 300 }}>
      <List>
        <ListItem button>
          <ListItemText primary="Primary" />
          <ListItemSecondaryAction>
            <Checkbox />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button dense>
          <ListItemText primary="Primary" />
          <ListItemSecondaryAction>
            <Checkbox />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button selected>
          <ListItemText primary="Primary" />
          <ListItemSecondaryAction>
            <Checkbox />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
