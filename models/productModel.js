const Product = require('../schemas/productSchema');

exports.createNewProduct = async (req, res) => {

  const { title, imgURL, description, price } = req.body;

  if(!title || !imgURL || !description || !price ) {
    return res.status(400).json({ message: 'You need to enter all the fields' })
  }

  const product = await Product.create({ title, imgURL, description, price })

  if(!product) {
    return res.status(500).json({ message: 'Something went wrong when creating the product' })
  }

  res.status(201).json(product)

}

exports.getProducts = async (req, res) => {
  try {  
    const products = await Product.find()
    res.status(200).json(products)

  } catch (err) {
    res.status(500).json({ message: 'Something went wrong when fetching the product' })
  }
}

// Get product by id
exports.getProductById = async (req, res) => {

  const product = await Product.findById(req.params.id)

  if(!product) {
    return res.status(404).json({ message: 'Could not fint that product' })
  }

  res.status(200).json(product)

}

// Get product by user
exports.getProductByUser = async (req, res) => {

  const product = await Product.find({ user: req.params.id })

  res.status(200).json(product)

}

// Update product
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if(!product) {
    return res.status(404).json({ message: 'Could not find that product' })
  }
  res.status(200).json(product)
}

// Delete product
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if(!product) {
    return res.status(404).json({ message: 'Could not find that product' })
  }
  res.status(200).json(product)
}