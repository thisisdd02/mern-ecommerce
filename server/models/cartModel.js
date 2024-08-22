import mongoose from 'mongoose'

const addToCartSchema = mongoose.Schema({
   productId :{ref:'products',type:String,required:true},
   quantity:{type:Number,required:true},
   userId:{type:String,required:true}
},{timestamps:true}) 

const addToCartModel=  mongoose.model('addToCart',addToCartSchema)
 
export default addToCartModel  