import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../features/cartSlice';
import AnimalCard from './AnimalCard';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);
  const total = items.reduce((sum, item) => sum + item.animal.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-95 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Cart</h2>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {items.map((item) => (
              <div key={item.id} className="relative">
                <AnimalCard animal={item.animal} hideAddButton={true} />
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-gray-800">Total: KES {total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-farmart-green text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}