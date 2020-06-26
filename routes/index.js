const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const home = require('./modules/home')
const todo = require('./modules/todo')
const auth = require('../middleware/auth').authenticator

router.use('/users', user)
router.use('/todos',  todo)
router.use('/',  home)



module.exports = router 