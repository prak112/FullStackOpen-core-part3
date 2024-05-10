// import schema
const Contact = require('../models/contact')

// HTTP methods
// GET
exports.getAllContacts = (request, response, next) => {
    Contact.find({})
    .then(contacts => {
        response.json(contacts)
    })
    .catch(error => next(error))
}

// GET by id 
exports.getContactById = (request, response, next) => {
    Contact.findById(request.params.id)
    .then(result => {
        response.json(result)
    })
    .catch(error => next(error))
}

// GET info 
exports.getContactsInfo = (request, response, next) => {
    Contact.countDocuments({})
    .then(allContacts => {
        const content = `Phonebook has information for ${allContacts} contacts`
        const now = new Date()
        const lastRequestedAt = now.toString()
        response.send(`<h2>${content}</h2></br><p>${lastRequestedAt}</p>`)
    })
    .catch(error => next(error))
}

// POST
exports.addContact = (request, response, next) => {
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
}

// UPDATE
exports.reviseContact = (request, response, next) => {
    const { name, number } = request.body
    Contact.findByIdAndUpdate(request.params.id, 
        { name, number }, 
        {new: true, runValidators: true, context: 'query'}
    )
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
}

// DELETE
exports.removeContact = (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
}