/**
 * Mock API functions to use when backend services are unavailable
 */

// Get products from mock data
export const getProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(window.MOCK_PRODUCTS || []);
    }, 300);
  });
};

// Get cart from mock data
export const getCart = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(window.MOCK_CART || { items: [], total: 0 });
    }, 300);
  });
};

// Add item to cart
export const addToCart = async (item) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cart = window.MOCK_CART || { items: [], total: 0 };
      
      // Check if item already exists
      const existingItemIndex = cart.items.findIndex(i => i.product_id === item.product_id);
      
      if (existingItemIndex >= 0) {
        // Update quantity
        cart.items[existingItemIndex].quantity += item.quantity;
      } else {
        // Add new item
        cart.items.push(item);
      }
      
      // Update total
      cart.total = cart.items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      
      // Update global mock cart
      window.MOCK_CART = cart;
      
      resolve({ success: true });
    }, 300);
  });
};

// Clear cart
export const clearCart = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      window.MOCK_CART = { items: [], total: 0 };
      resolve({ success: true });
    }, 300);
  });
};

// Checkout
export const checkout = async (cart) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const orders = window.MOCK_ORDERS || { orders: [] };
      
      // Create new order
      const newOrder = {
        order_id: `ORD-${Date.now()}`,
        items: cart.items,
        total: cart.total,
        status: 'Confirmed',
        date: new Date().toISOString()
      };
      
      // Add to orders
      orders.orders.unshift(newOrder);
      
      // Update global mock orders
      window.MOCK_ORDERS = orders;
      
      resolve({ success: true, order: newOrder });
    }, 500);
  });
};

// Get orders
export const getOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock orders data from API:', window.MOCK_ORDERS);
      resolve(window.MOCK_ORDERS || { orders: [] });
    }, 300);
  });
};

// Clear orders
export const clearOrders = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      window.MOCK_ORDERS = { orders: [] };
      resolve({ success: true });
    }, 300);
  });
};