const joi = require('joi')

// sub schema
const judul = joi.string()
const penulis = joi.string()
const konten = joi.string()
const tanggalposting = joi.string()

// Create Validator Schema
const createSchema = joi.object().keys({
    judul: judul.required(),
    penulis: penulis.required(),
    konten: konten.required(),
    tanggalposting: tanggalposting.required(),

});

// Update Validator Schema
const updateSchema = joi.object().keys({
    judul: judul.empty(''),
    penulis: penulis.empty(''),
    konten: konten.empty(''),
    tanggalposting: tanggalposting.empty(''),
})

module.exports = {
    'create': createSchema,
    'update': updateSchema
}