const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LogSchema = new Schema({
    Description: String,
    Project: { type: Schema.Types.ObjectId, ref: 'Project', index: true} ,
    User: { type: Schema.Types.ObjectId, ref: 'AppUser', index: true} ,
    CreatedDate: { type: Date, default: () => Date.now() },
})

const LogModel = mongoose.model('Log', LogSchema)

module.exports = LogModel