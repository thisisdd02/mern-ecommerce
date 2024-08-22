import productModel from "../../models/productModel.js"
const getProduct = async(req,res) =>{

    try{
        const allProduct = await productModel.find().sort({createdAt:-1})
        res.json({success:true,data:allProduct})
    }
    catch(error){
       console.log(error)
        res.json({success:false,message:'Unable to fetchProduct'})
    }

}
export {getProduct}