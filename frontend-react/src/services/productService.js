export const getAllProducts = async () => {
  // This should point to your actual backend API
  return [
    {
      id: 1,
      name: "Sunglasses",
      description: "Stylish UV-protected sunglasses",
      price: 99.99,
      image: "/src/assets/sunglasses.jpg",
    },
    {
      id: 2,
      name: "Mobile Phone",
      description: "Latest-gen smartphone with great features",
      price: 699.99,
      image: "/src/assets/mobilephone.jpg",
    },
    {
      id: 3,
      name: "Handbag",
      description: "Elegant handbag for everyday use",
      price: 149.99,
      image: "/src/assets/handbag.jpg",
    },
  ];
};
