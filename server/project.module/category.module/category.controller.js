const express = require('express')
const router = express.Router({ mergeParams:true })
const categoryService = require('./category.service')
const cardController = require('./card.module/card.controller')

router.get('/list',  categoryService.list)
router.post('/add', categoryService.save)
router.delete('/delete', categoryService.remove)

//Child
router.use('/:category_id/card', cardController)

module.exports = router