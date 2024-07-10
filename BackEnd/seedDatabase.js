import { seedUsers } from './models/user.js';
import { seedProducts } from './models/product.js';
import { seedOrders } from './models/order.js';

const seedDatabase = async () => {
  await seedUsers();
  await seedProducts();
  await seedOrders();
  process.exit();
};

seedDatabase();