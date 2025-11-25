const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	  title: {
		type: String,
		required: [true, 'Blog title required'],
		minlength: 5,
		validate: {
      validator: function(v) {
        return /^[A-Za-z\s]+$/.test(v) // only letters and spaces allowed
      },
      message: props => `${props.value} contains invalid characters. Only letters and spaces are allowed!`
    }		
	  },
	  author: {
		type: String,
		required: [true, 'Blog author required'],
		minlength: 3,
		validate: {
		validator: function(v) {
		  return /^[A-Za-z\s]+$/.test(v) // only letters and spaces allowed	
		},
      message: props => `${props.value} contains invalid characters. Only letters and spaces are allowed!`
	}
},
	  url: {
		type: String,
		required: [true, 'Blog URL required'],
		minlength: 5
	  },
	  likes: {
		type: Number,
		default: 0
	  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)