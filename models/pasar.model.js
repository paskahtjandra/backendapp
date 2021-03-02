module.exports = (sequelize, Sequelize) => {
    const pasar = sequelize.define('pasars', {
        produk: {
            type: Sequelize.STRING
        },
        jumlah: {
            type: Sequelize.STRING
        },
        deskripsi: {
            type: Sequelize.STRING
        },
        gambar: {
            type: Sequelize.STRING
        },

    })
}