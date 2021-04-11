const express = require('express')
const router = express.Router()
const userService = require('./profile.service')

router.get('/view', userService.view)


module.exports = router
