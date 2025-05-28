import userModel from "../models/userModel.js";
import validator from "validator"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"



const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//route for login
const loginUser = async (req,res) => {
 try {
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
        return res.json({success: false, message: "User Does Not exist "})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(isMatch) {

        const token = createToken(user._id)
        res.json({success: true , token})
    }else{
        res.json({success:false, message: "invalid credentials"})
    }

 } catch (error) {
    console.log(error)
    res.json({success:false, message: error.message})
 }


}

//route for registration

const registerUser = async (req,res) => {
   
  try {
    const {name,email,password} = req.body;
    //checking if user already exists
    const exists = await userModel.findOne({email});
    if(exists){
        return res.json({success:false, message: "User Already exists"})
    }

    //validating email format and strong password

    if(!validator.isEmail(email)){
        return res.json({success:false, message:"Please enter a valid email"})
    }

    if(password.length<8){
        return res.json({success:false, message:"Please enter a strong password"})
    }

    //hashing user password 

    const hashedPassword = await bcrypt.hash(password,10)

    //creating user 

    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    })

    const user = await newUser.save() 

    const token = createToken(user._id)

    res.json({success:true, token})


 

  } catch (error) {
    console.log(error)
    res.json({success:false, message: error.message})
  }
}

// route for admin login

const adminLogin = async (req,res) =>{
    
try {
    const {email,password} = req.body

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign({ email: "admin@flickcart.com", role: "admin" }, process.env.JWT_SECRET);
        res.json({success:true,token})
    }else{
        res.json({success:false,message:"Invalid Credentials"})
    }
} catch (error) {
    console.log(error)
    res.json({success:false, message: error.message})
}

}

export {loginUser, registerUser, adminLogin}