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

//create pembayaran
router.post('/pembayaran', jwtMiddleware, pembayaranController.createPembayaran)

//validasi pembayaran
router.put('/validasi/:id', jwtMiddleware, upload.single('buktipembayaran'), pembayaranController.validate)

//konfirmasi pembayaran
router.put('/konfirmasi/:id', jwtMiddleware, pembayaranController.confirm)

//getone
router.get('/:id', pembayaranController.findOne)

//findall
router.get('/productlist', pembayaranController.findAll)

//findownproduct
router.get('/myproduct/:id', jwtMiddleware, pembayaranController.findtransaksi)

module.exports = router