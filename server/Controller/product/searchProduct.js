import productModel from "../../models/productModel.js";

const searchProduct = async(req,res)=>{
    try{
        const query = req?.query?.q;

        const regEx = new RegExp(query,"i","g")

        const product = await productModel.find({
            "$or":[
                {
                    productName: regEx
                },

                {
                    category : regEx
                }
            ]
        })

        res.json({success:true,message:"query got success",data:product})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"dont get query"})

    }
}

export {searchProduct}