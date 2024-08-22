import productModel from "../../models/productModel.js"

const getProductDetail = async(req,res) =>{

    try {
        const {productId} =req.body
        const product = await productModel.findById(productId)

        res.json({success:true,data:product})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"couldn't get product detail"})
        
    }   

}

export {getProductDetail}