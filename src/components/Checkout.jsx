import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkoutCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const [paymentDetails, setPaymentDetails] = useState({ card: '', expiry: '', cvv: '' });
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.animal.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(checkoutCart());
    alert('Payment successful! Order placed.');
    navigate('/buyer');
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white bg-opacity-95 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Checkout</h2>
      <p className="text-gray-600 mb-6 text-center">Total: KES {total.toFixed(2)}</p>
      {loading ? (
        <p className="text-center text-gray-600">Processing...</p>
      ) : (
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Card Number"
            value={paymentDetails.card}
            onChange={(e) => setPaymentDetails({ ...paymentDetails, card: e.target.value })}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
          />
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Expiry (MM/YY)"
              value={paymentDetails.expiry}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
              className="w-1/2 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
            />
            <input
              type="text"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
              className="w-1/2 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-farmart-green text-white p-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
}