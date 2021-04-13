const User = require('./user.model')
const ReturnObj = require('./../models/return-object.model')
const jwtService = require('./../../server/auth/jwt.service')

module.exports = {
  login: async function (req, res) {
    console.log(req.body)
    try {
      const _username = req.body.Username
      const _password = req.body.Password
      
      if (_username && _password) {
        const _user = await User.findOne({ Username: _username }).exec()
        if (_user) {
          var isMatch = await _user.comparePassword(_password)
          if (isMatch) {
            var jwt = await jwtService.generateJwt({ _id: _user._id, Username: _username })
            
            const _data = {
              _id: _user._id,
              token: jwt,
              Name: _user.Name,
              Surname: _user.Surname,
              Username: _user.Username
            }
            console.log(_data)

            res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS_LOGIN', 200, _data))
          } else {
            throw new Error('USER_PSW_NOT_MATCH')
          }
        } else {
          throw new Error('USER_DOES_NOT_EXIST')
        }
      } else {
        throw new Error('USERNAME_OR_PASSWORD_NOT_PROVIDED')
      }
    } catch (error) {
      res.status(200).send(new ReturnObj(false, 'ERR_INVALID_CREDENTIALS', 401, null))
    }
  },

  register: async function (req, res) {
    console.log(req.body)
    try {
      const _user = new User(req.body)
      const _existing = await User.findOne({ $or: [{ Username: _user.Username }] }).exec()
      if (_existing) {
        throw new Error('ERR_THIS_USER_EXISTS')
      } else {
        const _userData = await _user.save()
        var jwt = await jwtService.generateJwt({ _id: _userData._id, Username: _userData.Username })
        const _data = {
          _id: _userData._id,
          token: jwt,
          Name: _userData.Name,
          Surname: _userData.Surname,
          Username: _userData.Username
        }
        res.status(200).send(new ReturnObj(true, 'MSG_SUCCESS_REGISTER', 200, _data))
      }
    } catch (error) {
      res.status(200).send(new ReturnObj(false, error.message || 'ERR_SOMETHING_WENT_WRONG', 500, null))
    }
  }
}
