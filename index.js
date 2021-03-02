require('dotenv').config()
const express = require('express')
const app = express();
const db = require('./models')
const bodyparser = require('body-parser')

db.sequelize.sync({});

//routes
const userRoute = require('./routes/user.routes')
const pasarRoute = require('./routes/pasar.routes')

//bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//defining route
app.use('/user', userRoute)
app.use('/pasar',pasarRoute)

app.use('/', (req, res) => {
    res.send({
        message: "aplikasi berjalan"
    })
})

const PORT = process.env.APP_PORT || 4000
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})