const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const home = require('./modules/home')
const todo = require('./modules/todo')
const auth = require('./modules/auth')
const authen = require('../middleware/auth').authenticator

router.use('/users', user)
router.use('/todos', authen, todo)
router.use('/auth', auth)
router.use('/', authen, home)



module.exports = router 