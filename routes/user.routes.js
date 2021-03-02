const router = require('express').Router()
const userController = require('../controllers/user.controller')

// register tweet
router.post('/register', userController.registerUser)

// findall
router.get('/users', userController.findAll)

// getone
router.get('/:id', userController.findOne)

// update
router.put('/:id', userController.update)

// delete
router.delete('/delete/:id', userController.destroy)

module.exports = router