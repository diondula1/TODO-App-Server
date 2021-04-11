const router = require('express').Router()

// Middlewares

const jwtMiddleware = require('./server/auth/jwt.middleware')

const auth = require('./server/user.module/user.controller')
const profile = require('./server/profile.module/profile.controller')
const project = require('./server/project.module/project.controller')

router.use('/auth', auth)

router.use(jwtMiddleware)

router.use('/profile', profile)
router.use('/project', project)

module.exports = router
