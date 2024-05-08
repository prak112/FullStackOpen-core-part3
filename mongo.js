// imports
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// load environment variables
dotenv.config()

if (!process.env.DB_PASSWORD) {
  console.log('DB_PASSWORD not set in .env')
  process.exit(1)
}

const password = process.env.DB_PASSWORD
const databaseName = 'phonebookApp'

const url =
  `mongodb+srv://fsopen:${password}@cluster0.hnqrjj0.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=Cluster0`

// setup connection to MongoDB with Mongoose ODM
mongoose.set('strictQuery',false)
mongoose.connect(url)

// schema specific only to ODM
const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', phonebookSchema)


// test run with command line arguments
const name = process.argv[2]
const number = process.argv[3]

const contact = new Contact({
  name: name,
  number: number,
})

// list all contacts
if(!name || !number){
    console.log('Phonebook:')
    Contact.find({}).then(resultSet => {
        resultSet.forEach(contact => {
            console.log(`${contact.name}  ${contact.number}`)
        })
        mongoose.connection.close()
        console.log('\nDB connection terminated')
    })
}
// add contact
else{
    contact.save().then(result => {
        console.log(`Added ${name} number (${number}) to Phonebook.`)
        mongoose.connection.close()
        console.log('\nDB connection terminated')
      })
}