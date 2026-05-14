import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CRMLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const success = await login(username, password);
    if (success) {
      navigate('/crm');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white rounded-lg shadow p-8 border border-gray-200">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#051A53] flex items-center justify-center mx-auto mb-4">
            <span className="text-yellow-400 font-bold">GH</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage website content</p>
        </div>
        
        {error && <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm border border-red-200 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#051A53]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#051A53]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-2.5 bg-[#051A53] hover:bg-[#051A53]/90 text-white font-medium rounded transition-colors mt-6">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
