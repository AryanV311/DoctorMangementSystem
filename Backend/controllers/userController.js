import validator from 'validator';
import bcrypt from "bcrypt";
import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken"

import {v2 as cloudinary} from "cloudinary"

//*register user
const registerUser = async(req,res) => {
   try {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.json({success:false, message:"Missing Details!"})
    }

    if(!validator.isEmail(email)){
        return res.json({success:false, message:"enter a valid email"})
    }

    if(password < 8){
        return res.json({success:false ,message:"enter a srong password"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const userData = {
        name,
        email,
        password:hashPassword
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
    res.json({success:true, token})
   } catch (error) {
    console.log(error);
    res.json({success:false, message:error.message})
   }
}

//* Login User function

const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success:false, message:"Invalid credential!"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//* API to get userDetails

const getProfile = async(req,res) =>{
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true, userData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//* Update profile

const updateProfile = async(req,res) => {
    try {
        const { userId, name, phone, dob, address, gender } = req.body
        const imageFile = req.file

        if(!name || !phone || !dob || !address || !gender){
            return res.json({success:true,message:"Missing Details!"})
        }

        await userModel.findByIdAndUpdate(userId,{name, phone, dob, gender, address:JSON.parse(address)})

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }

        res.json({success:true, message:"Profile Updated"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export { registerUser, loginUser, getProfile, updateProfile }