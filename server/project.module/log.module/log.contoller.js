const express = require('express')

const router = express.Router({mergeParams: true})

const logService = require('./log.service')

router.get('/list', logService.list)
router.get('/listAll', logService.listAll)
module.exports = router