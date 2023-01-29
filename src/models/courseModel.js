const mongoose = require('mongoose')
const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    video: String,
    duration: String,
    topics:[String],
    category: String,
    approved: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false }
},{strict:false})
module.exports = mongoose.model('course', courseSchema)