const express = require("express")
const router = express.Router()

const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// =======================
// Signup
// =======================

router.post("/signup", async (req,res)=>{

try{

const {name,email,password,role} = req.body

const existingUser = await User.findOne({email})

if(existingUser){
return res.status(400).json({message:"Email already registered"})
}

const hashedPassword = await bcrypt.hash(password,10)

const user = new User({
name,
email,
password:hashedPassword,
role
})

await user.save()

res.json({message:"User registered successfully"})

}catch(err){

console.log("Signup Error:", err)

res.status(500).json({
message:"Signup failed",
error: err.message
})

}

})



// =======================
// Login
// =======================

router.post("/login", async (req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json({message:"User not found"})
}

const validPassword = await bcrypt.compare(password,user.password)

if(!validPassword){
return res.status(400).json({message:"Invalid password"})
}

const token = jwt.sign(
{id:user._id,role:user.role},
process.env.JWT_SECRET
)

res.json({
token,
user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}
})

}catch(err){

res.status(500).json(err)

}

})



// =======================
// Reset Password
// =======================

router.put("/reset-password", async (req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(404).json({message:"User not found"})
}

const hashedPassword = await bcrypt.hash(password,10)

user.password = hashedPassword

await user.save()

res.json({message:"Password updated successfully"})

}catch(err){

res.status(500).json(err)

}

})

module.exports = router