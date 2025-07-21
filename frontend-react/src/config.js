// Use mock data instead of API calls
const USE_MOCK_DATA = true;

// Default fallback URLs for local development
const DEFAULT_PRODUCT_API = 'http://localhost:5000';
const DEFAULT_CART_API = 'http://localhost:5001';
const DEFAULT_CHECKOUT_API = 'http://localhost:5002';
const DEFAULT_ORDER_API = 'http://localhost:5003';

const CONFIG = {
  USE_MOCK_DATA,
  PRODUCT_API: import.meta.env.VITE_PRODUCT_API || DEFAULT_PRODUCT_API,
  CART_API: import.meta.env.VITE_CART_API || DEFAULT_CART_API,
  CHECKOUT_API: import.meta.env.VITE_CHECKOUT_API || DEFAULT_CHECKOUT_API,
  ORDER_API: import.meta.env.VITE_ORDER_API || DEFAULT_ORDER_API,
};

// Log configuration on startup
console.log('App Configuration:', CONFIG);

export default CONFIG;
