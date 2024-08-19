import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';
import PropertyVerification from './components/PropertyVerification';
import ReviewSystem from './components/ReviewSystem';
import MapComponent from './components/MapComponent';
import PropertyList from './components/PropertyList';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Body isAuthenticated={isAuthenticated} handleLogin={handleLogin} user={user} />
        <MapComponent properties={properties} />
        <PropertyList properties={properties} />
        <NotificationSystem />
        <PropertyVerification />
        <ReviewSystem />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
