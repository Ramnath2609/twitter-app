const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tweetSchema = new Schema({
    body : {
        type : String
    },
    hashtag : [
        {
            type : String
        }
    ],
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    createdAt : {
        type : Date,
        default : new Date
    }
})


const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet