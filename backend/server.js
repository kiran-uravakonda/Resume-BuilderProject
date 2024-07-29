import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import connectToDatabase from './database/db.js';
import userRoute from './routers/userRoute.js';

dotenv.config();
let app=express();
let port=process.env.PORT||9000

app.use(cors());  
app.use(cookieParser())
app.use(express.json());
app.use('/user',userRoute)


app.listen(port,()=>{
    connectToDatabase();
    console.log(`server running on ${port} port`)
})