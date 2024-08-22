import addToCartModel from "../../models/cartModel.js"

const cartProductCount =async(req,res)=>{
    try {
        const userId = req?.userId

        const count = await addToCartModel.countDocuments({},{
            userId : userId
        })
        res.json({success:true,data:{count : count},message:"ok"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error in Count"})
        
    }
}

export {cartProductCount}