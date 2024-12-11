import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDb from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoutes.js";
import doctorRouter from "./routes/doctorRoutes.js";

const app = express();
const port = 4000;
connectDb();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor',doctorRouter)


app.get('/', (req,res) => {
    res.send("server running");
})


app.listen(port, () => console.log("server Started"));