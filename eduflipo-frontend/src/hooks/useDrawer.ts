import { useState } from 'react';

const useDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return {
    drawerOpen,
    toggleDrawer,
  };
};

export default useDrawer;
