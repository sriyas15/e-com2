// backend/data/products.js

const products = [
  {
    name: 'Modern Leather Sofa',
    images: [
      { public_id: 'sofa-1', url: '/images/sofa.jpeg' }
    ],
    description:
      'Upgrade your living room with this sleek and comfortable modern leather sofa. Perfect for relaxation and entertainment.',
    brand: 'Furniture World',
    category: 'Furniture',
    price: 899.99,
    stock: 15,
    ratings: 45,
    numOfReviews: 10,
  },
  {
    name: 'Wooden Dining Table Set',
    images: [
      { public_id: 'dining-1', url: '/images/wooden-dining.jpeg' }
    ],
    description:
      'Gather your family and friends around this elegant wooden dining table set. Crafted with high-quality materials for durability and style.',
    brand: 'Home Harmony',
    category: 'Furniture',
    price: 549.99,
    stock: 8,
    ratings: 45,
    numOfReviews: 6,
  },
  {
    name: 'Vintage Bookshelf',
    images: [
      { public_id: 'bookshelf-1', url: '/images/vintage-bookshelf.jpeg' }
    ],
    description:
      'Add a touch of nostalgia to your home with this vintage bookshelf. Ample storage space for books, decor, and more.',
    brand: 'Antique Designs',
    category: 'Furniture',
    price: 349.99,
    stock: 12,
    ratings: 40,
    numOfReviews: 8,
  },
  {
    name: 'Contemporary Coffee Table',
    images: [
      { public_id: 'coffee-table-1', url: '/images/coffee-table.jpeg' }
    ],
    description:
      'Enhance your living space with this stylish contemporary coffee table. Features a minimalist design with a functional storage shelf.',
    brand: 'Modern Living',
    category: 'Furniture',
    price: 199.99,
    stock: 0,
    ratings: 45,
    numOfReviews: 15,
  },
  {
    name: 'Comfortable Recliner Chair',
    images: [
      { public_id: 'recliner-1', url: '/images/recliner-chair.jpeg' }
    ],
    description:
      'Relax in ultimate comfort with this plush recliner chair. Perfect for lounging after a long day.',
    brand: 'Cozy Home',
    category: 'Furniture',
    price: 299.99,
    stock: 6,
    ratings: 40,
    numOfReviews: 4,
  },
  {
    name: 'Rustic Bedroom Dresser',
    images: [
      { public_id: 'dresser-1', url: '/images/bedroom-dresser.jpeg' }
    ],
    description:
      'Complete your bedroom decor with this charming rustic dresser. Ample storage space for clothing and accessories.',
    brand: 'Country Living',
    category: 'Furniture',
    price: 449.99,
    stock: 10,
    ratings: 40,
    numOfReviews: 7,
  },
];

export default products;
