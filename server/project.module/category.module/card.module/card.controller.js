const express = require('express')
const router = express.Router({ mergeParams:true })
const cardService = require('./card.service')

router.post('/add', cardService.save)
router.delete('/delete', cardService.remove)

module.exports = router