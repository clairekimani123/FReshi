
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/7c3161d6-81fa-43e3-9580-308d7acfcbbe/5b63a7b5-8422-4ae5-9f74-7ba3110a3a1d.png')`,
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-farmart-green">Farmart Marketplace</h1>
        <p className="mb-8 text-gray-700 text-lg">Discover quality livestock from local farmers!</p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/animals" 
            className="px-6 py-3 bg-farmart-green text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-lg font-semibold"
          >
            Browse Animals
          </Link>
          <Link 
            to="/cart" 
            className="px-6 py-3 border-2 border-farmart-green text-farmart-green rounded-lg hover:bg-green-100 transition-colors duration-200 text-lg font-semibold"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}