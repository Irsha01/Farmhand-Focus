const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productId: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },

});

// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);

// Export the model to make it accessible in other files
module.exports = Product;
