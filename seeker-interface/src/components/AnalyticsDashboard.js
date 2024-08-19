import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AnalyticsDashboard({ user }) {
  const [analytics, setAnalytics] = useState({
    propertyViews: [],
    inquiries: [],
    bookings: []
  });

  useEffect(() => {
    if (user) {
      fetchAnalytics();
    }
  }, [user]);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/analytics');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h2>
      <div className="space-y-8">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Property Views</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.propertyViews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Placeholder for Inquiries chart */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Inquiries</h3>
          <p className="text-gray-600">Inquiries chart to be implemented</p>
        </div>
        
        {/* Placeholder for Bookings chart */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Bookings</h3>
          <p className="text-gray-600">Bookings chart to be implemented</p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;