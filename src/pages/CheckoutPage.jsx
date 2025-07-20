
import Checkout from '../components/Checkout';

export default function CheckoutPage() {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/7c3161d6-81fa-43e3-9580-308d7acfcbbe/5b63a7b5-8422-4ae5-9f74-7ba3110a3a1d.png')`,
      }}
    >
      <Checkout />
    </div>
  );
}