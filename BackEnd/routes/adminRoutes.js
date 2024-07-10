import express from 'express';
import { 
    seedDatabase, 
    getAllUsers, 
    getAllProducts, 
    getProductByIdController, 
    removeProductByIdController, 
    getOrderHistoryController, 
    cancelOrderController 
} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/seed', seedDatabase);
adminRouter.get('/users', getAllUsers);
adminRouter.get('/products', getAllProducts);
adminRouter.get('/products/:id', getProductByIdController);
adminRouter.delete('/products/:id', removeProductByIdController);
adminRouter.get('/orders', getOrderHistoryController);
adminRouter.delete('/orders/:id', cancelOrderController);

export default adminRouter;