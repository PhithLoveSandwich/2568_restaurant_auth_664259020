import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { user, logout } = useAuthContext();

  const menuItems = [
    { name: 'Search', url: '/' },
    { name: 'Add restaurant', url: '/add' },
    { name: 'About Us', url: '/' },
  ];

  const handleLogout = () => {
    logout();
  // router might not be mounted around this component; use full navigation
  window.location.href = '/';
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow z-10">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link to={item.url}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">Grab Restaurant</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end flex gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm rounded-btn flex items-center gap-2">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                  <span>{(user.username || '').charAt(0).toUpperCase()}</span>
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm">Welcome,</span>
                <span className="text-primary font-semibold">{user.username}</span>
              </div>
            </label>
            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-3">
              <li><Link to="/profile">Profile</Link></li>
              <li><button className="text-left w-full" onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/signup" className="btn btn-outline btn-primary">Register</Link>
            <Link to="/login" className="btn btn-outline btn-secondary">Log In</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
