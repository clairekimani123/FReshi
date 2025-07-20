import { useDispatch } from 'react-redux';
import { confirmOrder, rejectOrder } from '../features/ordersSlice';

export default function OrderList({ orders }) {
  const dispatch = useDispatch();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white bg-opacity-95 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Your Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-6 rounded-lg bg-gray-50 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">{order.animal.name} ({order.animal.breed})</h3>
              <p className="text-gray-600">Quantity: {order.quantity}</p>
              <p className="text-gray-600">Total: KES {order.total_price}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              {order.status === 'Pending' && (
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => dispatch(confirmOrder(order.id))}
                    className="bg-farmart-green text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => dispatch(rejectOrder(order.id))}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}