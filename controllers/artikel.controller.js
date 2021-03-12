const db = require("../models");
const Artikel = db.artikels;

//create artikel
function createArtikel(req, res, next) {
    const { judul, konten, penulis, tanggalposting } = req.body;
    const artikel = {
        judul,
        konten,
        penulis,
        tanggalposting,
        userId: req.user.id,
        gambar: req.file.path,
    };
    Artikel.create(artikel)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error in create product",
            });
        });
}

//findALL
function findAll(req, res, next) {
    const query = req.params.query;
    var condition = {};
    Artikel.findAll({ where: condition })
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
    Artikel.findByPk(id)
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
//updateOwnartikel
function update(req, res, next) {
    const id = req.params.id;
    const { judul, konten, penulis, tanggalposting } = req.body;
    const artikel = {
        judul,
        konten,
        penulis,
        tanggalposting,
        userId: req.user.id,
        //gambar: req.file.path,
    };
    let condition = {
        userId: req.user.id,
        id: id,
    };
    Artikel.update(artikel, { where: condition })
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

//find own artikel
function findownartikel(req, res, next) {
    let condition = {
        userId: req.user.id,
    };
    Artikel.findAll({ where: condition })
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
    };

    Artikel.destroy({
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
    createArtikel,
    findAll,
    findOne,
    findownartikel,
    update,
    delete: _delete,
};