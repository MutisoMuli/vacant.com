import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import Home from './components/Home';
import PropertyForm from './components/PropertyForm';
import PropertyList from './components/PropertyList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './styles.css';

function App() {
  const [properties, setProperties] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, verify token with the server here
      setIsAuthenticated(true);
    }
  }, []);

  const addProperty = (property) => {
    setProperties([...properties, property]);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header onLogout={handleLogout} />
        <Body>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/form"
              element={isAuthenticated ? <PropertyForm onSubmit={addProperty} /> : <Navigate to="/login" />}
            />
            <Route
              path="/list"
              element={isAuthenticated ? <PropertyList properties={properties} /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!isAuthenticated ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!isAuthenticated ? <SignupForm /> : <Navigate to="/" />}
            />
          </Routes>
        </Body>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
