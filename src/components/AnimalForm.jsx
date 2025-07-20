
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnimal, updateAnimal } from '../features/animalsSlice';

export default function AnimalForm({ animal = null, onClose }) {
  const [formData, setFormData] = useState({
    name: animal?.name || '',
    type: animal?.type || 'Cattle',
    breed: animal?.breed || '',
    age: animal?.age || '',
    price: animal?.price || '',
    location: animal?.location || '',
    rating: animal?.rating || '',
    description: animal?.description || '',
  });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (animal) {
      await dispatch(updateAnimal({ id: animal.id, ...formData }));
    } else {
      await dispatch(addAnimal(formData));
    }
    onClose();
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white bg-opacity-95 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">{animal ? 'Edit Animal' : 'Add Animal'}</h2>
      <div className="space-y-6">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        >
          <option value="Cattle">Cattle</option>
          <option value="Goat">Goat</option>
          <option value="Sheep">Sheep</option>
          <option value="Pig">Pig</option>
        </select>
        <input
          type="text"
          placeholder="Breed"
          value={formData.breed}
          onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <input
          type="number"
          placeholder="Age (months)"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <input
          type="number"
          placeholder="Price (KES)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        ></textarea>
        <div className="flex space-x-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-farmart-green text-white p-4 rounded-lg hover:bg-green-700 transition-colors font-semibold"
          >
            {animal ? 'Update' : 'Add'}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}