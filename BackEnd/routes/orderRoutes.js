import express from 'express';
import { 
    createOrderController, 
    getOrderHistoryController, 
    cancelOrderController 
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/', createOrderController);
orderRouter.get('/', getOrderHistoryController);
orderRouter.delete('/:id', cancelOrderController);

export default orderRouter;