const router = require('express').Router();
const { addUser, login, deleteUser, updateUser, getUsers, addAdmin } = require('../models/userModel')
const { verifyToken, checkAdmin } = require('../authentication/auth')

router.post('/login', login);
router.post('/add', verifyToken, checkAdmin, addUser);
router.get('/', verifyToken, getUsers);
router.delete('/:id', verifyToken, checkAdmin, deleteUser);
router.put('/:id', verifyToken, checkAdmin, updateUser);
router.post('/newadmin', verifyToken, checkAdmin, addAdmin)

module.exports = router;