const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const PORT = 3001
const app = express()

// validate resources to client-side rendering
app.use(cors())

// Middleware/HTTP requests logging
app.use(express.json()) // json-parser for body
app.use(morgan('tiny')) 

// ONLY for testing purposes - POST method
// morgan.token('body', (req, res) => JSON.stringify(req.body) );
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// data
let contacts = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// HTTP methods to access data
//Root
app.get('/', (request, response) => {
    response.send('<h1>Welcome to Phonebook app</h1>');
})

// GET
app.get('/api/contacts', (request, response) => {
    response.json(contacts)
})

app.get('/api/info', (request, response) => {
    const content = `Phonebook has information for ${contacts.length} contacts`
    const now = new Date()
    const lastRequestedAt = now.toString()
    response.send(`<h2>${content}</h2></br><p>${lastRequestedAt}</p>`);
})

app.get('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contacts.find((contact) => contact.id === id)
    if(!contact){
        response.status(404).send('Contact does not exist. Verify contact ID.');
    }
    else{ response.json(contact) }
})

// POST
app.post('/api/contacts', (request, response) => {
    const generateId = (limit) => Math.floor(Math.random() * limit)
    const name = request.body.name
    const number = request.body.number
    if(!name || !number){
        return response.status(400).json({
            ERROR: "Missing Contact information. Verify Name and/or Number."
        })
    }
    else if(contacts.some(contact => contact.name === name)){
        return response.status(400).json({
            ERROR: "Contact Name already exists."
        })
    }

    const contact = {
        id: generateId(500),
        name: name,
        number: number  
    }
    contacts.concat(contact)
    response.json(contacts.concat(contact))
})

// DELETE
app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id)
    contacts = contacts.filter((contact) => contact.id !== id)
    console.log(`Contact of ID ${id} deleted.`);
    console.log(contacts)
    response.status(204).json({
        INFO: "Contact deleted"
    })
})


// listen to PORT and log
app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})


