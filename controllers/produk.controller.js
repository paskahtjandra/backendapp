const db = require('../models')
const Produk = db.produks

//create tweet
function createProduk(req, res, next) {
    Produk.create(req.body)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error in create product"
            })
        })
}

//findALL
function findAll(req, res, next) {
    Produk.findAll()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send()
            message: "Error in findAll"
        })
}

//findOne
function findOne(req, res, next) {
    const id = req.params.id
    Produk.findByPk(id)
        .then((data) => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: "Error in findOne"
            })
        })
}
//updateOne
function update(req, res, next) {
    const id = req.params.id
    let condition = {
        id: id
    }
    Produk.update(req.body, { where: condition })
        .then(num => {
            if (num != 1) {
                req.status(500).send({
                    message: "Affected row not one"
                })
            }
            res.status(200).send({
                message: "Update successful"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error in update"
            })
        })
}

//delete
function _delete(req, res, next) {
    const id = req.params.id
    let condition = {
        id: id
    }

    Produk.destroy({
            where: condition
        })
        .then(num => {
            if (num != 1) {
                req.status(500).send({
                    message: "Affected row not one"
                })
            }
            res.status(200).send({
                message: "Delete successful"
            })
        })
        .catch(err => {
            res.status(500).send({
                message: "Error in update"
            })
        })
}

module.exports = {
    createProduk,
    findAll,
    findOne,
    update,
    delete: _delete
}