const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/orders', require('./controllers/orderController'))
app.use('/api/users', require('./controllers/userController'))
app.use('/api/products', require('./controllers/productController'))

module.exports = app;