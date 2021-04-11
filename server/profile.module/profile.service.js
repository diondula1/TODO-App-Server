const User = require('../user.module/user.model')
const ReturnObj = require('./../models/return-object.model')
const jwtService = require('./../../server/auth/jwt.service')

module.exports = {
    view: async function (req, res) {
        console.log(req.caller_id)
        User.findById({_id: req.caller_id}, function(err,example){
            if(err)
            res.err(err)
       
            res.json(example)
         })
    }
}