const Staffs = require('../mongoose/staff')


const getStaffs = async (req,res,next)=>{
   const id =req.params.sid
   if(id){
    let staff 
    try {
        staff = await Staffs.findById(id)
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
   
    res.status(200).json({staff: staff.toObject({getters:true})})
   }
   else{
    let staff 
    try {
        staff = await Staffs.find({})
        
    }
    catch(err){
        const error = new Error('The place id you are looking for is not here')
        error.code = 500
        return next(error)
    }
    res.status(200).json({staff: staff.map(each=> each.toObject({getters:true}))})
}
   
    
}

const postStaff = async(req,res,next)=>{
   
    
        const {name, role, department, description, email, password} = req.body
        
    try{
        const createStaff = new Staffs({
            name, status:"active", role, department, email, password, description, image: req.file.path, courses:[]
        })
        const newOne = await createStaff.save()
        
        res.status(201).json({createStaff: newOne.toObject({getters:true})})
        
        }
        catch(err){
            const error = new Error("There is a problem in adding department")
            error.code = 500
            return next(error)
    
        }
       
    
    }

const updateStaff = async (req,res,next)=>{
    const id = req.params.sid
    const {name, email, department, password,description} = req.body
    try{
        const staff = await Staffs.findById(id)
        if(!staff){
            const error = new Error("There is not such staff as this one")
            error.code = 404
            throw error
        }
        
        
        staff.name = name
        staff.department = department
        staff.email = email
        staff.password = password
        staff.description = description

        await staff.save()
        res.status(200).json({staff:staff.toObject({getters:true})})
        

    }
    catch(err){
        const error = new Error("There is error in updating")
    error.code = 404
    return next(error)
    }
}


const loginStaff = async(req,res,next)=>{
   
        const { email, password } = req.body;
    
        let existingUser;
      
        try {
          existingUser = await Staffs.findOne({ email: email })
        } catch (err) {
          const error = new Error('Logging in failed, please try again later.')
            error.code = 500
            return next(error)
        }
    
        if (!existingUser) {
          const error = new Error('Inexistent user.')
            error.code = 400
            return next(error)
         
        }
      
        if (existingUser.password !== password) {
          const error = new Error('Wrong password')
            error.code = 400
            return next(error)
         
        }

        if(existingUser.status !== 'active' && existingUser.role !== 'admin'){
            const error = new Error('This account is deactived.')
            error.code = 400
            return next(error)
        }
      
        res.status(200).json({message: existingUser.toObject({getters:true})});
          
}

const statusUpdate = async (req,res,next)=>{
    const id = req.params.sid
    const {status} = req.body
    try{
        const staff = await Staffs.findById(id)
        if(!staff){
            const error = new Error("There is not such staff as this one")
            error.code = 404
            throw error
        }
        staff.status = status
        console.log(staff)
        await staff.save()
        res.status(200).json({staff:staff.toObject({getters:true})})
    }
    catch(err){
        const error = new Error("There is error in updating")
    error.code = 404
    return next(error)
    }
}


exports.updateStaff = updateStaff
exports.getStaffs = getStaffs
exports.postStaff = postStaff
exports.loginStaff = loginStaff
exports.statusUpdate = statusUpdate