import React from 'react';
import Input from 'share-we-go-ui/Input';
import InputLabel from 'share-we-go-ui/InputLabel';
import MenuItem from 'share-we-go-ui/MenuItem';
import FormHelperText from 'share-we-go-ui/FormHelperText';
import FormControl from 'share-we-go-ui/FormControl';
import Select from 'share-we-go-ui/Select';

export default function SelectAlignment() {
  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="age1">Age</InputLabel>
        <Select value="" input={<Input name="age1" id="age1" />}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="age2">year</InputLabel>
        <Select value={10} input={<Input name="year" id="age2" />}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <Input id="name-input" />
        <FormHelperText>Alignment with an input</FormHelperText>
      </FormControl>
    </div>
  );
}
