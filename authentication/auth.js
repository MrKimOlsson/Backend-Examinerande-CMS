const jwt = require('jsonwebtoken');
require('dotenv').config();
const Admin = require('../schemas/adminSchema')
const User = require('../schemas/userSchema')

const secretKey = process.env.SECRET_KEY;


exports.generateToken = (user) => {

  const admin = Admin.findOne({ adminId: user._id })
  
  const payload = { _id: user._id }
  if(admin) {
    payload.admin = true
  }

  return jwt.sign(payload, secretKey, { expiresIn: '1d' })
}

  
exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.userId = jwt.verify(token, secretKey)._id;
    next();
  } catch {
    return res.status(401).json({
      message: 'You need to login first'
    })
  }
}


exports.checkAdmin = async (req, res, next) => {

  const admin = await Admin.findOne({ adminId: req.userId })

  if(!admin){
    return res.status(401).json({
      message: 'You need to be an admin to do this'
    })
  }
  next()
}


exports.verifyUser = async (req, res, next) => {

    if(req.userId !== req.params.id){
      return res.status(401).json({
        message: 'The requested information belongs to another user'
      })
    }
    next()
}