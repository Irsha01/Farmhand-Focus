const express = require('express');
const router = express.Router();
const User = require('../models/User');
//const jwt = require('jsonwebtoken');
const Product = require('../models/Product');

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
      const { name, image, price } = req.body;
      const newProductId = await getHighestProductId() + 1;
      const newProduct = new Product({ name, image, price, productId:newProductId });
      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;