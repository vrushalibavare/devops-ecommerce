// Mock data for offline development
window.MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Stylish Handbag",
    price: 49.99,
    image: "handbag.jpg",
    description: "A fashionable handbag with multiple compartments and elegant design. Perfect for both casual and formal occasions.",
    features: [
      "Premium synthetic leather",
      "Multiple interior pockets",
      "Adjustable shoulder strap",
      "Metal hardware accents",
      "Water-resistant lining"
    ]
  },
  {
    id: 2,
    name: "Smartphone Pro",
    price: 799.99,
    image: "mobilephone.jpg",
    description: "Latest smartphone with advanced features including high-resolution camera, fast processor, and all-day battery life.",
    features: [
      "6.7-inch OLED display",
      "Triple camera system",
      "5G connectivity",
      "All-day battery life",
      "Water and dust resistant"
    ]
  },
  {
    id: 3,
    name: "Designer Sunglasses",
    price: 99.99,
    image: "sunglasses.jpg",
    description: "Trendy sunglasses with UV protection and polarized lenses. Lightweight frame with durable construction.",
    features: [
      "100% UV protection",
      "Polarized lenses",
      "Scratch-resistant coating",
      "Lightweight frame",
      "Includes protective case"
    ]
  }
];

window.MOCK_CART = {
  items: [],
  total: 0
};

window.MOCK_ORDERS = {
  orders: [
    {
      order_id: "ORD-1234567",
      date: "2023-11-15T10:30:00Z",
      status: "Delivered",
      total: 189.98,
      items: [
        {
          product_id: 1,
          name: "Stylish Handbag",
          price: 59.99,
          quantity: 1,
          image: "handbag.jpg"
        },
        {
          product_id: 3,
          name: "Designer Sunglasses",
          price: 129.99,
          quantity: 1,
          image: "sunglasses.jpg"
        }
      ]
    },
    {
      order_id: "ORD-7654321",
      date: "2023-10-28T14:45:00Z",
      status: "Processing",
      total: 899.99,
      items: [
        {
          product_id: 2,
          name: "Smartphone Pro",
          price: 899.99,
          quantity: 1,
          image: "mobilephone.jpg"
        }
      ]
    }
  ]
};