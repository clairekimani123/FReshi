import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginForm from '../components/LoginForm';
import { login } from '../features/authSlice';

const mockStore = configureStore([]);

describe('LoginForm', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { loading: false, error: null },
    });
  });

  it('renders login form and dispatches login action', () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpass123' } });
    fireEvent.click(screen.getByText('Login'));

    const actions = store.getActions();
    expect(actions[0].type).toBe(login.pending.type);
    expect(actions[0].meta.arg).toEqual({ username: 'testuser', password: 'testpass123' });
  });
});