const mongoose = require('mongoose')

const deliSchema = new mongoose.Schema({
    
    buyer:{type: String , required:true},
    date:{type: String , required:true},
    enrollment:{type: String , required:true},
    totalQuantity:{type: String , required:true},
    books:{type: Array , required:true},
    address:{type: String , required:true},
    phoneNumber:{type: String , required:true},
    
})

module.exports = mongoose.model('Delivery',deliSchema)