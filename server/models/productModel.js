import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    productName:{type:String,required:true}, 
    brandName:{type:String,required:true},
    category:{type:String,required:true},
    productImage: {type:[String],required:true},
    description:{type:String,required:true},
    price: {type:Number,required:true},
    sellingPrice: {type:Number,required:true}
},{timestamps:true}) 

const productModel =  mongoose.model('products',productSchema)
 
export default productModel     