const db = require("../models");
const Subscribe = db.subscribes;
const { Op } = require("sequelize");

//create produk
function startsubscribe(req, res, next) {
    console.log(req.file)
    const { namaproduk, deskripsi, harga, jumlah } = req.body;
    const produklangganan = {
        namaproduk,
        deskripsi,
        harga,
        jumlah,
        userId: req.user.id,
        gambar: req.file.path
    };
    Subscribe.create(produklangganan)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error in create product",
            });
        });
}

//findinput
function findinput(req, res, next) {
    const query = req.query.namaproduk;
    var condition = {
        namaproduk: {
            [Op.like]: `%${query}%`
        }
    };
    Subscribe.findAll({ where: condition })
        .then((data) => {
            if (data.length == 0) {
                res.send({
                    message: "There is no data",
                });
            }
            res.send(data);
        })
        .catch((err) => {
            next(err);
            return;
        });
}
//findALL
function findAll(req, res, next) {
    const query = req.params.query;
    var condition = {};
    Subscribe.findAll({ where: condition })
        .then((data) => {
            if (data.length == 0) {
                res.send({
                    message: "There is no data",
                });
            }
            res.send(data);
        })
        .catch((err) => {
            next(err);
            return;
        });
}
//findOne
function findOne(req, res, next) {
    const id = req.params.id;
    Subscribe.findByPk(id)
        .then((data) => {
            if (data == null) {
                next("No product found");
                return;
            }
            res.send(data);
        })
        .catch((err) => {
            next(err);
            return;
        });
}
//updateOwnProduct
function update(req, res, next) {
    const { namaproduk, deskripsi, harga, jumlah } = req.body;
    const product = {
        namaproduk,
        deskripsi,
        harga,
        jumlah,
        userId: req.user.id,
        gambar: req.file.path,
    };
    const id = req.params.id;
    let condition = {
        id: id,
        userId: req.user.id,
    };
    Subscribe.update(product, { where: condition })
        .then((num) => {
            if (num == 1) {
                if (num == null) {
                    next("No Product Found");
                    return;
                }
                res.send({
                    message: "Product was updated successfully",
                });
            } else {
                next(
                    `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
                );
                return;
            }
        })
        .catch((err) => {
            next(err);
            return;
        });
}

//find own product
function findownsubscribe(req, res, next) {
    let condition = {
        userId: req.user.id,
    }
    Subscribe.findAll({ where: condition })
        .then((data) => {
            if (data.legth == 0) {
                res.send({
                    message: "No Product existed",
                });
            }
            res.send(data);
        })
        .catch((err) => {
            next(err);
            return;
        });
}

//delete
function _delete(req, res, next) {
    const id = req.params.id;
    let condition = {
        id: id,
        userId: req.user.id,
    };

    Subscribe.destroy({
            where: condition,
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Product was deleted successfully!",
                });
            } else {
                next(
                    "Cannot delete Product with id=${id}. Maybe Product was not found!"
                );
                return;
            }
        })
        .catch((err) => {
            next(err);
            return;
        });
}

module.exports = {
    startsubscribe,
    findAll,
    findOne,
    findownsubscribe,
    update,
    delete: _delete,
    findinput,
};