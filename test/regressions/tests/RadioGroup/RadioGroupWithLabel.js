import React from 'react';
import FormLabel from 'share-we-go-ui/FormLabel';
import FormControl from 'share-we-go-ui/FormControl';
import FormControlLabel from 'share-we-go-ui/FormControlLabel';
import RadioGroup from 'share-we-go-ui/RadioGroup';
import Radio from 'share-we-go-ui/Radio';

export default function RadioGroupWithLabel() {
  return (
    <FormControl style={{ width: 100 }}>
      <FormLabel>Location</FormLabel>
      <RadioGroup value="home">
        <FormControlLabel value="home" control={<Radio />} label="Home" />
        <FormControlLabel value="work" control={<Radio />} label="Work" />
      </RadioGroup>
    </FormControl>
  );
}
