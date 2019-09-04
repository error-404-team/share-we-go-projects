import React from 'react';
import TextField from 'share-we-go-ui/TextField';

export default function TextFieldRequired() {
  return (
    <div>
      <TextField required label="Foo" />
      <TextField required label="Foo" value="Hello world" />
    </div>
  );
}
