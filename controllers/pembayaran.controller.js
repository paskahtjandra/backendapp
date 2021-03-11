const db = require("../models");
const pembayaranModel = require("../models/pembayaran.model");
const Pembayaran = db.pembayarans;
const Produk = db.produks;

//buat transaksi
function createPembayaran(req, res, next) {
    const { harga, jumlah, idpenjual, idproduk } = req.body;
    const transaksi = {
        harga,
        jumlah,
        status: 'notvalidated',
        total: harga * jumlah,
        idpenjual,
        idproduk,
        idpembeli: req.user.id

    };
    Pembayaran.create(transaksi)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            next(err);
            return;
        });
}

//validate
function validate(req, res, next) {
    const validasi = {
        status: 'validated',
        buktipembayaran: req.file.path,
    };
    const id = req.params.id;
    let condition = {
        id: id,
    };
    Pembayaran.update(validasi, { where: condition })
        .then((num) => {
            if (num == 1) {
                if (num == null) {
                    next("No Transactioin Found");
                    return;
                }
                res.send({
                    message: "Pembayaran telah terverifikasi",
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


//confirmtransaction
async function confirm(req, res, next) {
    const id = req.params.id;
    let condition = {
        id: id,
    };

    const penarikan = await Pembayaran.findOne({ where: condition })

    let condition2 = {
        id: penarikan.idproduk,
    };
    const pengurangans = await Produk.findOne({ where: condition2 })
    try {
        //Declare transaction
        const t = await db.sequelize.transaction();

        //update produk (minus)
        const pengurangan = {
            jumlah: pengurangans.jumlah - penarikan.jumlah
        }
        const numProduk = await Produk.update(pengurangan, {
            where: {
                id: penarikan.idproduk
            },
        }, { transaction: t });

        // check update success
        if (numProduk == 1) {
            if (numProduk == null) {
                next("No Product Found");
                return;
            }

        } else {
            next(
                `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
            );
            return;
        }

        //update pembayaran
        const validasi = {
            status: 'confirmed'
        };
        const numConfirm = await Pembayaran.update(validasi, {
            where: {
                id: id
            }
        }, { transaction: t });
        // check update success
        if (numConfirm == 1) {
            if (numConfirm == null) {
                next("No Transactioin Found");
                return;
            }
            res.send({
                message: "Pembayaran telah terverifikasi",
            });
        } else {
            next(
                `Cannot update Transaction with id=${id}. Maybe Product was not found or req.body is empty!`
            );
            return;
        }
        await t.commit();
    } catch (error) {
        next(error);
        await t.rollback();
        return;
    }

}

//semua transaksi
function findAll(req, res, next) {
    const query = req.params.query;
    var condition = {};
    Pembayaran.findAll({ where: condition })
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

//transaksi tertentu
function findOne(req, res, next) {
    const id = req.params.id;
    Pembayaran.findByPk(id)
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


//melihat semua transaksi

function findtransaksi(req, res, next) {

    let condition = {
        idpenjual: req.user.id,
    };
    Pembayaran.findAll({ where: condition })
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

module.exports = {
    createPembayaran,
    validate,
    confirm,
    findAll,
    findOne,
    findtransaksi,
};