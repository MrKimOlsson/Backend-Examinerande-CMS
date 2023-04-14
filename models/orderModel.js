const Order = require('../schemas/orderSchema');


exports.createNewOrder = async (req, res) => {

    const { orderList } = req.body;
  
    if(!orderList ) {
      return res.status(400).json({ message: 'You need to enter all the fields' })
    }
  
    const order = await Order.create({ orderList, user: req.userId })
  
    if(!order) {
      return res.status(500).json({ message: 'Something went wrong when creating the order' })
    }
  
    res.status(201).json(order)
}


exports.getOrders = async (req, res) => {
try {  
    const order = await Order.find().populate({
      path: 'user orderList.product',
      select: '_id firstName lastName email adress title price imgURL'
    })
    res.status(200).json(order)
  } catch (err) {
      res.status(500).json({ message: 'Something went wrong when fetching the order' })
  }
}


// exports.getOrderByUser = async (req, res) => {


//   res.status(200).json(orders)
// }

exports.getOrderByUser = async (req, res) => {

  const orders = await Order.find({ user: req.userId }).populate({
    path: 'user',
    select: '_id firstName lastName email adress'
  })

  res.status(200).json(orders)
}
 

exports.updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if(!order) {
    return res.status(404).json({ message: 'Could not find that order' })
  }
  res.status(200).json(order)
}


exports.deleteOrder = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id)
  if(!order) {
    return res.status(404).json({ message: 'Could not find that order' })
  }
  res.status(200).json(order)
}