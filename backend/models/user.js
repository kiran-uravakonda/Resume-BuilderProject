import mongoose from 'mongoose';
import validator from 'validator'
let userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate:[validator.isEmail,'please enter valid email']
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
    }, 
    role:{
        type:String,
        default:'user'
    }
})

let user=mongoose.model('User',userSchema);
export default user;