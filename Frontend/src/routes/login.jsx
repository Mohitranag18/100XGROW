import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const nav = useNavigate();

  const handleLogin = async () => {
    await loginUser(username, password);
  };

  const handleNavigate = () => {
    nav('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-700 mb-8">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-2">Username</label>
          <input
            type="text"
            placeholder="Your username here"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 text-sm mb-2">Password</label>
          <input
            type="password"
            placeholder="Your password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Login
        </button>
        <p
          onClick={handleNavigate}
          className="mt-4 text-sm text-gray-600 cursor-pointer hover:text-blue-500"
        >
          Don't have an account? Sign up
        </p>
      </div>
    </div>
  );
};

export default Login;
