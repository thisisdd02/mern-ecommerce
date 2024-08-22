import mongoose from 'mongoose'


const orderSchema = new mongoose.Schema({
    productDetail:{type:Array,default:[],required:true}, 
    email:{type:String,required:true,default:''},
    userId:{type:String,requireed:true,default:''},
    paymentDetail:{
        paymentId:{type:String , required:true,default:''},
        payment_method_types:[],
        payment_status:{type:String,default:'pending'},
    },
    shipping_options:[],
    totalAmount:{type:Number,default:0}
},{
    timestamps:true    
})

const  orderModel = mongoose.model('orders',orderSchema)

export default orderModel;