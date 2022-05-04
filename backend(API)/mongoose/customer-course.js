const mongoose = require('mongoose')

const cusSchema = new mongoose.Schema({
    customer: { type: String , required:true},
    courses:{ type: Array , required:true}
    
})

module.exports = mongoose.model('Cus',cusSchema)