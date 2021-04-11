const jwt = require('jsonwebtoken')

// const jwtSecret = "asdiouopasudoqiuwelkqjwelkjdl;asd;asdl;qiloweuqiowe" || "Asdasdiopausiodehqwiehqoewopqwieoqweoiqjw"
const jwtSecret = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
const jwtTimeout = process.env.JWT_TIMEOUT || 8640000

module.exports = {
  generateJwt: async function (payload) {

    var token = await jwt.sign(payload, jwtSecret, {
      expiresIn: + jwtTimeout
    })
    console.log("jwtTimeout:", jwtTimeout)
    return token
  }
}
