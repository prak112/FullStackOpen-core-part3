// import Express router, controller
const router = require('express').Router()
const contactsController = require('../controllers/contactsController')

// setup routes/HTTP requests
router.get('/', contactsController.getAllContacts)
router.get('/:id', contactsController.getContactById)
router.get('/info', contactsController.getContactsInfo)

router.post('/', contactsController.addContact)

router.put('/:id', contactsController.reviseContact)

router.delete('/:id', contactsController.removeContact)

module.exports = router