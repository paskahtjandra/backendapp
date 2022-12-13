module.exports = (sequelize, Sequelize) => {
    const produk = sequelize.define('produks', {
        namaproduk: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        harga: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        jumlah: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        deskripsi: {
            type: Sequelize.STRING,
            allowNull: false,
        }

    })
    return produk
}