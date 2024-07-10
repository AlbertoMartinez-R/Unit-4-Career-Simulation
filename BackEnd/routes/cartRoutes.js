import express from 'express';
import { 
    createCartController, 
    getCartController, 
    removeCartItemController, 
    updateCartItemQuantityController 
} from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/', createCartController);
cartRouter.get('/', getCartController);
cartRouter.delete('/:id', removeCartItemController);
cartRouter.put('/:id', updateCartItemQuantityController);

export default cartRouter;