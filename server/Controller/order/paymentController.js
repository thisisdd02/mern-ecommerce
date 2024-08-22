import userModel from "../../models/userModel.js"
import stripe from "../../config/stripe.js"

const paymentController =async(request,response)=>{

    try {
        const {cartItems} = request.body
        const user =  await userModel.findOne({_id :request.userId})
        const params ={
            submit_type:'pay',
            mode:'payment',
            payment_method_types:['card'],
            billing_address_collection :'auto',
            shipping_options :[
                {
                    shipping_rate:'shr_1Pozic2MFYbCue87V2YYIMUz',
                } 
            ],
            customer_email :user?.email,
            metadata :{
                userId:request.userId
            },
            line_items : cartItems.map((i,index)=>{
                return{
                    price_data:{
                        currency:'inr',
                        product_data:{
                            name : i.productId.productName,
                            images:i.productId.productImage,
                            metadata :{
                                productId :i.productId._id
                            }
                        },
                        unit_amount:i.productId.sellingPrice*100
                    },
                    adjustable_quantity:{
                        enabled :true,
                        minimum :1,
                    },
                    quantity :i.quantity
                }
            }),
            success_url:`${process.env.FRONTEND_URL}/success`,
            cancel_url:`${process.env.FRONTEND_URL}/cancel`

        }
        const session = await stripe.checkout.sessions.create(params)
        response.json(session)
        
    } catch (error) {
        response.json({success:"false",message:error.message})
        
    }
}

export {paymentController}