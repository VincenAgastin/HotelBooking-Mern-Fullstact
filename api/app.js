const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors=require('cors')
//cookie-parser
const cookieparser=require('cookie-parser')

//Using bcrypt
const bcrypt = require('bcrypt');
// Load environment variables
dotenv.config();

// Import routers
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/users.js');
const roomsRouter = require('./routes/rooms.js');
const hotelsRouter = require('./routes/hotels.js');
const HotelModel = require('./models/Hotel.js');

// Middleware to parse incoming requests
app.use(cors())
app.use(cookieparser())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON payloads

// Function to connect to the database
async function getDatabase() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to the database');
      // Fetch hotels after a successful connection
      // const hotelss = await HotelModel.find({ city: { $in: ["berlin", "madrid", "london"] } });
      // console.log('Hotels:', hotelss); // Log the results
  } catch (err) {
    console.error('Database Connection Error!', err);
  }
}

// MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB Disconnected!');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected!');
});






// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);



app.use((err,req,res,next)=>{          //*****Error Handlingg */
  const errorStatus=err.status || 500
  const errorMessgae=err.message || "Something went wrong"
  return res.status(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessgae,
    stack:err.stack
  })
})


// Connect to the database before starting the server
getDatabase().then(() => {
  // Start the server
  app.listen(8800, () => {
    console.log('Running server on port 8800');
  });
});
