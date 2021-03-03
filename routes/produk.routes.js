const express = require('express')
const router = express.Router()
const joiMiddleware = require('../middlewares/joiValidator')
const jwtMiddleware = require('../middlewares/jwtAuth')

const produkController = require('../controllers/produk.controller')

//create product
router.post('/create', joiMiddleware, jwtMiddleware, produkController.createProduk)

//findall
router.get('/productlist', produkController.findAll)

//getone
router.get('/:id', produkController.findOne)

//findownproduct
router.get('/myproduct/:id', jwtMiddleware, produkController.findownproduct)

//update
router.put('/update/:id', jwtMiddleware, joiMiddleware, produkController.update)

//delete
router.delete('/delete/:id', jwtMiddleware, produkController.delete)

module.exports = router