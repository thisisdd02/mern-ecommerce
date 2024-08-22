import productModel from "../../models/productModel.js"


const getCategoryWiseProduct =async(req,res)=>{

    try {
        const{category} = req?.body || req?.query
        const product = await productModel.find({category})
        res.json({success:true,data:product})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"product not fetched"})
         
    }

}   

export {getCategoryWiseProduct}