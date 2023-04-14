const router = require('express').Router();
const { createNewOrder, getOrders, updateOrder, deleteOrder, getOrderByUser } = require('../models/orderModel')
const { verifyToken, checkAdmin } = require('../authentication/auth')

// Create new order
router.post('/', verifyToken, createNewOrder);
router.get('/', getOrders);
router.put('/:id', verifyToken, checkAdmin, updateOrder);
router.delete('/:id', verifyToken, checkAdmin, deleteOrder);
// router.get('/user/:id', verifyToken, verifyUser, getOrderByUser);
router.get('/user/', verifyToken, getOrderByUser);

module.exports = router;