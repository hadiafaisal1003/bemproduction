const mongoose=require("mongoose");

const productSchema = new mongoose.Schema({
    category_name: { 
        type: String, 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    brand: {String},
    description: {String},
    quantity:{
        type: Number, 
        required:true
    },
    is_available: { 
        type: Boolean, 
        default: true 
    },
    cost_per_shift: { 
        type: Number, 
        required: true },
        img_url: {String},
  });
  
module.exports = mongoose.model('Product', productSchema);