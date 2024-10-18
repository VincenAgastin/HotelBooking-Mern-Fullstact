const express = require('express');
const UserModel = require('../models/User.js');
const { verifyToken,verifyUser, verifyAdmin } = require('../verifyToken.js');
const router = express.Router();
const jwt =require('jsonwebtoken')


  //check

//   router.get("/checkauthentication",verifyToken,(req,res,next)=>{
//     res.send("Hello user, you are loggedIN")
//   })

  
//   router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
//     res.send("Hello user, you are login your account and you can delete  your account")
//   })
  
//   router.get("/checkadmin/:id",verifyAdmin, (req, res, next) => {
//     res.send("Hello ADMIN, you can delete all accounts");
// });

  //UPDATE

  router.put("/:id",verifyUser,async(req,res)=>{
    try{
        const updateUser=await UserModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(201).json(updateUser)
    }catch(err){
        res.status(500).json(err)
    }
  })

  //DELETE

  router.delete("/:id",verifyUser,async(req,res)=>{
    try{
        await UserModel.findByIdAndDelete(req.params.id,{new:true});
        res.status(201).json("Hotel has been Deleted")
    }catch(err){
        res.status(500).json(err)
    }
  })

  //GET

  
  router.get("/:id",verifyUser,async(req,res)=>{
    try{
        const user=await UserModel.findById(req.params.id)
        res.status(201).json(user)
    }catch(err){
        res.status(500).json(err)
    }
  })

    //GETALL

    
  
  router.get("/",verifyAdmin,async(req,res,next)=>{

    try{
        const users=await UserModel.find()
        res.status(201).json(users)
    }catch(err){
        res.status(500).json(err)
    }
  })






  

// Export the router directly
module.exports = router;

