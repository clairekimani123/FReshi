import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../features/cartSlice';

export default function AnimalCard({ animal, hideAddButton = false }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const inCart = items.some(item => item.animal.id === animal.id);

  return (
    <div className="border rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col bg-white bg-opacity-90">
      <img 
        src={animal.image_url || 'https://via.placeholder.com/300x200?text=Animal'} 
        alt={animal.name} 
        className="h-48 w-full object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800">{animal.name}</h3>
        <p className="text-gray-600 mt-2">Breed: {animal.breed}</p>
        <p className="text-gray-600">Age: {animal.age} months</p>
        <p className="text-gray-600">Location: {animal.location || 'N/A'}</p>
        <p className="text-gray-600">Rating: {animal.rating?.toFixed(1) || 'N/A'}</p>
        <div className="mt-auto pt-4">
          <span className="font-bold text-xl text-farmart-green">KES {animal.price}</span>
          {!hideAddButton && (
            <button
              onClick={() => inCart ? dispatch(removeFromCart(animal.id)) : dispatch(addToCart({ animalId: animal.id, quantity: 1 }))}
              className={`block w-full mt-3 py-3 rounded-lg text-white font-semibold transition-colors duration-200 ${
                inCart ? 'bg-red-500 hover:bg-red-600' : 'bg-farmart-green hover:bg-green-700'
              }`}
            >
              {inCart ? 'Remove from Cart' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}