const userValidator = require('./user.validator')
const produkValidator = require('./produk.validator')
const artikelValidator = require('./artikel.validator')
const subscribeValidator = require('./subscribe.validator')

module.exports = {

    // User validation
    'user': userValidator,

    // prduk validation
    'produk': produkValidator,

    //artikel validation
    'artikel': artikelValidator,

    //subscribe validation
    'subscribe': subscribeValidator,
}