const User = require('../schemas/userSchema')
const Admin = require('../schemas/adminSchema')
const bcrypt = require('bcryptjs')
const auth = require('../authentication/auth');
const { default: mongoose } = require('mongoose');


exports.addUser = async (req, res) => {
  const { firstName, lastName, adress, password } = req.body;

  if(!firstName || !lastName || !adress || !password) {
    return res.status(400).json({
      message: 'You need to enter all the fields'
    })
  }

  const count = await User.count({ firstName: firstName, lastName: lastName })
  let suffix = ''
  if(count > 0) {
    suffix = count
  }
  const email = firstName + '.' + lastName + suffix + '@company.se'

  // TBD - Felhantering
  const salt = await bcrypt.genSalt(15)
  const hash = await bcrypt.hash(password, salt)

  const _user = new User({ firstName, lastName, adress, email, passwordHash: hash, })
  const user = await _user.save()

  res.status(201).json(auth.generateToken(user))
}


exports.addAdmin = async (req, res) => {
  try {
    const { adminId } = req.body;

  if(!adminId) {
    return res.status(400).json({ message: 'You need to enter a admin Id' })
  }

  const admin = await Admin.create({ adminId })

  if(!admin) {
    return res.status(500).json({ message: 'Something went wrong '})
  }

  res.status(201).json({ message: 'Admin added, you need to login again for it to work'})
  } catch (err) {
    if(err.code == 11000) {
      return res.status(400).json({ message: 'this admin already exists'})
    }
  }
}


exports.getUsers = async (req, res) => {
  try {  
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong when fetching the users' })
  }
}


exports.login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password ) {
    return res.status(400).json({
      message: 'You need to enter all the fields'
    })
  }


  const user = await User.findOne({ email })

  if(!user) {
    return res.status(401).json({
      message: 'Something went wrong..'
    })
  }

   const result = await bcrypt.compare(password, user.passwordHash)

   if(!result) {
    return res.status(401).json({
      message: 'Something went wrong..'
    })
   }

   res.status(200).json(auth.generateToken(user))
}


exports.deleteUser = async (req, res) => {

  const user = await User.findOneAndDelete({ _id: req.params.id })

  if(!user) {
    return res.status(404).json({
      message: 'Could not find the user'
    })
  }

  res.status(204).json()
}


exports.updateUser = async (req, res) => {

  const user = await User.findOne({ _id: req.params.id })
  if(!user) {
    return res.status(404).json({
      message: 'Could not find the user'
    })
  }

  user.firstName = req.body.firstName || user.firstName
  user.lastName = req.body.lastName || user.lastName

  const count = await User.count({ firstName: user.firstName, lastName: user.lastName })
  let suffix = ''
  if(count > 0) {
    suffix = count
  }
  user.email = user.firstName + '.' + user.lastName + suffix + '@company.se'

  const updatedUser = await user.save()

  res.status(200).json(updatedUser)
}