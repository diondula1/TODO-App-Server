
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = require('./category.module/category.model') 


const ProjectSchema = new Schema({
    Title: String,
    Members: [{ type: Schema.Types.ObjectId, ref: 'AppUser' }],
    Categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    CreatedDate: { type: Date, default: Date.now() },
    CreatedBy: Schema.Types.ObjectId,
})



var ProjectModel = mongoose.model('Project', ProjectSchema)
module.exports = ProjectModel