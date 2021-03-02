const express = require('express')
const router = express.Router()

const pasarController = require('../controllers/pasar.controller')

//create pasar
router.post('/create', pasarController.createPasar)

//findall
router.get('/semuaproduk', pasarController.findAll)

//getone
router.get('/:id', pasarController.findOne)

//update
router.put('/:id', pasarController.update)

//delete
router.delete('/delete/:id', pasarController.delete)

module.exports = router