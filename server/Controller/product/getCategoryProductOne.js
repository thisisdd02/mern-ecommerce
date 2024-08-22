import productModel from "../../models/productModel.js"

const getCategoryProduct =async(req,res)=>{

    try {
        const productCategory = await productModel.distinct('category')

        const productByCategory =[]

        for(const category of productCategory){
            const product = await productModel.findOne({category})

            if(product){
                productByCategory.push(product)
            }
        }


        res.json({success:true,data:productByCategory})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error category"})
        
    }

}

export {getCategoryProduct}