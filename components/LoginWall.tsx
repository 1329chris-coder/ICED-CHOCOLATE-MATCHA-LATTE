'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PASSWORD = 'Christ29'; // Change this to your desired password

export default function LoginWall({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = localStorage.getItem('portfolio_auth') === 'true';
    setAuthenticated(isAuth);
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      localStorage.setItem('portfolio_auth', 'true');
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-black">Loading...</div>;
  }

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full max-w-md p-8 space-y-8 bg-black border border-gold/30 rounded-lg">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-serif font-bold text-gold">Portfolio Access</h2>
            <p className="mt-2 text-white/80">
              This is a protected portfolio piece by Chris Web Developer
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 border border-gold/30 bg-black/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="Enter portfolio password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-gold bg-gold/10 hover:bg-gold/20 text-gold rounded-md focus:outline-none transition duration-150"
              >
                View Portfolio
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-white/60">
              Request access by contacting me through LinkedIn
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
