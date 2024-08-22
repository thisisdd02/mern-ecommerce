import userModel from "../../models/userModel.js"
const updateUser =async(req,res)=>{

    try {
        const sessionUser = req.userId
        const {userId,name,email,role} = req.body

        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role})
        }

        const user = await userModel.findById(sessionUser)
        console.log("user.role",user.role)

        const updateUser = await userModel.findByIdAndUpdate(userId,payload) 

        res.json({success:true,message:"user Updated",data:updateUser})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error UpdateUser"})
    }

}

export {updateUser}