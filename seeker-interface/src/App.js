import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from './redux/actions/propertyActions';
import Header from './components/Header';
import PropertyMap from './components/PropertyMap';
import PropertyList from './components/PropertyList';
import Footer from './components/Footer';
import './styles.css';

function App() {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(fetchProperties()); // Fetch properties on component mount
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<PropertyMap />} />
            <Route path="/properties" element={<PropertyList properties={properties} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
