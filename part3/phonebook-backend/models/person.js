const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
	 console.log('Connected to MongoDB')
  })
  .catch((error) => {
	 console.error('Error connecting to MongoDB:', error.message)
  })

  // схема 
  const personSchema = new mongoose.Schema({
	name: String,
	number: String
	})

	// Кастомний toJSON 
	personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
	  returnedObject.id = returnedObject._id.toString()
	  delete returnedObject._id
	  delete returnedObject.__v
	}
 })

 module.exports = mongoose.model('Person', personSchema)