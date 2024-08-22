import addToCartModel from "../../models/cartModel.js"

const deleteCartProduct = async(req,res)=>{
    try {
        const currentUser = req?.userId
        const addToCartproductId = req?.body?._id  
        
        const deleteProduct = await  addToCartModel.findByIdAndDelete({_id:addToCartproductId })
        
        res.json({success:true,message:"delete from cart",data:deleteProduct})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error in delete"})
        
    }
}

export {deleteCartProduct}