const mongoose = require('mongoose')

const Enroll = require('../mongoose/enroll')
const Users = require('../mongoose/user')
const Deli = require('../mongoose/delivery')

const getDeli = async (req,res,next)=>{
   
    let deli 
    try {
        deli = await Deli.find({}).sort({ _id: -1 })
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({deli: deli.map(each=> each.toObject({getters:true}))})
    
   
    
}

const searchenroll = async (req,res,next)=>{
   
    let enroll 
    const did =req.body.did
    
    const query = []
    did.map(each=> query.push(mongoose.Types.ObjectId(each)))
    try {
        enroll = await Enroll.find({
            '_id': { $in:
            query
            }
        })
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({enroll: enroll.map(each=> each.toObject({getters:true}))})
    
   
    
}

const postDeli = async(req,res,next)=>{
    const { enrollment }=req.body
    let collect_book = []
    let totalQ 
    let enroll = await Enroll.findById(enrollment)
    
    enroll.course.map(each=>
       collect_book = [...collect_book.concat(each.course.books)]
        )
        totalQ = collect_book.length
        const {buyer, date,  address,phoneNumber } = req.body
        
    try{
        const createdDeli = new Deli({
            buyer, date, enrollment, totalQuantity:totalQ, books:collect_book, address,phoneNumber
        })
        const newOne = await createdDeli.save()
        
        res.status(201).json({createdDeli: newOne.toObject({getters:true})})
        
        }
        catch(err){
            const error = new Error("There is a problem in adding to delivery")
            error.code = 500
            return next(error)
    
        }
       
    
    }

const deleteDeli =async(req,res,next)=>{
    const did =req.params.did
    let deli
    let enrollment
    deli = await Deli.findById(did)
    enrollment = await Enroll.findById(deli.enrollment)
    try{
    // console.log(enrollment)
    enrollment.status = 'pending'
    await enrollment.save()
    await deli.remove()
    }
    catch(err){
        const error = new Error("There is a problem in deleting to delivery")
        error.code = 500
        return next(error)
    }
    res.status(200).json({ message: 'Deleted delivery.' });
}
  

exports.getDeli = getDeli
exports.postDeli = postDeli
exports.deleteDeli = deleteDeli