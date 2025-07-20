import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AnimalCard from '../components/AnimalCard';
import { addToCart } from '../features/cartSlice';

const mockStore = configureStore([]);

describe('AnimalCard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { token: 'mock-token' },
      cart: { items: [] },
    });
  });

  it('renders animal details and dispatches addToCart action', () => {
    const animal = {
      id: 1,
      name: 'Bessie',
      type: 'Cattle',
      breed: 'Angus',
      age: 12,
      price: 50000,
      location: 'Nairobi',
      rating: 4.5,
    };

    render(
      <Provider store={store}>
        <AnimalCard animal={animal} />
      </Provider>
    );

    expect(screen.getByText('Bessie')).toBeInTheDocument();
    expect(screen.getByText('Breed: Angus')).toBeInTheDocument();
    expect(screen.getByText('KES 50000')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Add to Cart'));
    const actions = store.getActions();
    expect(actions[0].type).toBe(addToCart.pending.type);
  });
});