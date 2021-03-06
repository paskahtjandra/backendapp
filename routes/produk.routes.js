const express = require('express')
const router = express.Router()
const joiMiddleware = require('../middlewares/joiValidator')
const jwtMiddleware = require('../middlewares/jwtAuth')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const upload = multer({ storage: storage })

const produkController = require('../controllers/produk.controller')

//create product
router.post('/create', upload.single('productimage'), jwtMiddleware, produkController.createProduk)

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