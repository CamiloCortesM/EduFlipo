import { Outlet } from 'react-router-dom';
import Header from '../common/Header';

const Layout = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1, backgroundColor: '#eef2f6', padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
