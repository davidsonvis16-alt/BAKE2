import React, { useState } from 'react';
import { useAuth } from './AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await login(email, password);
    setLoading(false);
    if (error) {
      setError('Incorrect email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF3E7] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm space-y-5"
      >
        <div className="text-center mb-2">
          <h1 className="text-charcoal-lg text-2xl font-bold text-[#000000]">BakeMart Admin</h1>
          <p className="text-sm text-[#000000]/60 mt-1">Sign in to manage your menu</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-[#000000] mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#000000]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000000]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#000000] mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#000000]/20 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#000000]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#000000] hover:bg-neutral-800 text-white font-semibold py-2.5 rounded-full transition-colors disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};
