const { MONGODB } = require('./index')
const mongoose = require('mongoose')

mongoose.connect(MONGODB.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connection open to${MONGODB.URL}.`)
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}.`)
})

mongoose.connection.on('disconnect', () => {
  console.log('Mongoose connection disconnect.')
})

module.exports = mongoose
