const express = require('express')
const router = express.Router({ mergeParams:true })
const cardService = require('./card.service')

router.post('/add', cardService.save)
router.delete('/delete/:id', cardService.remove)
router.get('/list',cardService.list)
router.post('/move/:newCategoryId', cardService.move)
module.exports = router