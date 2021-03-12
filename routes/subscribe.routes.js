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

const subscribeController = require('../controllers/subscribe.controller')

//create product
router.post('/startsubscribe', upload.single('productimage'), jwtMiddleware, joiMiddleware, subscribeController.startsubscribe)

//findall
router.get('/allsubscription', subscribeController.findAll)

//findinput
router.get('/search', subscribeController.findinput)

//findownproduct
router.get('/mysubscription', jwtMiddleware, subscribeController.findownsubscribe)

//getone
router.get('/:id', subscribeController.findOne)

//update
router.put('/update/:id', upload.single('productimage'), jwtMiddleware, joiMiddleware, subscribeController.update)

//delete
router.delete('/delete/:id', jwtMiddleware, subscribeController.delete)

module.exports = router