const express = require('express')
const router = require('./config/routes')
const app = express()
const cors = require('cors')
const path = require('path')
const setUpDB = require('./config/database')
//const port = 3791
const port = process.env.PORT || 3791
setUpDB()



app.use(cors())
app.use(express.json())
app.use('/', router)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"client/build"))) 
    app.get("*",(req,res) => { 
    res.sendFile(path.join(__dirname + "/client/build/index.html")) 
})
}



app.listen(port, () => {
    console.log('listening to port', port)
})