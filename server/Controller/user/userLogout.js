

const userLogout  = async(req,res)=>{

    try {
        res.clearCookie("token")
        res.json({success:true,message:'user Logged out',data:[]})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }


}

export{userLogout}