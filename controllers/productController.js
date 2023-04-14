const router = require('express').Router();
const { createNewProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../models/productModel')
const { verifyToken, checkAdmin } = require('../authentication/auth')

router.post('/', verifyToken, createNewProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, checkAdmin, deleteProduct);

module.exports = router;

