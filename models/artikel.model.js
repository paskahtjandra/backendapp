module.exports = (sequelize, Sequelize) => {
    const artikel = sequelize.define('artikels', {
        judul: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        penulis: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        konten: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        tanggalposting: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        gambar: {
            type: Sequelize.STRING,
            allowNull: false,
        }

    })
    return artikel
}