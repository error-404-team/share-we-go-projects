import React from 'react';
import MenuItem from 'share-we-go-ui/MenuItem';
import Select from 'share-we-go-ui/Select';

export default function SelectMissingValue() {
  return (
    <Select value={0}>
      <MenuItem value={10}>Ten</MenuItem>
    </Select>
  );
}
