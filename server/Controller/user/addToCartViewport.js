import addToCartModel from "../../models/cartModel.js"
const  addToCartViewPort =async(req,res) =>{
    try{

        const currentUser = req?.userId

        const allProduct = await addToCartModel.find({
            userId:currentUser
        }).populate("productId")

        res.json({success:true,data:allProduct,message:"ok"})

    }
    catch(error){
        console.log(error)
        res.json({success:false , message:"error in cart"})
    }
}

export {addToCartViewPort }