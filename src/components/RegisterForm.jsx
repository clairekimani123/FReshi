import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFarmer, setIsFarmer] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register/', { username, password, is_farmer: isFarmer });
      const result = await dispatch(login({ username, password }));
      if (login.fulfilled.match(result)) {
        navigate(isFarmer ? '/farmer/animals' : '/buyer');
      }
    } catch (err) {
      setError('Registration failed. Username may already exist.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white bg-opacity-95 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Register</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isFarmer}
            onChange={(e) => setIsFarmer(e.target.checked)}
            className="h-5 w-5 text-farmart-green focus:ring-farmart-green"
          />
          <span className="text-gray-600">Register as Farmer</span>
        </label>
        <button
          onClick={handleSubmit}
          className="w-full bg-farmart-green text-white p-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Register
        </button>
      </div>
      <p className="mt-4 text-center text-gray-600">
        Already have an account? <Link to="/login" className="text-farmart-green hover:underline">Login</Link>
      </p>
    </div>
  );
}