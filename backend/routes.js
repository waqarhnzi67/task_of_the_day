const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('./schemas/users')




router.post('/signup', async (req, res)=>{
    try {
        const data = req.body;

        if (!data || !data.first_name || !data.last_name || !data.email_address || !data.username ||!data.gender || !data.date_of_birth || !data.password) {
            return res.status(400).json({ message: "Missing required fields" });
          }

        const existingUser = await User.findOne({ email_address: data.email_address });
        const existingUsername = await User.findOne({ username: data.username });

        if (existingUser) {
            return res.status(400).json({ message: "Email address already registered!" });
        }
        if (existingUsername) {
           return res.status(400).json({ message: "Username not available!" });
        }

        const user = new User({
            first_name: data.first_name,
            last_name: data.last_name,
            email_address: data.email_address,
            username: data.username,
            gender: data.gender,
            date_of_birth: data.date_of_birth,
            password: data.password,
        })
        
        await user.save();
        return res.status(200).json({message: "User successfully registered! Please verify your email."})        
        

    } catch (error) {
        console.log(error);
        res.status(400).json("failed to get data")
    }
    
})


// login 
router.post('/login', async(req, res)=>{
    try {
        const userData = req.body;

    if(!userData){
        return res.status(400).json({message: "Please provide login and password!"})
    }

    const user = await User.findOne({
        $or: [
          { email_address: userData.emailUsername },
          { username: userData.emailUsername }
        ]
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.password !== userData.password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const SECTET_KEY = process.env.SECRET_KET;
      const token = jwt.sign({id:user._id}, SECTET_KEY, { expiresIn: '1h' })

      res.status(200).json({ 
        message: "Redirecting to Dashboard",
        token,
        user : {
            id:user._id,
            username: user.username,
            email_address: user.email_address
        } 
    });
    
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Server error"})
    }
})


module.exports = router;