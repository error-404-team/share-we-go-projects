import React from 'react';
import Avatar from 'share-we-go-ui/Avatar';
import Chip from 'share-we-go-ui/Chip';

export default function DeletableAvatarChip() {
  return <Chip avatar={<Avatar>MB</Avatar>} label="SvgIcon Chip" onDelete={() => {}} />;
}
