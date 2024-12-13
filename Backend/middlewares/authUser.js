import jwt from "jsonwebtoken"

const authUser = (req,res,next) => {
    try {
        const { token } = req.headers
        if(!token){
            res.json({success:false, message:"Not Authorized Login"});
        }

        const decode_token = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decode_token.id
        next()
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

export default authUser;