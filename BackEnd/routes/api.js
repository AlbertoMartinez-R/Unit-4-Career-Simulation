import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRole,
  banUser,
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
  fetchUserProfile,
  updateUserProfile,
  fetchOrderHistory,
  processCheckout
} from '../controllers/userController.js';
import {
  getAllProductsController,
  getProductByIdController,
  removeProductByIdController,
  updateProductDetailsController,
  updateProductStatusController
} from '../controllers/productController.js';
import {
  createOrderController,
  getOrderHistoryController,
  cancelOrderController
} from '../controllers/orderController.js';
import {
  createCartController,
  getCartController,
  removeCartItemController,
  updateCartItemQuantityController
} from '../controllers/cartController.js';

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

apiRouter.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

apiRouter.get('/users', getAllUsers);
apiRouter.get('/users/:id', getUserById);
apiRouter.post('/users', createUser);
apiRouter.put('/users/:id/role', updateUserRole);
apiRouter.put('/users/:id/ban', banUser);
apiRouter.get('/users/:id/wishlist', fetchWishlist);
apiRouter.post('/users/:id/wishlist', addToWishlist);
apiRouter.delete('/users/:id/wishlist/:productId', removeFromWishlist);
apiRouter.get('/users/:id/profile', fetchUserProfile);
apiRouter.put('/users/:id/profile', updateUserProfile);
apiRouter.get('/users/:id/orders', fetchOrderHistory);
apiRouter.post('/users/:id/checkout', processCheckout);

apiRouter.get('/products', getAllProductsController);
apiRouter.get('/products/:id', getProductByIdController);
apiRouter.delete('/products/:id', removeProductByIdController);
apiRouter.put('/products/:id', updateProductDetailsController);
apiRouter.put('/products/:id/status', updateProductStatusController);

apiRouter.post('/order', createOrderController);
apiRouter.get('/orders', getOrderHistoryController);
apiRouter.delete('/order/:id', cancelOrderController);

apiRouter.post('/cart', createCartController);
apiRouter.get('/cart', getCartController);
apiRouter.delete('/cart/:id', removeCartItemController);
apiRouter.put('/cart/:id', updateCartItemQuantityController);

export default apiRouter;
