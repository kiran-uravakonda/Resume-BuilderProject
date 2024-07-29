import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
export const userSignup=async(req,res)=>{
    try{
    let {firstName,lastName,email,password,role,mobile}=req.body;
    let user=await userModel.findOne({email});

    if(user){
        res.status(400).json({message:'user already exists'})
    } 

   else{
let salt=await bcrypt.genSalt(10); 
if(password!==""){
  var hashPassword=await bcrypt.hash(password,salt)
}

let User=new userModel({
    firstName,  
    lastName,
    mobile,
    email,
    password:hashPassword,
    role,
})


if(User){
  let newUser=await User.save() 
  let token=jwt.sign({newUser},process.env.SECRETE_KEY)
res.status(201).json({token:token,message:newUser})
}
} 
    }
    catch(err){
  res.status(400).json({message:`error in userSignup, ${err}`})
    }
}



export const userLogin=async(req,res)=>{
    try{
           const {email,password}=req.body;
           if(!email || !password){
            res.status(400).json({message:`please provide email & password`})
           }

           let userFind=await userModel.findOne({email});
           
          
          let checkPassword=await bcrypt.compare(password,userFind?.password || "");
          
          if(!userFind || !checkPassword){
            res.status(400).json({message:`invalid credentials`})
          }
         
         
else{
        
            let token = jwt.sign({ userFind }, process.env.SECRETE_KEY);

    
            res.cookie('token', token);
            res.status(200).json({token,message:'login successful'})
}
          
    }

    catch(err){
        res.status(400).json({message:`error in userLogin, ${err}`})
    }
}






export const forgotPassword=async(req,res)=>{
  try{
        
   const {email}=req.body
   let user=await userModel.findOne({email})
   if(!user){
    res.status(400).json({message:"this email is not registered"})
   }   

   else{
  //  let token = jwt.sign({ user }, process.env.SECRETE_KEY);
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kirankohli1030@gmail.com',
      pass: 'ionx pkbx rqro npwo'
    }
  });
  
  var mailOptions = {
    from: 'kirankohli1030@gmail.com',
    to: 'kirankohli1030@gmail.com',
    subject: 'Reset Password Link',
    text: `http://localhost:3000/reset-password/${user._id}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
   
      console.log(error.message);
    } else {
     
      res.status(200).json({message:`success`})
     
    }
  });
}  
        
  }

  catch(err){
      res.status(400).json({message:`error in forgot password, ${err.message}`})
  }
}







export const resetPassword=async(req,res)=>{
  try{
        
   let {password}=req.body;
   let {id}=req.params
   let salt=await bcrypt.genSalt(10); 

  var hashPassword=await bcrypt.hash(password,salt)

   let update={password:hashPassword}
  if(password==="" || !password){
    res.status(400).json({message:"please enter password"})
  }
  else{
   var user=await userModel.findByIdAndUpdate(id,update,{new:true})
  }
   if(!user){
    res.status(400).json({message:"can't find the user"})
   }   


  else{
   res.status(200).json({message:"password reset successful"})
  }
      
 }

  catch(err){
      res.status(400).json({message:`error in reset password, ${err.message}`})
  }
}





