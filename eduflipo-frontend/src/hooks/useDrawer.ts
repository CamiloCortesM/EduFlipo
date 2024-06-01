import { useState } from 'react';

// Custom hook to manage a drawer state
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
