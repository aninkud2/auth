require("dotenv").config()
const model=require("../models")
const jwt =require("jsonwebtoken")
const bcrypt=require("bcrypt")
// sign up function
const signup=async(req,res)=>{
    try 
    {const{name,email,password}=req.body
    const checkemail=await model.user.findOne({where:{email:email}})
    if (checkemail){
        res.status(400).json(
            {status:"failed",
        message:"Email already exist"}
        )
    }else{
        const saltedpassword=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,saltedpassword);
        const generatetoken=await jwt.sign({
            name,
            email,
            password
        },"mySecret",{expiresIn:"1d"})
        const userdata={
            name,
            email,
            password:hashedpassword,
            token:generatetoken
        }
        const newuser=await model.user.create(userdata)
        if(!newuser){res.status(400).json({
            status:"failed",
            message:"failled to create user"
        })}else{
            res.status(201).json({status:"success",
    data:newuser})}
    }
        
    } catch (error) {res.status(400).json({
        status:"failed",
        message:error.message
    })
        
    }
}
module.exports={signup}