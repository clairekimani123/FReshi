import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimals } from '../features/animalsSlice';
import AnimalCard from '../components/AnimalCard';

export default function AnimalListPage() {
  const dispatch = useDispatch();
  const { animals, loading } = useSelector((state) => state.animals);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ type: '', breed: '', age: '' });

  useEffect(() => {
    dispatch(fetchAnimals({ search, ...filters }));
  }, [dispatch, search, filters]);

  const filteredAnimals = animals.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) &&
    (filters.type ? a.type === filters.type : true) &&
    (filters.breed ? a.breed.toLowerCase().includes(filters.breed.toLowerCase()) : true) &&
    (filters.age ? a.age === parseInt(filters.age) : true)
  );

  return (
    <div className="container mx-auto p-6 bg-white bg-opacity-95 rounded-xl shadow-xl min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Farmart Marketplace</h1>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search animals…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <select
          name="type"
          value={filters.type}
          onChange={e => setFilters({ ...filters, type: e.target.value })}
          className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        >
          <option value="">All Types</option>
          <option value="Cattle">Cattle</option>
          <option value="Goat">Goat</option>
          <option value="Sheep">Sheep</option>
          <option value="Pig">Pig</option>
        </select>
        <input
          name="breed"
          placeholder="Breed"
          value={filters.breed}
          onChange={e => setFilters({ ...filters, breed: e.target.value })}
          className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
        <input
          name="age"
          type="number"
          placeholder="Age (months)"
          value={filters.age}
          onChange={e => setFilters({ ...filters, age: e.target.value })}
          className="p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-farmart-green text-gray-700"
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAnimals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </div>
  );
}