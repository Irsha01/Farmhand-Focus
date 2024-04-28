const mongoose = require('mongoose');

// Define the schema for the product
const ordersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    orderid: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    products: [{
        type: {
            name: String,
            price: Number,
            productId: Number,
            description: String,
            quantity: Number,
            _id:String
        },
        required: false
    }],
    totalamount: {
        type: Number,
        required: true
    },

});

// Create a model based on the schema
const Orders = mongoose.model('Orders', ordersSchema);

// Export the model to make it accessible in other files
module.exports = Orders;
