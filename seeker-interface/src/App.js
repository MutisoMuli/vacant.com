import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';
import PropertyVerification from './components/PropertyVerification';
import ReviewSystem from './components/ReviewSystem';
import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

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
        <NotificationSystem />
        <PropertyVerification />
        <ReviewSystem />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
