const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 8080
const serverURI = `http://localhost:${PORT}`
const mongoURI = process.env.MONGO_URI

app.listen(PORT,() => console.log('Server is running on ' + serverURI))

const connecToDB = async () => {
  try {
  await mongoose.connect(mongoURI)
  console.log('connected to db')
  }
  catch (err) {
  console.log(err)
  }
}

connecToDB()

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('connected'))
//   .catch(err => console.log(err.message))



// const connecToDB = async () => {
//   try {
//   await mongoose.connect(process.env.MONGO_URI)
//   console.log('connected to db')
//   }
//   catch (err) {
//   console.log(err)
//   }
// }

// connecToDB()

// const app = require('./app');
// const mongoose = require('mongoose');
// require('dotenv').config();

// const PORT = process.env.PORT || 9999

// app.listen(PORT, () => console.log('serevr running on ' + PORT))

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('connected to db'))
//   .catch(err => console.log(err.message))