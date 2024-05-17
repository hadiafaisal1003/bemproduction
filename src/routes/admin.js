const express= require ("express");
const {register,login, addProduct, getProduct, searchProduct, updateProduct,deleteProduct}= require("../controller/adminController");
const { createBooking } = require('../controller/bookingController');
const adminRouter=express.Router();
const bookingRouter= express.Router();

adminRouter.post("/registration",register);
adminRouter.post("/login",login);
adminRouter.post("/addProduct",addProduct);
adminRouter.get("/getProduct",getProduct);
adminRouter.get("/searchProduct/:id",searchProduct);
adminRouter.put("/updateProduct/:id",updateProduct);
adminRouter.delete("/deleteProduct/:id",deleteProduct);
adminRouter.post("/createbooking",createBooking)


adminRouter.post("/add",(req,res)=>{
    res.send("this is add product page")
});

module.exports=adminRouter;