import { seedUsers } from './models/user.js';

const seedDatabase = async () => {
    await seedUsers();
    process.exit();
};

seedDatabase();