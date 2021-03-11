const express = require('express')
const router = express.Router()
const joiMiddleware = require('../middlewares/joiValidator')
const jwtMiddleware = require('../middlewares/jwtAuth')
const multer = require('multer');
//const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '.' + file.mimetype.split('/')[1])
    }
})
const upload = multer({ storage: storage })

const produkController = require('../controllers/produk.controller')

//create product
router.post('/create', upload.single('productimage'), jwtMiddleware, joiMiddleware, produkController.createProduk)

//findall
router.get('/productlist', produkController.findAll)

//findinput
router.get('/search', produkController.findinput)

//findownproduct
router.get('/myproduct', jwtMiddleware, produkController.findownproduct)

//getone
router.get('/:id', produkController.findOne)

//update
router.put('/update/:id', upload.single('productimage'), jwtMiddleware, joiMiddleware, produkController.update)

//delete
router.delete('/delete/:id', jwtMiddleware, produkController.delete)

module.exports = router