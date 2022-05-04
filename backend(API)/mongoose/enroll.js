const mongoose = require('mongoose')

const enrollSchema = new mongoose.Schema({
    
    buyer:{type: String , required:true},
    date:{type: String , required:true},
    totalPrice:{type: String , required:true},
    totalQuantity:{type: String , required:true},
    course:{type: Array , required:true},
    address:{type: String , required:true},
    phoneNumber:{type: String , required:true},
    status:{type: String , required:true}
    
})

module.exports = mongoose.model('Enroll',enrollSchema)