import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="bg-white border-b border-orange" style={{ height: '72px' }}>
    <div className="container mx-auto flex justify-between items-center h-full">
      <Link to="/" className="flex items-center">
        <img
          src="https://res.cloudinary.com/dhbztjzkr/image/upload/v1722714234/Gold_Minimalist_Key_Real_Estate_Logo_2_izrzgf.png"
          alt="Vacant Logo"
          className="h-14 w-auto mr-2"
          style={{ width: '300px', height: 'auto' }}
        />
      </Link>
      <div className="space-x-4">
        <Link to="/" className="text-navy-blue hover:text-orange">Home</Link>
        <Link to="/form" className="text-navy-blue hover:text-orange">Add Property</Link>
        <Link to="/list" className="text-navy-blue hover:text-orange">View Properties</Link>
      </div>
    </div>
  </nav>
);

export default Header;
