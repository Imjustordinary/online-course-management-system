const mongoose = require('mongoose')

const departmentsSchema = new mongoose.Schema({
    title: { type: String , required:true},
    
})

module.exports = mongoose.model('Department',departmentsSchema)