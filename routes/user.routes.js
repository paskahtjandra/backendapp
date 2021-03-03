const router = require('express').Router()
const userController = require('../controllers/user.controller')
const joiMiddleware = require('../middlewares/joiValidator')
const jwtMiddleware = require('../middlewares/jwtAuth')

// register user
router.post('/register', joiMiddleware, userController.registerUser)

//login a user
router.post('/login', joiMiddleware, userController.login)

// findall
router.get('/users', userController.findAll)

// getone
router.get('/:id', jwtMiddleware, userController.findOne)

// update
router.put('/:id', jwtMiddleware, joiMiddleware, userController.update)

// delete
router.delete('/delete/:id', jwtMiddleware, userController.destroy)

module.exports = router