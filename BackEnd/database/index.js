import { client, connectDataBase } from './db.js';
import { seedUsers, getUser, createUser, getUserByUsername } from '../models/user.js';
import { seedProducts, getProduct } from '../models/product.js';
import { seedCart, createCart, getCart } from '../models/cart.js';


const initDataBase = async (seed = false) => {
    try {

        await connectDataBase();

        if(seed){
            await seedUsers();
            await seedProducts();
            await seedCart();

            console.log('Seeded Successfully!');
        }

    } catch (e) {
        console.error('Failed to initiate Database!', e);
    } finally {
        client.end();
    }
};


export const getMethods = {
    user: {
        getUser,
        createUser,
        getUserByUsername
    },

    product: {
        getProduct,
    },

    cart: {
        createCart,
        getCart
    },
};


// initDataBase(true);