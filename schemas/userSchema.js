const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName:      { type: String, required: true },
    lastName:       { type: String, required: true },
    email:          { type: String, lowercase: true },
    adress:         { type: String, required: true },
    lastName:       { type: String, required: true },
    passwordHash:   { type: String, required: true }
  })
  
  module.exports = mongoose.model('User', userSchema)