import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store';
import App from './App';
import AnimalListPage from './pages/AnimalListPage';
import CartPage from './pages/CartPage';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CheckoutPage from './pages/CheckoutPage';
import FarmerAnimalPage from './pages/FarmerAnimalPage';
import FarmerOrderPage from './pages/FarmerOrderPage';
import Navbar from './components/Navbar';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/animals" element={<AnimalListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/farmer/animals" element={<FarmerAnimalPage />} />
        <Route path="/farmer/orders" element={<FarmerOrderPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);