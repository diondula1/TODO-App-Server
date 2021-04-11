
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ItemSchema = require('./item.module/item.model').schema


const CategorySchema = new Schema({
    Title: String,
    Items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    Place: Number,
    CreatedDate: { type: Date, default: Date.now() },
    Project: { type: Schema.Types.ObjectId, ref: 'Project' },
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'AppUser', index: true }
})


const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = CategoryModel