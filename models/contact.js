// imports
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// load environment variables
dotenv.config()

const password = process.env.DB_PASSWORD
const databaseName = 'phonebookApp'

// setup database connection with Mongoose ODM
const url = process.env.MONGODB_URI || 
  `mongodb+srv://fsopen:${password}@cluster0.hnqrjj0.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(result => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB\nERROR : ', error.message)
  })

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
        return /^0*\d{1,3}-\d{7,}$/.test(v);
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
// export to index.js
module.exports = mongoose.model('Contact', phonebookSchema)
