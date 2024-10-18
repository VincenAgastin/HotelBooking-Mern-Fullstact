const express = require('express');
const router = express.Router();
const HotelModel = require('../models/Hotel.js');
const { verifyAdmin } = require('../verifyToken.js');



//CREATE

router.post('/',verifyAdmin, async (req, res) => {
  try {
      const newHotel = new HotelModel(req.body);
      const savedHotel = await newHotel.save();
      res.status(201).json(savedHotel); // Return the saved hotel with status 201
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATE

  router.put("/:id",verifyAdmin,async(req,res)=>{
    try{
        const updateHotel=await HotelModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(201).json(updateHotel)
    }catch(err){
        res.status(500).json(err)
    }
  })

  //DELETE

  router.delete("/:id",verifyAdmin,async(req,res)=>{
    try{
        await HotelModel.findByIdAndDelete(req.params.id,{new:true});
        res.status(201).json("Hotel has been Deleted")
    }catch(err){
        res.status(500).json(err)
    }
  })

  //GET

  
  router.get("/find/:id",async(req,res)=>{
    try{
        const hotel=await HotelModel.findById(req.params.id)
        res.status(201).json(hotel)
    }catch(err){
        res.status(500).json(err)
    }
  })

    //GETALL

    
  
router.get("/", async (req, res, next) => {
  const { min, max, limit, ...others } = req.query;

  const parsedMin = parseInt(min) || 1; 
  const parsedMax = parseInt(max) || 999; 
  const parsedLimit = parseInt(limit) || 0; 

  try {
    const hotels = await HotelModel.find({
      ...others, 
      cheapestPrice: { $gt: parsedMin, $lt: parsedMax },
    }).limit(parsedLimit); 

    res.status(200).json(hotels); 
  } catch (err) {
    res.status(500).json(err); 
  }
});


  router.get("/countByCity", async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map((city) => {
            return HotelModel.countDocuments({ city: city });
        }));
        res.status(200).json(list); // Changed status to 200
    } catch (err) {
        res.status(500).json(err);
    }
});


  router.get("/countByType",async(req,res,next)=>{
    

    try{
    const hotelCount=await HotelModel.countDocuments({type:"hotel"})
    const villaCount=await HotelModel.countDocuments({type:"villa"})
    const farmhouseCount=await HotelModel.countDocuments({type:"farmhouse"})
    const houseboatCount=await HotelModel.countDocuments({type:"houseboat"})
    const bungalowCount=await HotelModel.countDocuments({type:"bungalow"})

      res.status(200).json([
        {type:"hotel",count:hotelCount},
        {type:"villa",count:villaCount},
        {type:"farmhouse",count:farmhouseCount},
        {type:"houseboat",count:houseboatCount},
        {type:"bungalow",count:bungalowCount}
      ]);
    }catch(err){
        res.status(500).json(err)
    }
  })






  

// Export the router directly
module.exports = router;





