const express = require('express')
const router = express.Router()
const joiMiddleware = require('../middlewares/joiValidator')
const jwtMiddleware = require('../middlewares/jwtAuth')
const multer = require('multer');
//const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/buktibayar');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '.' + file.mimetype.split('/')[1])
    }
})
const upload = multer({ storage: storage })

const pembayaranController = require('../controllers/pembayaran.controller')

//create product
router.post('/pembayaran', jwtMiddleware, pembayaranController.createPembayaran)

// //findall
// router.get('/productlist', produkController.findAll)

// //getone
// router.get('/:id', produkController.findOne)

// //findownproduct
// router.get('/myproduct/:id', jwtMiddleware, produkController.findownproduct)

// //update
// router.put('/update/:id', jwtMiddleware, joiMiddleware, produkController.update)

// //delete
// router.delete('/delete/:id', jwtMiddleware, produkController.delete)

module.exports = router