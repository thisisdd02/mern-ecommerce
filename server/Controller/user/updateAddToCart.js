import addToCartModel from "../../models/cartModel.js"

const updateAddToCart =async(req,res)=>{

    try {
        const currentUser = req?.userId
        const addToCartproductId = req?.body?._id

        const qty = req?.body?.quantity

        const updateProduct = await addToCartModel.updateOne({_id:addToCartproductId},
            {
                ... (qty &&{quantity: qty})
            }
        )

        res.json({success:true,message:updateAddToCart,data:updateProduct})

    } catch (error) {
        console.log(error);
        res.json({success:false ,message:"error in updateCart"})
        
    }

}

export {updateAddToCart}