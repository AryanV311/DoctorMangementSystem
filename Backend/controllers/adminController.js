import validator from "validator";
import bcrypt from"bcrypt";
import { v2 as cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"

// Adding a Doctor

const addDoctor = async(req,res) => {
    try {
        // console.log(req.body);
        const { name, email, password, speciality, about, degree, fees, experience, address} = req.body;
        const imageFile = req.file;
        console.log({ name, email, password, speciality, about, degree, fees, experience, address},imageFile);

        if(!name || !email || !password || !speciality || !about || !degree || !fees || !experience || !address){
            return res.json({success:false, message:"Missing Details"});
        }   

        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        //formData
        const doctorData = ({
            name,
            email,
            password:hashedPassword,
            image:imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        })

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message:"Doctor Added"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


// Admin Login

const loginAdmin = (req,res) => {
    try {
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        } else{
            res.json({success:false, message:"Invalid Credentials!"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export { addDoctor, loginAdmin };