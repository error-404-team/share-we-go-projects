import React from 'react';
import MenuItem from 'share-we-go-ui/MenuItem';
import Select from 'share-we-go-ui/Select';

export default function SelectOverflow() {
  return (
    <Select value={10} style={{ maxWidth: 100 }}>
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      <MenuItem value={10}>Tennnnnnn</MenuItem>
    </Select>
  );
}
