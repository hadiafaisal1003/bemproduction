const express= require ("express");
const usersRouter=express.Router();


usersRouter.get("/profile",(req, res)=>{
    res.send("this is profile page")
});

module.exports=usersRouter;