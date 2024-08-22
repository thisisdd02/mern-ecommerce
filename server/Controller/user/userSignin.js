import userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const loginUser =async(req,res)=>{
    try{
        const {email,password}=req.body;
        if (!email) {
            throw new Error('please provoid Email')
        }   

        if (!password) {
            throw new Error('please provoid password')
        }
      
        const exist = await userModel.findOne({ email })
        if (!exist) {
            throw new Error('User not Exist')
        } 
        const isValid = await bcrypt.compare(password, exist.password)
        if (isValid) {
            const tokenData ={
                id:exist._id,
                email:exist.email
            }
            const  token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 *8 });

            const tokenOption ={
                httpOnly:"true",
                secure:"true",
            }
       
              res.cookie("token",token,tokenOption).json({success:true,message:'Login Successfully',data:token})
        }

       else{
        res.json({success:false,message:'Invalid Password'})
       }
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message}) 
    }

}

export {loginUser}