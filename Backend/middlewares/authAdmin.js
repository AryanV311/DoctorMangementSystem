import jwt from "jsonwebtoken"

const authAdmin = (req,res,next) => {
    try {
        const { atoken } = req.headers
        if(!atoken){
            res.json({success:false, message:"Not Authorized Login"});
        }

        const decode_token = jwt.verify(atoken, process.env.JWT_SECRET)
        if(decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            res.json({success:false, message:"Not Authorized Login"});
        }

        next()
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export default authAdmin;