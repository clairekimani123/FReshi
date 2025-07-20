import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../features/ordersSlice';
import OrderList from '../components/OrderList';

export default function FarmerOrderPage() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6 bg-white bg-opacity-95 rounded-xl shadow-xl min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Manage Orders</h1>
      {loading ? <p className="text-center text-gray-600">Loading...</p> : <OrderList orders={orders} />}
    </div>
  );
}