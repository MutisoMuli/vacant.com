import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1 className="text-4xl font-bold mb-4 text-navy-blue">Welcome to Vacant Property Manager</h1>
    <p className="text-xl mb-8 text-navy-blue">Manage your properties with ease</p>
    <div className="space-x-4">
      <Link to="/form" className="bg-navy-blue hover:bg-navy-blue-light text-white font-bold py-2 px-4 rounded">
        Add Property
      </Link>
      <Link to="/list" className="bg-navy-blue hover:bg-navy-blue-light text-white font-bold py-2 px-4 rounded">
        View Properties
      </Link>
    </div>
  </div>
);

export default Home;
