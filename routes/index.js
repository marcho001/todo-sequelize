const express = require('express')
const router = express.Router()
const user = require('./modules/user')
const home = require('./modules/home')

router.use('/users', user)
router.use('/', home)



module.exports = router