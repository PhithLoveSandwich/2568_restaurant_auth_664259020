import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
