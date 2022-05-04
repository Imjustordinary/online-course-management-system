const mongoose = require('mongoose')

const previewCourseSchema = new mongoose.Schema({
    preview: { type: String , required:true},
})

module.exports = mongoose.model('Preview',previewCourseSchema)