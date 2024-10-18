export const createHotel=async(req,res,next)=>{
    const newHotel = new HotelModel(req.body);
    try {
      const savedHotel = await newHotel.save();
      res.status(201).json(savedHotel); // Return the saved hotel with status 201
    } catch (err) {
      res.status(500).json(err);
    }
}


export const updateHotel=async(req,res,next)=>{
    try{
        const updateHotel=await HotelModel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(201).json(updateHotel)
    }catch (err) {
      res.status(500).json(err);
    }
}




export const deleteHotel=async(req,res,next)=>{
    try{
        await HotelModel.findByIdAndDelete(req.params.id,{new:true});
        res.status(201).json("Hotel has been Deleted")
    }catch (err) {
      res.status(500).json(err);
    }
}



export const getHotel=async(req,res,next)=>{
    try{
        const hotel=await HotelModel.findById(req.params.id)
        res.status(201).json(hotel)
    }catch (err) {
      res.status(500).json(err);
    }
}


export const getAllHotel=async(req,res,next)=>{
    try{
        const hotels=await HotelModel.find()
        res.status(201).json(hotels)
    }catch (err) {
        res.status(500).json(err);
      }
}