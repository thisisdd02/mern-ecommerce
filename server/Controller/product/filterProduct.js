import productModel from "../../models/productModel.js"

const  filterProduct  = async(req,res)=>{
    try {
        const categoryList = req?.body?.category
        const products = await productModel.find(
            {
                category:{
                    "$in":categoryList
                }
            })

        res.json({success:true,data:products})
    } catch (error) {
            console.log(error);
            res.json({success:false,message:error.message})
    }
}

export {filterProduct}