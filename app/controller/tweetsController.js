const Tweet = require('../models/Tweet')


module.exports.create = (req, res) => {
    const body = req.body
    const tweet = new Tweet(body)
    tweet.user = req.user._id
    tweet.save()
        .then(user => {
            if(tweet){
                res.send(tweet)
            }
        })
        .catch(err => {
            res.send(err)
        })
}


module.exports.list = (req, res) => {
    Tweet.find({ user : req.user._id })
        .then(tweets => {
            if(tweets){
                res.send(tweets)
            }
        })
        .catch(err => {
            res.send(err)
        })
}


module.exports.destroy = (req, res) => {
    const id = req.params.id
    Tweet.findOne({ _id : id })
        .then(tweet => {
            res.send(tweet)
        })
        .catch(err => {
            res.send(err)
        })
}


module.exports.show = (req, res) => {
    const id = req.params.id
    const { user } = req
    Tweet.findOne({ _id : id, user : user._id })
        .then(tweet => {
            if(tweet){
                res.send(tweet)
            }
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.edit = (req, res) => {
    const id = req.params.id
    const body = req.body
    const { user } = req
    Tweet.findOneAndUpdate({ _id : id, user : user._id }, body, { new : true })
        .then(tweet => {
            if(tweet){
                res.send(tweet)
            }
        })
        .catch(err => {
            res.send(err)
        })
}

module.exports.search = (req, res) => {
    const hashtag = "#" + req.query.hashtag
    Tweet.find({ hashtag } ).populate('user', ['username'])
        .then(tweets => {
            res.send(tweets)
        })
        .catch(err => {
            res.send(err)
        })
}