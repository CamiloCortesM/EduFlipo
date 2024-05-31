import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLinkItem } from './NavLinkItem';

type ListItemLinkProps = {
  to: string;
  icon: JSX.Element;
  primary: string;
};

const ListItemLink: React.FC<ListItemLinkProps> = ({ to, icon, primary }) => (
  <ListItem disablePadding>
    <NavLinkItem to={to}>
      <ListItemButton>
        <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </NavLinkItem>
  </ListItem>
);

export default ListItemLink;
