// load environment variables
require('dotenv').config()

// imports using CommonJS
const express = require('express')
const Contact = require('./models/contact')
const morgan = require('morgan')    // logger
const cors = require('cors')        // cross-origin resource sharing
const PORT = process.env.PORT

const app = express()

// accept frontend 'dist' from different origin
app.use(cors())

// Middleware
// Static site rendering
app.use(express.static('dist'))

// HTTP requests logging
app.use(express.json()) // json-parser for body
app.use(morgan('tiny')) 

// ONLY for development purposes - POST method
// morgan.token('body', (req, res) => JSON.stringify(req.body) );
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


// HTTP methods to access data
//Root
app.get('/', (request, response) => {
    response.send('<h1>Welcome to Phonebook app</h1>');
})

// GET
app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
     })
})

app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    Contact.findById(id).then(result => {
        response.json(result)
    })
})

// POST
app.post('/api/contacts', (request, response) => {
    const name = request.body.name
    const number = request.body.number
    if(!name || !number){
        return response.status(400).json({
            ERROR: "Missing Contact information. Verify Name and/or Number."
        })
    }
    // else if(contacts.some(contact => contact.name === name)){
    //     return response.status(400).json({
    //         ERROR: "Contact Name already exists."
    //     })
    // }
    else {
        const contact = new Contact({
            name: name,
            number: number  
        })
        contact.save().then(savedContact => {
            response.json(savedContact)
        })
    }
})

// DELETE
// app.delete('/api/contacts/:id', (request, response) => {
//     const id = Number(request.params.id)
//     contacts = contacts.filter((contact) => contact.id !== id)
//     console.log(`Contact of ID ${id} deleted.`);
//     console.log(contacts)
//     response.status(204).json({
//         INFO: "Contact deleted"
//     })
// })


// listen to PORT and log
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})


