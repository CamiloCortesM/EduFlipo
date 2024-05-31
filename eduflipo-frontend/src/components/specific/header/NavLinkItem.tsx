import React from 'react';
import { NavLink } from 'react-router-dom';

type NavLinkItemProps = {
  to: string;
  children: JSX.Element;
};

export const NavLinkItem: React.FC<NavLinkItemProps> = ({ to, children }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      textDecoration: 'none',
      width: '100%',
      margin: '2px 10px',
      color: isActive ? '#FD2848' : 'inherit',
      backgroundColor: isActive ? '#fedadc' : 'white',
    })}
  >
    {children}
  </NavLink>
);
