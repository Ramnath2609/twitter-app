const router = require('express').Router()
const usersController = require('../app/controller/usersController')
const authenticateUser = require('../app/middlewares/authentication')
const tweetsController = require('../app/controller/tweetsController')

//users
router.post('/user/register', usersController.register)
router.post('/user/login', usersController.login)
router.get('/account', authenticateUser, usersController.account)
router.delete('/logout', authenticateUser, usersController.logout)
router.put('/follow', authenticateUser, usersController.update)
router.get('/feeds', authenticateUser, usersController.listFeed)
router.get('/user/:name', authenticateUser, usersController.search)


//tweets
router.get('/tweets', authenticateUser ,tweetsController.list)
router.post('/tweets', authenticateUser, tweetsController.create)
router.get('/tweets/:id', authenticateUser, tweetsController.show)
router.delete('/tweets/:id', authenticateUser, tweetsController.destroy)
router.put('/tweets/:id', authenticateUser, tweetsController.edit)
router.get('/search/tweets', authenticateUser, tweetsController.search)

module.exports = router