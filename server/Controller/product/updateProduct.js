import uploadProductPermission from "../../helper/permission.js"
import productModel from "../../models/productModel.js"

const updateProductController =async(req,res)=>{
    try {

        if(!uploadProductPermission(req.userId)){
            res.json({success:false,message:"Permission Denied"})
        }
        const{ _id , ...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id ,resBody)
        res.json({success:true,message:"product updated",data:updateProduct})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error in Update"})

    }
}

export{updateProductController}