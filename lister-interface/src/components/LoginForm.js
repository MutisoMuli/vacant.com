// Example of LoginForm Component
import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({  email, password }),
      });
    
      if (response.ok) {
        const { token } = await response.json();
        // Save token in localStorage or cookies
        localStorage.setItem('token', token);
        onLogin(); 
      } else {
        // Handle login error
        const { error } = await response.json();
        setError(error);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
