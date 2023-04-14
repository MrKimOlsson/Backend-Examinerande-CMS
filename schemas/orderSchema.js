const mongoose = require('mongoose');
const { Schema } = mongoose;

const rowSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  amount: { type: Number }

})

const orderSchema = new Schema({
  orderList:      { type: [rowSchema], required: true },
  user:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('Order', orderSchema)