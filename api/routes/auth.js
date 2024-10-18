const express = require('express');
const UserModel = require('../models/User.js');
const router = express.Router();
const bcrypt = require('bcrypt');

//json webToken
const jwt =require('jsonwebtoken')
    





// GET / - Main route for the auth endpoint
router.post("/register",async (req, res,next) => {
    try{

        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt)


        const newUser=new UserModel({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })

        await newUser.save()

        res.status(200).send("User has been Created")
    }catch(err){
        next(err)
    }
});


router.post("/login", async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).send("Invalid username ");
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).send("Invalid  password");
        }

        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT,{ expiresIn: '1h' })



        const {password,isAdmin,...otherDetails} =user._doc
        
        

        // If login is successful
        res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).send(otherDetails);
    } catch (err) {
        next(err);
    }
});


// Export the router directly
module.exports = router;
