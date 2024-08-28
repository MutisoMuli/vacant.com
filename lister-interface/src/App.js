// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import Home from './components/Home';
import PropertyForm from './components/PropertyForm';
import PropertyList from './components/PropertyList';
import './styles.css';

function App() {
  const [properties, setProperties] = useState([]);

  const addProperty = (property) => {
    setProperties([...properties, property]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <Body>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<PropertyForm onSubmit={addProperty} />} />
            <Route path="/list" element={<PropertyList properties={properties} />} />
          </Routes>
        </Body>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
