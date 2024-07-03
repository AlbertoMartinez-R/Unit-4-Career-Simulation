import express, { response } from 'express';
import { getMethods } from '../database/index.js';
import { request } from 'http';

const apiRouter = express.Router();

apiRouter.get('/user,', async (request, response, next) => {
    try {
        const user = await getMethods.user.getUser();

        response.send({ user });

    } catch (e) {
        next(e);
    }
});

apiRouter.post('/user', async (request, response, next) => {
    try {

    } catch (e) {
        next(e);
    }
});

apiRouter.delete('/user', async (request, response, next) => {
    try {

    } catch (e) {
        next(e);
    }
});



apiRouter.get('/products', async (request, response, next) => {
    try {
        const product = await getMethods.product.getProduct();

        response.send({ product });

    } catch (e) {
        next(e);
    }
});



apiRouter.get('/cart', async (request, response, next) => {

    try {
        const cart = await getMethods.cart.getCart();

        response.send({ cart });

    } catch (e) {
        next(e);
    }
});


apiRouter.post('/cart', async (request, response, next) => {
    try {

    } catch (e) {
        next(e);
    }
});

apiRouter.delete('/cart', async (request, response, next) => {
    try {

    } catch (e) {
        next(e);
    }
});

export default apiRouter;

