const { Router } = require('express');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

const router = Router();

//--------- usuários ---------
router.get('/users', userController.list);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteuser);

//--------- products ---------
router.get('/product', productController.getAllProducts);
router.post('/product', productController.createProduct);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);

//--------- pedidos ---------
router.get('/order', orderController.getAllOrders);
router.post('/order', orderController.createOrder);
router.put('/order/:id', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

module.exports = { router };