import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin'); // Redirect to the admin page if already logged in
      }
    };

    checkUserSession();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      navigate('/admin'); // Redirect to the admin page after successful login
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 px-3">
      <form onSubmit={handleLogin} className="bg-azure p-6 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center text-white">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-full mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-full mt-1"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full p-2 bg-old-gold text-black rounded-full hover:bg-dark-gold transition duration-300 hover:text-neutral-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
