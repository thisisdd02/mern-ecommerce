import userModel from "../../models/userModel.js"
const userDetail = async(req,res)=>{
    try{
        console.log("userId",req.userId)
        const user = await userModel.findById(req.userId)

        res.status(200).json({ success : true, data:user, message : "User details"})
        console.log("user",user)

     }catch(err){
           
        res.status(400).json({ success : false, message : err.message || err,})
    }
}



export default userDetail;