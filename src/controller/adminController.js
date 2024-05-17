const adminModel = require("../model/adminModel");
const Booking = require("../model/BookingModel.js")
const Product=require("../model/productModel");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");
const usersRouter = require("../routes/users");
const SECRET_KEY= "AdminHS19";

const register=async (req,res)=>{

    const {username, email,password}=req.body;
    try{
        const existAdmin=await adminModel.findOne({email:email});
        if(existAdmin){
            return res.status(400).json({message: "already exists"})
        }

        const hashedPassword=await bcrypt.hash(password,10);

        const result=await adminModel.create({
            username:username,
            email:email,
            password:hashedPassword,
        });

        const token=jwt.sign({email:result.email, id:result._id},SECRET_KEY);
        res.status(201).json({admin:result, token:token})

    } catch(error){
        console.log(error);
        res.status(500).json({message:`${error}`})
    }
    
}

const login=async(req,res)=>{
    const {username, password}=req.body;
    try{
        const existAdmin=await adminModel.findOne({username:username});
        if(!existAdmin){
            return res.status(401).json({message:"user not found"});
        }
        const matchPassword=await bcrypt.compare(password, existAdmin.password);
        if(!matchPassword){
            return res.status(401).json({message:"invalid password"});
        }
        const token =jwt.sign({username:existAdmin.username, id:existAdmin._id}, SECRET_KEY);
        res.status(201).json({email:existAdmin, token:token});

    } catch(error){
        console.log(error);
        res.status(500).json({message:`login error: ${error}`})
}
}

const addProduct = async (req, res) => {
    const {category_name, title, brand, description, quantity, is_available, cost_per_shift, img_url } = req.body;
  
     try {
    //   // Check if the category exists
    //   const category = await Category.findById(category_id);
    //   if (!category) {
    //     return res.status(404).json({ message: 'Category not found' });
    //   }
  
      // Create a new product using the Product model
      const newProduct = await Product.create({
        category_name,
        title,
        brand,
        description,
        quantity,
        is_available,
        cost_per_shift,
        img_url,
      });
  
      //Save the new product to the database
      //await newProduct.save();
  
      // Add the new product to the category's products array
    //   mongod

  
      res.status(201).json({ product: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

const getProduct = async(req, res)=>{
    try{
        const allProducts = await Product.find();
        if(!allProducts){
            return res.status(404).json({msg:"products not found"})
        }
        res.status(200).json(allProducts)

    } catch(error){
        console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const searchProduct= async(req, res)=>{
    try{
        const id=req.params.id;
        const productExist= await Product.findById(id);
        if(!productExist){
            return res.status(404).json({msg:"product not found"})
        }
        res.status(200).json(productExist);


    }catch(error){
        console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const updateProduct = async(req, res)=>{
    try{
        const id=req.params.id;
        const productExist= await Product.findById(id);
        if(!productExist){
            return res.status(401).json({msg:"product not found"})
        }
        const updatedProduct= await Product.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json(updatedProduct);
        


    }catch(error){
        console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteProduct = async(req, res)=>{
    try{
        const id=req.params.id;
        const productExist= await Product.findById(id);
        if(!productExist){
            return res.status(401).json({msg:"product not found"})
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({msg:"deleted successfuly"});
        


    }catch(error){
        console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports={register,login,addProduct,getProduct,searchProduct,updateProduct, deleteProduct }