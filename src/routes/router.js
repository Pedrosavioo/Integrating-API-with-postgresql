const { Router } = require('express');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');

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

module.exports = { router };