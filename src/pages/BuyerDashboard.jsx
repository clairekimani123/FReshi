import { useSelector } from 'react-redux';
import AnimalCard from '../components/AnimalCard';

export default function BuyerDashboard() {
  const { items } = useSelector((state) => state.cart);
  const total = items.reduce((sum, item) => sum + item.animal.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6 bg-white bg-opacity-95 rounded-xl shadow-xl min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Your Dashboard</h1>
      <div className="mb-8">
        <p className="text-xl text-gray-700">Items in cart: {items.length}</p>
        <p className="text-xl text-gray-700">Total: KES {total.toFixed(2)}</p>
      </div>
      {items.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Cart Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map(item => (
              <AnimalCard key={item.id} animal={item.animal} hideAddButton={true} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}