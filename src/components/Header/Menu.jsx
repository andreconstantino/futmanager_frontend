import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';

export default function Menu() {
  return (
    <IconButton>
      <Badge>
        <MenuIcon color="primary" />
      </Badge>
    </IconButton>
  );
}