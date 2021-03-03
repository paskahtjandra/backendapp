const userValidator = require('./user.validator')
const produkValidator = require('./produk.validator')

module.exports = {
    // User validation
    'user': userValidator,

    // prduk validation
    'produk': produkValidator
}