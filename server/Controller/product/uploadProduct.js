import uploadProductPermission from "../../helper/permission.js"
import productModel from "../../models/productModel.js"

 const uploadProductController = async(req,res)=>{

    const sessionUserId = req.userId

    if(!uploadProductPermission(sessionUserId)){
        res.json({success:false,message:"Permission Denied"})
    }
     
    try {
        const uploadProduct = new productModel({
                brandName:req.body.brandName,
                price:req.body.price,
                description:req.body.description,
                productImage:req.body.productImage,
                productName:req.body.productName,
                sellingPrice:req.body.sellingPrice,
                category:req.body. category 
        })
        const saveProduct = await uploadProduct.save()

        res.json({success:true,message:"product Added",data:saveProduct})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

}

export{uploadProductController}