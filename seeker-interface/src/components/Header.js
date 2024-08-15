import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center" style={{ height: '100px' }}>
        <img 
          src="https://res.cloudinary.com/dhbztjzkr/image/upload/v1722714234/Gold_Minimalist_Key_Real_Estate_Logo_2_izrzgf.png" 
          alt="Vacant Logo" 
          className="h-12 w-auto"
          style={{ width: '300px', height: 'auto' }}
        />
        <nav className="space-x-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <Link to="/properties" className="text-blue-600 hover:text-blue-800">View Properties</Link>
          {isAuthenticated ? (
            <>
              <Link to="/messages" className="text-blue-600 hover:text-blue-800">Messages</Link>
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">Dashboard</Link>
              <button onClick={onLogout} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logout</button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
