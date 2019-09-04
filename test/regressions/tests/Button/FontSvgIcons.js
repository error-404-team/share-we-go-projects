import React from 'react';
import Fab from 'share-we-go-ui/Fab';
import IconButton from 'share-we-go-ui/IconButton';
import DeleteIcon from 'share-we-go-icons/Delete';
import Icon from 'share-we-go-ui/Icon';

export default function FontSvgIcons() {
  return (
    <div>
      <Fab color="primary">
        <DeleteIcon />
      </Fab>
      <Fab color="primary">
        <Icon>delete_icon</Icon>
      </Fab>
      <IconButton>
        <DeleteIcon />
      </IconButton>
      <IconButton>
        <Icon>delete_icon</Icon>
      </IconButton>
    </div>
  );
}
