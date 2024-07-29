import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const databaseURI=process.env.DATABASE_URI;
const connectToDatabase=async(req,res)=>{
    try{
        await mongoose.connect(databaseURI);
        console.log('database connected successfully')
    }
    catch(err){
        console.log("database is not connectd",err)
    }
}

export default connectToDatabase;