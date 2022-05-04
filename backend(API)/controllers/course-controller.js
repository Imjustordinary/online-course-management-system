const mongoose = require('mongoose')

const Courses = require('../mongoose/course')
const Staffs = require('../mongoose/staff')

const getCourses = async (req,res,next)=>{
   const id =req.params.cid
   if(id){
    let course 
    try {
        course = await Courses.findById(id)
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({course: course.toObject({getters:true})})
   }
    let course 
    try {
        course = await Courses.find({}).sort({ _id: -1 }).populate('creator')
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({course: course.map(each=> each.toObject({getters:true}))})
    
   
    
}

const filterCourses = async(req,res,next)=>{

    const filter =req.params.filter
    let course 
    try {
        course = await Courses.find({category:filter}).sort({ _id: -1 }).populate('creator')
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({course: course.map(each=> each.toObject({getters:true}))})

}

const postCourses = async(req,res,next)=>{
    const id =req.params.sid
   
    if(id){
     
     try {
        let staff 
        const {name,type,price, category, books, description,date, course, preview} = req.body
        const createCourse = new Courses({
            name ,type,category, preview,date, image:req.file.path, course, books,price, description,creator:id
        })
         staff = await Staffs.findById(id)
         console.log('new course :',createCourse)

        try {
        const sess = await mongoose.startSession()
        sess.startTransaction()
        await createCourse.save({session: sess})
        staff.courses.push(createCourse)
        await staff.save({session: sess})
        await sess.commitTransaction()
        res.status(201).json({output:createCourse.toObject({getters:true})})
    }
    catch(err){
        const error = new Error('Creating course failed')
         error.code = 500
         return next(error)
    }
     }
     catch(err){
         const error = new Error('There is an error in adding course')
         error.code = 500
         return next(error)
     }
       
        
        }
       
    
    }

const deleteCourses = async(req,res,next)=>{
const id =req.params.cid

if(id){
    
    let course
    try {
   
        course = await Courses.findById(id).populate('creator')
        if(!course){
            const error = new Error('There is no a such course')
        error.code = 500
        return next(error)
        }
        const sess = await mongoose.startSession()
            sess.startTransaction()
            const output = await course.remove({session: sess})
            course.creator.courses.pull(course)
            await course.creator.save({session: sess})
            await sess.commitTransaction()
    
        res.status(200).json({message:"deleted"})
    }
    catch(err){
        const error = new Error('There is an error in deleting course')
        error.code = 500
        return next(error)
    }
    
    
    }
    

}

const updateCourse = async (req,res,next)=>{
    const id = req.params.cid
    try{
        const getCourse = await Courses.findById(id)
        if(!getCourse){
            const error = new Error("There is not such course as this one")
            error.code = 404
            throw error
        }
        const {name,type, category, books, description, price} = req.body
        getCourse.name = name
        getCourse.books = books
        getCourse.description = description
        getCourse.category = category
        getCourse.type = type
        getCourse.price = price
        await getCourse.save()
        res.status(200).json({updatedCourse:getCourse.toObject({getters:true})})

    }
    catch(err){
        const error = new Error("There is error in finding course")
    error.code = 404
    throw error
    }
}


exports.updateCourse = updateCourse
exports.getCourses = getCourses
exports.postCourses = postCourses
exports.deleteCourses = deleteCourses
exports.filterCourses = filterCourses