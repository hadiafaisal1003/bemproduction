const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    cost_per_shift: {
        type: Number,
        required: true
    }
});
const bookingSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: false },
    admin_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: false },
        products: [
            productDetailSchema
        ],
    start_date: { 
        type: Date, 
        required: true },
    start_shift: { 
        type: String, 
        required: true },
    end_date: { 
        type: Date, 
        required: true },
    end_shift: { 
        type: String, 
        required: true },
    total_cost: { 
        type: Number, 
        required: true },
    boking_type: { 
        type: String, //either on call(manual) or online on website
    },
},{
        timestamp:true });

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;