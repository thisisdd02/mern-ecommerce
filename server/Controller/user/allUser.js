import userModel from "../../models/userModel.js"

const allUser = async(req,res)=>{
    try {
        console.log('user_id:',req.userId)
        const allUser = await userModel.find()
        res.json({success:true,data:allUser,message:"all user fetched"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
    }
}

export {allUser}