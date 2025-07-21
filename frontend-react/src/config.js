// Configuration for the frontend app
const config = {
  // API endpoints
  PRODUCT_API: import.meta.env.VITE_PRODUCT_API || 'http://localhost:5000',
  CART_API: import.meta.env.VITE_CART_API || 'http://localhost:5001',
  CHECKOUT_API: import.meta.env.VITE_CHECKOUT_API || 'http://localhost:5002',
  ORDER_API: import.meta.env.VITE_ORDER_API || 'http://localhost:5003',
  
  // Feature flags
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || false
};

export default config;