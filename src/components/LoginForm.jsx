import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));
    if (login.fulfilled.match(result)) {
      navigate(result.payload.user.groups.some(g => g.name === 'Farmers') ? '/farmer/animals' : '/buyer');
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white bg-opacity-95 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
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
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-farmart-green text-white p-4 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-semibold"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      <p className="mt-4 text-center text-gray-600">
        Don't have an account? <Link to="/register" className="text-farmart-green hover:underline">Register</Link>
      </p>
    </div>
  );
}