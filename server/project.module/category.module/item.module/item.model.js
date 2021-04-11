
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    Title: String,
    Description: String,
    Place: Number,
    Color: String,
    StartingDate: Date,
    EndingDate: Date,
    Category: { type: Schema.Types.ObjectId, ref: 'Category', index: true} ,
    Project: { type: Schema.Types.ObjectId, ref: 'Project', index: true} ,
    CreatedDate: { type: Date, default: Date.now()},
    CreatedBy: { type: Schema.Types.ObjectId, ref: 'AppUser', index: true } 
})

const ItemModel = mongoose.model('Item', ItemSchema)

module.exports = ItemModel