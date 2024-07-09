import express from 'express';
import { getUserByUsername, createUser, getUser } from '../models/user.js';
import { getCart, createCart, removeCartItem } from '../models/cart.js';
import { getProducts, getProductById, removeProductById } from '../models/product.js';
import { createOrder, getOrderHistory, cancelOrder } from '../models/order.js';
import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

const secretJwt = process.env.JWT_SECRET || 'superSecret';

const apiRouter = express.Router();

// Root route
apiRouter.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Test route
apiRouter.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Login route
apiRouter.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, username: user.username, roles: user.roles },
        secretJwt,
        { expiresIn: '1w' }
      );
      res.send({ message: 'Successfully Logged In!', token });
    } else {
      res.status(401).send({ message: 'Username or Password did not match!' });
    }
  } catch (e) {
    console.error('Failed to Login!', e);
    next(e);
  }
});

// Register route
apiRouter.post('/register', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const newUser = await createUser({ username, password });
    res.status(201).send({ message: 'User created successfully!', user: newUser });
  } catch (e) {
    next(e);
  }
});

// // Middleware to verify JWT
// apiRouter.use((req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, secretJwt, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// });

// Protected admin route
apiRouter.get('/admin', (req, res) => {
  if (req.user && req.user.roles.includes('admin')) {
    res.send('Welcome Admin');
  } else {
    res.status(403).send('Forbidden');
  }
});

// Get users route
apiRouter.get('/users', async (req, res, next) => {
  try {
    const users = await getUser();
    res.send({ users });
  } catch (e) {
    next(e);
  }
});

// Get products route
apiRouter.get('/products', async (req, res, next) => {
  try {
    const products = await getProducts();
    res.send({ products });
  } catch (e) {
    next(e);
  }
});

// Get product details route
apiRouter.get('/products/:id', async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.send({ product });
  } catch (e) {
    next(e);
  }
});

// Remove product route
apiRouter.delete('/products/:id', async (req, res, next) => {
  try {
    const removedProduct = await removeProductById(req.params.id);
    res.send({ message: 'Product removed successfully!', product: removedProduct });
  } catch (e) {
    next(e);
  }
});

// Get cart route
apiRouter.get('/cart', async (req, res, next) => {
  try {
    const cart = await getCart();
    res.send({ cart });
  } catch (e) {
    next(e);
  }
});

// Create cart route
apiRouter.post('/cart', async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const newCart = await createCart({ productId, quantity });
    res.status(201).send({ message: 'Created Your Cart!', cart: newCart });
  } catch (e) {
    next(e);
  }
});

// Remove item from cart route
apiRouter.delete('/cart/:id', async (req, res, next) => {
  try {
    await removeCartItem(req.params.id);
    res.send({ message: 'Item removed from cart!' });
  } catch (e) {
    next(e);
  }
});

// Create order route
apiRouter.post('/order', async (req, res, next) => {
  const { userId, cartItems } = req.body;
  try {
    const newOrder = await createOrder({ userId, cartItems });
    res.status(201).send({ message: 'Order created successfully!', order: newOrder });
  } catch (e) {
    next(e);
  }
});

// Get order history route
apiRouter.get('/orders', async (req, res, next) => {
  try {
    const orders = await getOrderHistory(req.user.id);
    res.send({ orders });
  } catch (e) {
    next(e);
  }
});

// Cancel order route
apiRouter.delete('/order/:id', async (req, res, next) => {
  try {
    await cancelOrder(req.params.id);
    res.send({ message: 'Order cancelled successfully!' });
  } catch (e) {
    next(e);
  }
});

export default apiRouter;