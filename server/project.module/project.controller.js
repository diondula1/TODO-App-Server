const { Router } = require('express')
const express = require('express')
const router = express.Router()
const projectService = require('./project.service')
const memberController = require('./member.module/member.controller')
const catergoryController = require('./category.module/category.controller')
const logController = require('./log.module/log.contoller')

router.get('/list', projectService.list)
router.get('/:project_id', projectService.view)
router.post('/add', projectService.save)

//Child Modules
router.use('/:project_id/member', memberController)
router.use('/:project_id/category', catergoryController)
router.use('/:project_id/log', logController)

module.exports = router