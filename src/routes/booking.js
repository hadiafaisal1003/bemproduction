const express= require ("express");
const { createBooking } = require('../controller/bookingController');
const bookingRouter= express.Router();

bookingRouter.post("/createbooking",createBooking)

bookingRouter.post("/aadd",(req,res)=>{
    res.send("this is add product page")
});

module.exports=bookingRouter;