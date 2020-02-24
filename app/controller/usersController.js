const _ = require('lodash')
const User = require ('../models/User')
const Tweet = require('../models/Tweet')

module.exports.register =  (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(user => {
            res.send(_.pick(user, ['_id', 'username', 'email']))
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.login = (req, res) => {
    const body = req.body
    User.findByCredentials(body)
        .then(function(user) {
            return user.generateToken()
        })
        .then(function(data) {
            res.send(data)
        })
        .catch(err => {
            res.send({ error: err })
        })
    }

module.exports.account = (req, res) => {
    const { user } = req
    res.send(_.pick(user, ['_id', 'username', 'email', 'following']))
}



module.exports.logout =  (req, res) => {
    const { user, token } = req
    User.findOneAndUpdate({ user :  user._id }, { $pull : { tokens : { token : token }}}) 
        .then(() => {
            res.send({ notice : "successfully logged out"})
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.update = (req, res) => {
    const body = req.body
    const { user } = req
    User.findOneAndUpdate({ _id : user._id }, body, { new : true })
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.listFeed = (req, res) => {
    Tweet.find({ user : [...req.user.following, req.user._id]}).populate('user', ['_id', 'username'])
        .then(tweets => {
            res.send(tweets)
        })
}

module.exports.search = (req, res) => {
    const username = req.params.name
    User.findOne({ username })
        .then(user => {
            if(user){
                //console.log(user)
                Tweet.find({ user : user._id})
                    .then(tweets => {
                        res.send({user, tweets})
                    })
            }else{
                res.send({notice : 'user not found'})
            }
        })
        .catch(err => {
            res.send(err)
        })
}