// load environment variables
require('dotenv').config()

// imports using CommonJS
const express = require('express')
const Contact = require('./models/contact')
const morgan = require('morgan')    // request logger
const cors = require('cors')        // cross-origin resource sharing
const PORT = process.env.PORT || 3001

const app = express()
// load Middleware (VERY PARTICULAR ORDER)
app.use(express.static('dist')) // Static site rendering
app.use(express.json()) // json-parser for body
app.use(cors()) // accept frontend resources from different origin
app.use(morgan('tiny')) // HTTP requests logging

// Request Logger ONLY for development purposes - POST method
// morgan.token('body', (req, res) => JSON.stringify(req.body) );
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


// HTTP methods
// Home
app.get('/', (request, response) => {
    response.send('<h1>Welcome to Phonebook app</h1>');
})

// GET
app.get('/api/contacts', (request, response, next) => {
    Contact.find({})
    .then(contacts => {
        response.json(contacts)
    })
    .catch(error => next(error))

})
// GET by id 
app.get('/api/contacts/:id', (request, response, next) => {
    Contact.findById(request.params.id)
    .then(result => {
        response.json(result)
    })
    .catch(error => next(error))
})

// GET info 
app.get('/api/info', (request, response, next) => {
    Contact.countDocuments({})
    .then(allContacts => {
        const content = `Phonebook has information for ${allContacts} contacts`
        const now = new Date()
        const lastRequestedAt = now.toString()
        response.send(`<h2>${content}</h2></br><p>${lastRequestedAt}</p>`)
    })
    .catch(error => next(error))
})

// POST
app.post('/api/contacts', (request, response, next) => {
    const name = request.body.name
    const number = request.body.number
    if(!name || !number){
        return response.status(400).json({
            ERROR: "Missing Contact information. Verify Name and/or Number."
        })
    }
    else {
        const contact = new Contact({
            name: name,
            number: number  
        })
        contact.save()
        .then(savedContact => {
            response.json(savedContact)
        })
        .catch(error => next(error))
    }
})

// UPDATE
app.put('/api/contacts/:id', (request, response, next) => {
    const { name, number } = request.body
    Contact.findByIdAndUpdate(request.params.id, 
        { name, number }, 
        {new: true, runValidators: true, context: 'query'}
    )
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})


// DELETE
app.delete('/api/contacts/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// listen to PORT and log
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})


// Unknown endpoint handler
const unknownEndpoint = (request, response) => {
    response.status(404).send({error : 'Unknown Endpoint'})
}
app.use(unknownEndpoint)    // load before-last Middleware

// Requests error handler
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if(error.name === 'CastError'){
        response.status(400).send({ error: 'Malformed request syntax / Invalid request framing' })
    }
    else if(error.name === 'ValidationError'){
        response.status(400).send({ error: error.message })
    }
    next(error)
}
app.use(errorHandler)   // ALWAYS last loaded Middleware

