// imports
const mongoose = require('mongoose')

// schema specific to ODM, not MongoDB
const phonebookSchema = new mongoose.Schema({
  name: { 
    type: String,
    minLength: 3,
    required: [true, 'Contact name required']
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /^0*\d{1,3}-\d{7,}$/.test(v)
      },
      message: props => `${props.value} is not valid. Number should be in format : 123-1234567`
    },
    required: [true, 'Phone number required']
  },
})

// transform MongoDB output fields for relevant data
phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
// export to contactsController
module.exports = mongoose.model('Contact', phonebookSchema)
