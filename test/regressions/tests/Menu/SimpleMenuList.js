import React from 'react';
import Paper from 'share-we-go-ui/Paper';
import MenuList from 'share-we-go-ui/MenuList';
import MenuItem from 'share-we-go-ui/MenuItem';

export default function SimpleMenuList() {
  return (
    <Paper elevation={8}>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem selected>My Account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </MenuList>
    </Paper>
  );
}
