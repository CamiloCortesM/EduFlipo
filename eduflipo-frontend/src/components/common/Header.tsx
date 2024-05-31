import React from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import ClassIcon from '@mui/icons-material/Class';

import ListItemLink from '../specific/header/ListItemLink';
import { Logo } from '../specific/header/Logo';
import useDrawer from '../../hooks/useDrawer';

const Header: React.FC = () => {
  const { drawerOpen, toggleDrawer } = useDrawer();

  return (
    <div>
      <AppBar
        position="static"
        style={{
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: 'none',
          padding: '10px 4px',
        }}
      >
        <Toolbar>
          <Box display="flex" alignItems="center" style={{ flexGrow: 1 }}>
            <Logo />
            <Typography variant="h5" style={{ fontWeight: 700 }}>
              EduFliPO
            </Typography>
          </Box>
          <IconButton
            style={{
              color: '#EB213F',
              backgroundColor: '#FEC2C5',
              borderRadius: '8px',
              padding: '8px',
            }}
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            <ListItemLink
              to="/students"
              icon={<PeopleIcon />}
              primary="Students"
            />
            <ListItemLink
              to="/teachers"
              icon={<SchoolIcon />}
              primary="Teachers"
            />
            <ListItemLink
              to="/classes"
              icon={<ClassIcon />}
              primary="Classes"
            />
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Header;