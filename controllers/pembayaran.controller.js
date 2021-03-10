const db = require("../models");
const Pembayaran = db.pembayarans;

//buat transaksi
function createPembayaran(req, res, next) {
    const { harga, jumlah, namapembeli } = req.body;
    const transaksi = {
        harga,
        jumlah,
        status: 'notvalidated',
        total: harga * jumlah,
        namapembeli,
        userId: req.user.id

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

// //semua transaksi
// function findAll(req, res, next) {
//     const query = req.params.query;
//     var condition = {};
//     Produk.findAll({ where: condition })
//         .then((data) => {
//             if (data.length == 0) {
//                 res.send({
//                     message: "There is no data",
//                 });
//             }
//             res.send(data);
//         })
//         .catch((err) => {
//             next(err);
//             return;
//         });
// }

// //transaksi tertentu
// function findOne(req, res, next) {
//     const id = req.params.id;
//     Produk.findByPk(id)
//         .then((data) => {
//             if (data == null) {
//                 next("No product found");
//                 return;
//             }
//             res.send(data);
//         })
//         .catch((err) => {
//             next(err);
//             return;
//         });
// }
// //validasi pembayaran
// function update(req, res, next) {
//     const id = req.params.id;
//     let condition = {
//         id: id,
//     };
//     Produk.update(req.body, { where: condition })
//         .then((num) => {
//             if (num == 1) {
//                 if (num == null) {
//                     next("No Product Found");
//                     return;
//                 }
//                 res.send({
//                     message: "Product was updated successfully",
//                 });
//             } else {
//                 next(
//                     `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
//                 );
//                 return;
//             }
//         })
//         .catch((err) => {
//             next(err);
//             return;
//         });
// }

// //melihat semua transaksi
// function findownproduct(req, res, next) {
//     let condition = {
//         userId: req.user.id,
//     };
//     Produk.findAll({ where: condition })
//         .then((data) => {
//             if (data.legth == 0) {
//                 res.send({
//                     message: "No Product existed",
//                 });
//             }
//             res.send(data);
//         })
//         .catch((err) => {
//             next(err);
//             return;
//         });
// }

module.exports = {
    createPembayaran,
    //findAll,
    // findOne,
    // findownproduct,
    // update
};