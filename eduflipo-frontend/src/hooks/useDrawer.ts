import { useState } from 'react';

// Define the type for the drawer state
interface DrawerState {
  drawerOpen: boolean;
}

// Custom hook to manage a drawer state
const useDrawer = (): DrawerState & { toggleDrawer: () => void } => {
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
