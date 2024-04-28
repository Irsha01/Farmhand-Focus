const express = require('express');
const router = express.Router();
const User = require('../models/User');
//const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const Orders = require('../models/Orders');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');




async function getuserid() {
  try {
    const highestuserid = await User.findOne().sort({ userid: -1 });
    return highestuserid ? highestuserid.userid : 1; // Return 0 if no products exist
  } catch (error) {
    console.error('Error getting highest product ID:', error);
    return 0; // Return 0 in case of error
  }
}

/////////Signup Code
router.post('/signup', async (req, res) => {
    const { email, username, password, userid:highestuserid } = req.body;
  try {
    const userchk = await User.findOne({ email });
    if (userchk) {
      return res.status(404).json({ message: 'User Already Exist' });
    }
    const user = new User(req.body);
    
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});


async function getHighestProductId() {
  try {
    const highestProduct = await Product.findOne().sort({ productId: -1 });
    return highestProduct ? highestProduct.productId : 1; // Return 0 if no products exist
  } catch (error) {
    console.error('Error getting highest product ID:', error);
    return 0; // Return 0 in case of error
  }
}

//// Login

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (password != user.password) {
          return res.status(401).json({ message: 'Invalid password' });
      }
    
        // // Validate password
        // const isPasswordValid =await User.findOne({ password });
        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: 'Invalid password' });
        // }
  
      // Generate JWT token
      //const token = jwt.sign({ userId: user._id }, 'farmhand', { expiresIn: '1h' });
  
      // Send token in response
      res.status(200).json({ status:'Success', message: 'Login Successful',user});
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

//// Add Product
router.post('/products', async (req, res) => {
  try {
      const { name, image, price , description} = req.body;
      const newProductId = await getHighestProductId() + 1;
      const newProduct = new Product({ name, image, price, productId:newProductId, description });
      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



//////Fetch the productlist
router.get('/getproducts', async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find({});
    
    // Send the list of products as the response
    res.status(200).json(products);
  } catch (error) {
    // Handle errors
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






// Create a model
//const Product = mongoose.model('Product', productSchema);

// Define endpoint to fetch all products
router.post('/editproduct', async (req, res) => {
  try {
    console.log('req', req.body);
    const  {productID} = req.body;
    console.log('productId', req.body.productID);
    const product = await Product.findOne({ _id: req.body.productID });
    console.log('pro',product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).send('Server Error');
  }
});



//Update a produc
router.post('/updateproduct', async (req, res) => {

try {
  const { id, name, image, price , description} = req.body.product;
  // Update the document by its ID
  console.log('req',req.body)
  console.log('req',req.body.product)
  const result = await Product.updateOne(
    { _id: id },
    { $set: { name, image, price, description } }
  );

  // Check if the document was updated successfully
  if (result.modifiedCount > 0) {
    return res.status(200).json({ message: 'Product updated successfully.' });
    console.log('Document updated successfully.');
  } else {
    return res.status(404).json({ message: 'Product not found or no changes were made' });
    console.log('Document not found or no changes were made.');
  }
} catch (error) {
  console.error('Error updating document:', error);
} 
});





///delete record 

router.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete the document by its ID
    const result = await Product.deleteOne({ _id: productId });

    // Check if the document was deleted successfully
    if (result.deletedCount > 0) {
      console.log('Document deleted successfully.');
      res.status(200).json({ message: 'Product deleted successfully.' });
    } else {
      console.log('Document not found.');
      res.status(404).json({ message: 'Product not found.' });
    }
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
});




async function getorderid() {
  try {
    const highestorderid = await Orders.findOne().sort({ orderid: -1 });
    return highestorderid ? highestorderid.orderid : 1; // Return 0 if no products exist
  } catch (error) {
    console.error('Error getting highest order ID:', error);
    return 0; // Return 0 in case of error
  }
}

/////////Signup Code
router.post('/placeorder', async (req, res) => {
    const { name, address, products,totalamount } = req.body;
    const neworderid = await getorderid() + 1;
  try {
   
   // const user = new Orders(req.body);
    const orders = new Orders({ name, address, products,totalamount, orderid:neworderid });
    await orders.save();
    res.status(200).json({ message: 'Order Placed successfully.' });
  } catch (error) {
    res.status(400).send(error);
  }
});




/// fetch myorders
router.post('/getmyorders', async (req, res) => {
  try {
    const email= req.body.email;
   
    // Fetch all products from the database
    const orders = await Orders.find({name:email});
    
    // Send the list of products as the response
    res.status(200).json(orders);
  } catch (error) {
    // Handle errors
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;