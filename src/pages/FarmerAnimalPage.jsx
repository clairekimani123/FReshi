import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals, deleteAnimal } from '../features/animalsSlice';
import AnimalForm from '../components/AnimalForm';

export default function FarmerAnimalPage() {
  const dispatch = useDispatch();
  const { animals, loading } = useSelector((state) => state.animals);
  const [showForm, setShowForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);

  useEffect(() => {
    dispatch(fetchAnimals({ farmer: 'current' }));
  }, [dispatch]);

  const handleEdit = (animal) => {
    setEditingAnimal(animal);
    setShowForm(true);
  };

  return (
    <div className="container mx-auto p-6 bg-white bg-opacity-95 rounded-xl shadow-xl min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Manage Animals</h1>
      <button
        onClick={() => setShowForm(true)}
        className="mb-8 bg-farmart-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
      >
        Add New Animal
      </button>
      {showForm && (
        <AnimalForm
          animal={editingAnimal}
          onClose={() => {
            setShowForm(false);
            setEditingAnimal(null);
          }}
        />
      )}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {animals.map((animal) => (
            <div key={animal.id} className="relative">
              <AnimalCard animal={animal} hideAddButton={true} />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(animal)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteAnimal(animal.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}