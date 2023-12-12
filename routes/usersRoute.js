const express = require('express');
const usersRoute = express.Router();
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');




//Register User
usersRoute.post('/register', asyncHandler(async(req,res) => {
    const {name, email, password} = req.body;
    const userExits = await User.findOne({email: email});
    if(userExits){
        throw new Error('User Exist');
    }
    const userCreated = await User.create({ name,email,password});
    res.json({
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      password: userCreated.password,
      token: generateToken(userCreated.id),
   })
}))
//Login User
  usersRoute.post('/login', asyncHandler(async(req, res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && await user.isPasswordMatch(password)){
      res.status(200);
      res.json({
         id: user.id,
         name: user.name,
         email: user.email,
         password: user.password,
         token: generateToken(user.id),
      })
    }else{
      res.status(401);
      throw new Error('Invalid Credentials');
    }
  })
  )
//update User
usersRoute.put('/:id', asyncHandler( async(req,res) => {
   const updatedUser = await User.findById(req.params.id);
   if(updatedUser){
       const updatedUser = await User.findByIdAndUpdate(
           req.params.id, 
           req.body, 
           {
               new: true,
           }
       );
       res.status(200);
       res.json(updatedUser);
   }else{
       throw new Error('Update Failed')
   }
})
); 
//delete User
usersRoute.delete('/:id', asyncHandler( async(req,res) => {
   try{
       const deletedUser = await User.findByIdAndDelete(req.params.id);
       res.status(200);
       res.send(deletedUser);
}catch(error){
   res.json(error);
}
})
);
//Get all User
 usersRoute.get('/fetch', asyncHandler( async(req,res) => {
    try{
      const getUsers = await User.find({});
      res.status(200);
      res.json(getUsers);
    }catch(error){
      res.status(500);
      throw new Error(error);
    }
 })
 );
module.exports = usersRoute;
