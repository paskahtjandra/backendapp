const db = require("../models");
const Pembayaran = db.pembayarans;
const Produk = db.produks;
const Subscribe = db.subscribes;

function createKeranjang(req, res, next) {
    const { harga, jumlah, idpenjual, idproduk } = req.body;
    const transaksi = {
        harga,
        jumlah,
        status: 'waiting',
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

//buat transaksi
function createPembayaran(req, res, next) {
    const validasi = {
        status: 'notvalidated',
    };
    const id = req.params.id;
    let condition = {
        idpembeli: req.user.id,
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
                    message: "Pesanan anda diterima",
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

//validate
function validate(req, res, next) {
    const validasi = {
        status: 'validated',
        buktipembayaran: req.file.path,
    };
    const id = req.params.id;
    let condition = {
        idpembeli: req.user.id,
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


//confirmtransactionproduct
async function confirmproduct(req, res, next) {
    const id = req.params.id;
    let condition = {
        idpenjual: req.user.id,
        id: id,

    };

    try {
        const penarikan = await Pembayaran.findOne({ where: condition })
        if (!penarikan) {
            next({
                message: 'id not found',
                statusCode: 400
            })
        }
        const pengurangans = await Produk.findOne({
            where: {
                id: penarikan.idproduk,
            }
        })
        if (pengurangans.jumlah < penarikan.jumlah) {
            next({
                message: 'product sudah habis, uang anda akan dikembalikan',
                statusCode: 409
            })
        }

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

//confirmtransactionsubscribe
async function confirmsubscribe(req, res, next) {
    const id = req.params.id;
    let condition = {
        idpenjual: req.user.id,
        id: id,
    };

    try {
        const penarikan = await Pembayaran.findOne({ where: condition })
        if (!penarikan) {
            next({
                message: 'id not found',
                statusCode: 400
            })
        }
        const pengurangans = await Subscribe.findOne({
            where: {
                id: penarikan.idproduk,
            }
        })

        //Declare transaction
        const t = await db.sequelize.transaction();

        //update subscribe (minus)
        const pengurangan = {
            jumlah: pengurangans.jumlah - penarikan.jumlah
        }
        const numSubscribe = await Subscribe.update(pengurangan, {
            where: {
                id: penarikan.idproduk
            },
        }, { transaction: t });

        // check update success
        if (numSubscribe == 1) {
            if (numSubscribe == null) {
                next("No Subscription Found");
                return;
            }

        } else {
            next(
                `Cannot update Subscription with id=${id}. Maybe Product was not found or req.body is empty!`
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


//melihat transaksi pribadi

function findtransaksipenjual(req, res, next) {

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

function findtransaksipembeli(req, res, next) {

    let condition = {
        idpembeli: req.user.id,
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

//delete
function _delete(req, res, next) {
    const id = req.params.id;
    let condition = {
        id: id,
        idpembeli: req.user.id,
    };

    Pembayaran.destroy({
            where: condition,
        })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Pembayaran was deleted successfully!",
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
    createKeranjang,
    createPembayaran,
    validate,
    confirmproduct,
    confirmsubscribe,
    findAll,
    findOne,
    findtransaksipenjual,
    findtransaksipembeli,
    delete: _delete,
};