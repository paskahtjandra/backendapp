const joi = require('joi')

// sub schema
const namaproduk = joi.string()
const deskripsi = joi.string()
const harga = joi.number()
const jumlah = joi.number()

// Create Validator Schema
const createSchema = joi.object().keys({
    namaproduk: namaproduk.required(),
    deskripsi: deskripsi.required(),
    harga: harga.required(),
    jumlah: jumlah.required(),

});

// Update Validator Schema
const updateSchema = joi.object().keys({
    namaproduk: namaproduk.empty(''),
    deskripsi: deskripsi.empty(''),
    harga: harga.empty(''),
    jumlah: jumlah.empty(''),
})

module.exports = {
    'create': createSchema,
    'update': updateSchema
}