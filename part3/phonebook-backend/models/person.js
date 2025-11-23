const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
	 console.log('Connected to MongoDB')
  })
  .catch((error) => {
	 console.error('Error connecting to MongoDB:', error.message)
  })

  // Schema 
  const personSchema = new mongoose.Schema({
	name: {
		type:String,
		minlength: 3,
		required: [true, 'Person name required'],
		validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/.test(v) // only letters and spaces allowed
      },
      message: props => `${props.value} contains invalid characters. Only letters and spaces are allowed!`
    }
	},
	number: {
		type:String,
		required: [true, 'Person phone number required'],
		validate: {
			validator: function(v) {
				if (v.length < 8) return false 
				return /^\d{2,3}-\d+$/.test(v) // number format 046-2035591
			},
			message: props => {
				if (props.value.length < 8){
					return 'Phone number must be at least 8 characters long'
				}
				return `${props.value} is not a valid phone number! Right format is XX-XXXXXXX or XXX-XXXXXXX`
			}
		}
	}
	})

	// Custom toJSON 
	personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
	  returnedObject.id = returnedObject._id.toString()
	  delete returnedObject._id
	  delete returnedObject.__v
	}
 })

 module.exports = mongoose.model('Person', personSchema)