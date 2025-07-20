import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/authSlice';
import { FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
  const { user, token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  const count = items.length;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-farmart-green shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">Farmart</Link>
        <div className="flex space-x-6 items-center">
          <Link to="/animals" className="text-white hover:text-green-200 transition-colors">Animals</Link>
          {user && user.groups?.some(g => g.name === 'Farmers') ? (
            <>
              <Link to="/farmer/animals" className="text-white hover:text-green-200 transition-colors">Manage Animals</Link>
              <Link to="/farmer/orders" className="text-white hover:text-green-200 transition-colors">Orders</Link>
              <button onClick={handleLogout} className="text-white hover:text-green-200 transition-colors">Logout</button>
            </>
          ) : (
            <>
              <Link to="/buyer" className="text-white hover:text-green-200 transition-colors">Dashboard</Link>
              {token ? (
                <button onClick={handleLogout} className="text-white hover:text-green-200 transition-colors">Logout</button>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-green-200 transition-colors">Login</Link>
                  <Link to="/register" className="text-white hover:text-green-200 transition-colors">Register</Link>
                </>
              )}
              <Link to="/cart" className="relative text-white hover:text-green-200 flex items-center">
                <FaShoppingCart className="mr-2" />
                <span>Cart</span>
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-farmart-green text-xs rounded-full px-2 py-1">
                    {count}
                  </span>
                )}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}