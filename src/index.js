const express= require ("express");
const mongoose = require("mongoose");
const usersRouter= require("./routes/users");
const adminRouter=require("./routes/admin");
const bookingRouter=require("./routes/booking");
const app=express();
const port=5000;


app.use(express.json());
app.use("/user", usersRouter);
app.use("/admin", adminRouter);
app.use("/manage", bookingRouter);


app.get("/",(req, res)=>{
    res.send("this is home page")
});


mongoose.connect("mongodb://localhost:27017")
.then(()=>{
    console.log("mongodb connected")
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    });

}).catch((error)=>{
    console.log(error)
});
