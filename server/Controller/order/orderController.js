import orderModel from "../../models/orderProductModel.js"

const orderController  = async(request,response)=>{

    try {
        
        const currentUserId  = request.userId

        const orderList = await orderModel.find({userId:currentUserId}).sort({createdAt: -1})

        response.json({success:true,data:orderList})

    } catch (error) {
            console.log(error);
            response.json({success:false,message:error.message})
            
    }
}

export {orderController}