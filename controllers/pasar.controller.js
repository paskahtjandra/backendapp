const db = require('../models')
const Pasar = db.pasars

//create tweet
function createPasar(req, res, next) {
    Pasar.create(req.body)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error in create tweet"
            })
        })
}

//findALL
function findAll(req, res, next) {
    Pasar.findAll()
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
    Pasar.findByPk(id)
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
    Pasar.update(req.body, { where: condition })
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

    Pasar.destroy({
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
    createPasar,
    findAll,
    findOne,
    update,
    delete: _delete
}