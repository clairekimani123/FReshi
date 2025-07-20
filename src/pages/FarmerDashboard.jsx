import { Link } from 'react-router-dom';

export default function FarmerDashboard() {
  return (
    <div className="container mx-auto p-6 bg-white bg-opacity-95 rounded-xl shadow-xl min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Farmer Dashboard</h1>
      <p className="text-gray-700 mb-8 text-center">Manage your livestock and orders here.</p>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
        <Link
          to="/farmer/animals"
          className="px-6 py-3 bg-farmart-green text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          Manage Animals
        </Link>
        <Link
          to="/farmer/orders"
          className="px-6 py-3 bg-farmart-green text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
        >
          View Orders
        </Link>
      </div>
    </div>
  );
}