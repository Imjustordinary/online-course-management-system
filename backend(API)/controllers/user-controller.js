const { validationResult } = require('express-validator');

const Users = require('../mongoose/user')

const HttpError = require('../mongoose/https-error');

const loginUser = async (req,res,next)=>{
   
    const { email, password } = req.body;
  
    let existingUser;
  
    try {
      existingUser = await Users.findOne({ email: email })
    } catch (err) {
      const error = new Error('Logging in failed, please try again later.')
        error.code = 500
        return next(error)
    }

    if (!existingUser) {
      const error = new Error('Typed email does not exists.')
        error.code = 400
        return next(error)
     
    }
  
    if (existingUser.password !== password) {
      const error = new Error('Wrong password')
        error.code = 400
        return next(error)
     
    }
  
    res.json({existingUser: existingUser.toObject({ getters: true })});
   
    
}

const signupUser = async(req,res,next)=>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Invalid inputs passed, please check your data.')
        error.code = 422
        return next(error)
     
      
    }
    const { name, email, password } = req.body;
  
    let existingUser
    try {
      existingUser = await Users.findOne({ email: email })
    } catch (err) {

      const error = new Error('Signing up failed, please try again later.')
      error.code = 422
      return next(error)

      
    }
    
    if (existingUser) {
      const error = new Error("User already exists. Why don't you login instead?")
        error.code = 401
        return next(error)
    }
    
    const createdUser = new Users({
      name,
      email,
      image: req.file.path,
      password,
      status:'active'
    });
  
    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
  
    res.status(201).json({user: createdUser.toObject({ getters: true })});
  };
    

const updateUser = async(req,res,next)=>{
  const userID =req.params.uid
  const { name, email, password } = req.body;
  try{
    const user = await Users.findById(userID)
    if(!user){
        const error = new Error("There is not such staff as this one")
        error.code = 404
        throw error
    }
    user.name = name
    user.email = email
    user.password = password
    await user.save()
    res.json({user: user.toObject({ getters: true })});
}
catch(err){
  const error = new HttpError(
    'There is an error in updating',
    401
  );
  return next(error);
}

}

const getUser = async (req,res,next)=>{
  const userID =req.params.uid

  let existingUser;

  try {
    existingUser = await Users.findById(userID)
  } catch (err) {
    const error = new Error("There aren't any user!")
      error.code = 500
      return next(error)
  }

  if (!existingUser) {
    const error = new Error("There aren't any user!")
      error.code = 400
      return next(error)
   
  }
  res.json({existingUser: existingUser.toObject({ getters: true })});
}

const controlUser = async (req,res,next)=>{
  const userID =req.params.uid

  let existingUser;

  try {
    existingUser = await Users.findById(userID)
  } catch (err) {
    const error = new Error("There aren't any user!")
      error.code = 500
      return next(error)
  }

  if (!existingUser) {
    const error = new Error("There aren't any user!")
      error.code = 400
      return next(error)
   
  }
  if(existingUser.status === 'active'){
  existingUser.status = 'inactive'
  await existingUser.save()
  }
  else if(existingUser.status !== 'active'){
    existingUser.status = 'active'
  await existingUser.save()
  }
  res.json({message:'successed'});
}

const getUsers = async (req,res,next)=>{
  

  let existingUser;

  try {
    existingUser = await Users.find({}).sort({ _id: -1 })
  } catch (err) {
    const error = new Error("There aren't any user!")
      error.code = 500
      return next(error)
  }

  

  

  res.json({existingUser: existingUser.map(each=> each.toObject({getters:true}))});
 
  
}

exports.loginUser = loginUser
exports.signupUser = signupUser
exports.updateUser = updateUser
exports.getUser = getUser
exports.getUsers = getUsers
exports.controlUser = controlUser