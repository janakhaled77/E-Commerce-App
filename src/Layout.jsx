import React, { useState, useEffect } from 'react';
import NavBar1 from './NavBar1';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    console.log('Mounting');
  }, []);

  return (
    <>
      <NavBar1 />
      <div className="container mx-auto max-w-screen-xl">
        <Outlet />
      </div>
      </>
  );
}
