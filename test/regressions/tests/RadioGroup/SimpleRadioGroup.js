import React from 'react';
import FormControlLabel from 'share-we-go-ui/FormControlLabel';
import RadioGroup from 'share-we-go-ui/RadioGroup';
import Radio from 'share-we-go-ui/Radio';

export default function SimpleRadioGroup() {
  return (
    <div style={{ width: 100 }}>
      <RadioGroup value="home">
        <FormControlLabel value="home" control={<Radio />} label="Home" />
        <FormControlLabel value="work" control={<Radio />} label="Work" />
      </RadioGroup>
    </div>
  );
}
