const Admin = require("../model/adminModel");
const Booking = require("../model/BookingModel");
const Product = require("../model/productModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel"); // Assuming user model exists
const mongoose = require('mongoose');
const SECRET_KEY = "AdminHS19";

// Other controller functions (register, login, etc.) remain unchanged

const calculateTotal = async (products, start_date, end_date, start_shift, end_shift) => {
    const millisecondsPerShift = 12 * 60 * 60 * 1000; // 12 hours
    const start = new Date(start_date).getTime() + (start_shift === 'PM' ? millisecondsPerShift : 0);
    const end = new Date(end_date).getTime() + (end_shift === 'PM' ? millisecondsPerShift : 0);
    const numberOfShifts = Math.ceil((end - start) / millisecondsPerShift);

    let totalCost = 0;
    for (const item of products) {
        const product = await Product.findById(item.product_id);
        if (!product) {
            throw new Error(`Product not found: ${item.product_id}`);
        }
        totalCost += product.cost_per_shift * item.quantity * numberOfShifts;
    }

    return totalCost;
};

const createBooking = async (req, res) => {
    const { user_id, admin_id, products, start_date, start_shift, end_date, end_shift, booking_type } = req.body;

    // Debugging: Log the incoming request body
    console.log('Incoming request body:', req.body);

    try {
        if (!Array.isArray(products)) {
            return res.status(400).json({ message: 'Products must be an array' });
        }

        const productDetails = [];
        for (const item of products) {
            console.log(`Processing product ID: ${item.product_id}`);
            const product = await Product.findById(new mongoose.Types.ObjectId(item.product_id));
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product_id}` });
            }

            productDetails.push({
                product_id: product._id,
                quantity: item.quantity,
                cost_per_shift: product.cost_per_shift,
            });
        }

        if (user_id) {
            const user = await User.findById(user_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
        }

        if (admin_id) {
            const admin = await Admin.findById(admin_id);
            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }
        }

        const total_cost = await calculateTotalCost(productDetails, start_date, end_date, start_shift, end_shift);

        const newBooking = new Booking({
            user_id,
            admin_id,
            products: productDetails,
            start_date,
            start_shift,
            end_date,
            end_shift,
            total_cost,
            booking_type
        });

        await newBooking.save();
        res.status(201).json({ booking: newBooking });
    } catch (error) {
        console.error("Error creating booking:", error.message);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

module.exports = { createBooking };
