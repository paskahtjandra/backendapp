const express = require('express')
const router = express.Router()

const produkController = require('../controllers/produk.controller')

//create tweet
router.post('/create', produkController.createProduk)

//findall
router.get('/tweets', produkController.findAll)

//getone
router.get('/:id', produkController.findOne)

//update
router.put('/:id', produkController.update)

//delete
router.delete('/delete/:id', produkController.delete)

module.exports = router