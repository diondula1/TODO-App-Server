const express = require('express')
const router = express.Router({ mergeParams:true })
const categoryService = require('./category.service')
const itemController = require('./item.module/item.controller')

router.get('/list',  categoryService.list)
router.post('/save', categoryService.save)
router.delete('/delete', categoryService.remove)

//Child
router.use('/:category_id/item', itemController)

module.exports = router