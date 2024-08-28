// Body.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchFilters from './SearchFilters';
import PropertyMap from './PropertyMap';
import PropertyList from './PropertyList';
import Authentication from './Authentication';
import MessagingSystem from './MessagingSystem';
import AnalyticsDashboard from './AnalyticsDashboard';

const Body = ({ isAuthenticated, handleLogin, user }) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={
          <>
            <h1 className="text-3xl font-bold text-navy-blue-800 mb-4">Welcome to Vacant </h1>
            <p className="text-xl font-semibold text-orange-600 mb-8">Find vacant houses near you with ease</p>
            <SearchFilters />
            <PropertyMap />
          </>
        } />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/login" element={<Authentication onLogin={handleLogin} />} />
        <Route path="/messages" element={<MessagingSystem user={user} />} />
        <Route path="/dashboard" element={<AnalyticsDashboard user={user} />} />
      </Routes>
    </main>
  );
};

export default Body;
