import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyMap from './components/PropertyMap';
import PropertyList from './components/PropertyList';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Property Seeker Interface</h1>
        <Routes>
          <Route exact path="/" element={<PropertyMap />} />
          <Route path="/list" element={<PropertyList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
