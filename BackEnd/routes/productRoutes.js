import express from 'express';
import { 
    getAllProductsController, 
    getProductByIdController, 
    removeProductByIdController, 
    updateProductDetailsController, 
    updateProductStatusController 
} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/', getAllProductsController);
productRouter.get('/:id', getProductByIdController);
productRouter.delete('/:id', removeProductByIdController);
productRouter.put('/:id', updateProductDetailsController);
productRouter.put('/:id/status', updateProductStatusController);

export default productRouter;