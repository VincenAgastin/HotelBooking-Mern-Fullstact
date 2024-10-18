const express = require('express');
const router = express.Router();
const RoomModel =require('../models/Room')
const HotelModel =require('../models/Hotel');
const { verifyAdmin } = require('../verifyToken');


router.post("/:hotelid",verifyAdmin,async(req,res)=>{
    const hotelId=req.params.hotelid;
    const newRoom = new RoomModel(req.body)

    try{
        const savedRoom=await newRoom.save()
        try{
            await HotelModel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}})
        }catch(err){
            console.log(err);
        }
        res.status(200).json(savedRoom)
    }catch(err){
        console.log(err);
    }
})




  //UPDATE

  router.put("/:id",verifyAdmin,async(req,res)=>{
    try{
        const updateRoom=await RoomModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(201).json(updateRoom)
    }catch(err){
        res.status(500).json(err)
    }
  })

  //DELETE

  

  router.delete("/:id",verifyAdmin,async(req,res)=>{
    const hotelId=req.params.hotelid;
     try{
            await HotelModel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}})
            
        }catch(err){
            console.log(err);
        }
    try{
        await RoomModel.findByIdAndDelete(req.params.id,{new:true});
        res.status(201).json("Room has been Deleted")
    }catch(err){
        res.status(500).json(err)
    }
  })

  //GET

  
  router.get("/:id",async(req,res)=>{
    try{
        const room=await RoomModel.findById(req.params.id)
        res.status(201).json(room)
    }catch(err){
        res.status(500).json(err)
    }
  })

    //GETALL

    
  
  router.get("/",async(req,res,next)=>{

    try{
        const rooms=await RoomModel.find()
        res.status(201).json(rooms)
    }catch(err){
        res.status(500).json(err)
    }
  })



  
  


// Export the router directly
module.exports = router;
