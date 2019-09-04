import React from 'react';
import Icon from 'share-we-go-ui/Icon';
import ListItem from 'share-we-go-ui/ListItem';
import ListItemText from 'share-we-go-ui/ListItemText';
import ListItemIcon from 'share-we-go-ui/ListItemIcon';

export default function IconListItem() {
  return (
    <div style={{ backgroundColor: '#fff', width: 300 }}>
      <ListItem>
        <ListItemIcon>
          <Icon>phone</Icon>
        </ListItemIcon>
        <ListItemText primary="Icon" />
      </ListItem>
      <ListItem>
        <ListItemText inset primary="Inset" secondary="Secondary" />
      </ListItem>
      <ListItem dense>
        <ListItemIcon>
          <Icon>phone</Icon>
        </ListItemIcon>
        <ListItemText primary="Icon" />
      </ListItem>
      <ListItem dense>
        <ListItemText inset primary="Inset" secondary="Secondary" />
      </ListItem>
      <ListItem selected>
        <ListItemIcon>
          <Icon>phone</Icon>
        </ListItemIcon>
        <ListItemText primary="Icon" />
      </ListItem>
    </div>
  );
}
