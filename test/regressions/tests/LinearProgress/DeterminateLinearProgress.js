import React from 'react';
import LinearProgress from 'share-we-go-ui/LinearProgress';

export default function DeterminateLinearProgress() {
  return (
    <LinearProgress
      variant="determinate"
      value={60}
      style={{
        width: 150,
      }}
    />
  );
}
