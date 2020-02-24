const mongoose = require('mongoose')
const Schema = mongoose.Schema
const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const userSchema = new Schema({
    username : {
        type : String,
        minlength : 5,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        validate : {
            validator : function(value){
                return validator.isEmail(value)
            },
            message : function(){
                return 'enter a valid email'
            }
        }
    },
    password : {
        type : String,
        minlength : 6,
        required : true
    },
    following : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Tweet'
        }
    ],
    mobile : {
        type : String,
        required : true,
        minlength : 10,
        maxlength : 10
    },
    tokens : [
        {
            token : {
                type : String
            },
            createdAt : {
                type : Date,
                default : new Date()
            }
        }
    ]
})


//pre hooks
userSchema.pre('save', function (next) {
    const user = this
    if(user.isNew) {
        bcryptjs.genSalt(10)
            .then(function (salt) {
                bcryptjs.hash(user.password, salt)
                    .then(function (encryptedPassword) {
                        user.password = encryptedPassword
                        next()
                    })
                    .catch(err => {
                        console.log(err)
                    })
        }) 
    } else {
        next()
    }
   
})


//own instance methods
userSchema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        _id : user._id,
        username : user.username,
        createdAt : Number(new Date())
    }
    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({ token })
    return user.save()
                .then(function (user) {
                    user = _.pick(user, ['_id', 'email', 'username'])
                    return Promise.resolve({ user , token })
                })
                .catch(err => {
                    return Promise.reject(err)
                })

}


//own static methods
userSchema.statics.findByCredentials = function (body) {
    const User = this
    //console.log(_.pick(body, ['username', 'email']))
    return User.findOne(_.pick(body, [ 'username', 'email' ]))
                .then(function (user) {
                    if (!user) {
                        return Promise.reject('invalid email or password')
                    }
                    return bcryptjs.compare(body.password, user.password)
                                .then(result => {
                                    if (result) {
                                        return Promise.resolve(user)
                                    } else {
                                        return Promise.reject('invalid email or password')
                                    }
                                })
                })
}

userSchema.statics.findByToken = function (token) {
    const User = this
    let tokenData 
    try {
        tokenData = jwt.verify(token, 'jwt@123')
    } catch(err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id : tokenData._id,
        'tokens.token' : token
    })
}


const User = mongoose.model('User', userSchema)

module.exports = User