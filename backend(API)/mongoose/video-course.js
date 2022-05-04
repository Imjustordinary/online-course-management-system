const mongoose = require('mongoose')

const videoCourseSchema = new mongoose.Schema({
    video: { type: String , required:true},
})

module.exports = mongoose.model('Video',videoCourseSchema)