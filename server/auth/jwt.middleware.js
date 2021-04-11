const jwt = require('jsonwebtoken')
const apiRoutes = require('express').Router()
// const config = require('./../../env/config.json')
const ReturnObj = require('../models/return-object.model')
const jwtSecret = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
apiRoutes.use(function (req, res, next) {

  var token = req.headers['Authorization'] || req.headers['x-access-token'] || req.headers['authorization']

  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        
        return res.status(401).send(new ReturnObj(false, 'ERR_NOT_AUTHORIZED', 401, err))
      } else {
        
        req.caller_id = decoded._id // only caller id
        next()
      }
    })
  } else {
   
    return res.status(401).send(new ReturnObj(false, 'ERR_NOT_AUTHORIZED', 401, null))
  }
})

module.exports = apiRoutes
