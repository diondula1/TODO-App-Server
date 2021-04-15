
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CardSchema = require('./card.module/card.model').schema


const CategorySchema = new Schema({
    Title: String,
    Cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
    Place: Number,
    CreatedDate: { type: Date, default: Date.now() },
    Project: { type: Schema.Types.ObjectId, ref: 'Project' },
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'AppUser', index: true }
})


const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = CategoryModel