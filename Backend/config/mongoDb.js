import mongoose from "mongoose";

const URI = process.env.MONGODB_URI
// console.log(URI);

const connectDb = async() => {
try {
    await mongoose.connect(URI)
    console.log("Database Connected");
} catch (error) {
    console.log("Connection Failed !!")
}
}

export default connectDb;