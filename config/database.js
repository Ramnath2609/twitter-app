const mongoose= require('mongoose')
require('dotenv').config()

const setUpDB = () => {
    mongoose.connect("mongodb+srv://ramanthdb:mz4258%46Y%42X]%35S?H@cluster0-mhiwr.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser : true, useUnifiedTopology : true }, () => {
        console.log('connected to db')
    })
}

module.exports = setUpDB