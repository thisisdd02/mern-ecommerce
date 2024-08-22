import jwt from 'jsonwebtoken'

const authToken = async (req,res,next)=>{
    try {
        const token = req.cookies?.token 

        if(!token){
            return res.json({ success :false, message:"User Not Login"})
        }


        jwt.verify(token,  process.env.JWT_SECRET_KEY, function(err, decoded)
         {
            console.log(err)
        

            if(err){
                console.log('err Auth:',err);
            }
            
            req.userId =decoded?.id
            next()



          });

        // console.log(token);
        
    } catch (error) {
        console.error(error);
        res.json({success:false,message:'error',data:[]})
    }       
}
export default authToken;