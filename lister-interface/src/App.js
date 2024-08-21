import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import PropertyForm from './components/PropertyForm';
import './styles.css';

function App() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/routes/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const addProperty = async (property) => {
    try {
      await axios.post('http://localhost:5000/routes/properties', property);
      fetchProperties();
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <Body />
        <PropertyForm onSubmit={addProperty} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
