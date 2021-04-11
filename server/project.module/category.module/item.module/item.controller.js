const express = require('express')
const router = express.Router({ mergeParams:true })
const itemService = require('./item.service')

router.post('/save', itemService.save)
router.delete('/delete', itemService.remove)

module.exports = router