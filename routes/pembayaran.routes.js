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
router.post('/tambahkeranjang', jwtMiddleware, pembayaranController.createKeranjang)
router.put('/pembayaran/:id', jwtMiddleware, pembayaranController.createPembayaran)

//findall
router.get('/allpembayaran', pembayaranController.findAll)

//findownproduct
router.get('/daftarpembeli', jwtMiddleware, pembayaranController.findtransaksipenjual)
router.get('/transaksiku', jwtMiddleware, pembayaranController.findtransaksipembeli)

//getone
router.get('/:id', pembayaranController.findOne)

//validasi pembayaran
router.put('/validasi/:id', jwtMiddleware, upload.single('buktipembayaran'), pembayaranController.validate)

//konfirmasi pembayaran produk
router.put('/konfirmasiproduk/:id', jwtMiddleware, pembayaranController.confirmproduct)

//konfirmasi pembayaran
router.put('/konfirmasisubscribe/:id', jwtMiddleware, pembayaranController.confirmsubscribe)

//delete
router.delete('/delete/:id', jwtMiddleware, pembayaranController.delete)

module.exports = router