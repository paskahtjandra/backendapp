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

const artikelController = require('../controllers/artikel.controller')

//create product
router.post('/create', jwtMiddleware, upload.single('artikelimage'), artikelController.createArtikel)

//findall
router.get('/artikel', artikelController.findAll)

//findownproduct
router.get('/myarticles', jwtMiddleware, artikelController.findownproduct)

//getone
router.get('/:id', artikelController.findOne)

//update
router.put('/update/:id', jwtMiddleware, artikelController.update)

//delete
router.delete('/delete/:id', jwtMiddleware, artikelController.delete)

module.exports = router