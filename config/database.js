const mongoose= require('mongoose')
require('dotenv').config()

const setUpDB = () => {
    mongoose.connect(process.env.DB_URI || "mongodb://localhost:27017/twitter-app", { useNewUrlParser : true, useUnifiedTopology : true }, () => {
        console.log('connected to db')
    })
}

module.exports = setUpDB