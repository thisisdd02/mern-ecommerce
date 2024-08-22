import addToCartModel from "../../models/cartModel.js"

const addtoCartController =async(req,res)=>{

    try {
        const{productId} = req?.body
        const currentUser = req?.userId

        const isProductAvailable = await  addToCartModel.findOne({productId})

            if(isProductAvailable){
                return res.json({ success:false , message:"Product is already in your cart"})
            }

        const payload ={
            productId :productId,
            quantity:1,
            userId:currentUser
        }
        const newProduct = new addToCartModel(payload)
        const saveProduct = await  newProduct.save()
        res.json({success:true, data:saveProduct , message:"Product added to cart"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error in cart"})
        
    }

}

export {addtoCartController}