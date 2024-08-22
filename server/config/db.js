//mongodb+srv://thisisdd02:<password>@cluster0.pzjyoqh.mongodb.net/e-commerce
import mongoose from 'mongoose'

async function ConnectDB(){
    try {
    mongoose.connect(process.env.MONGODB_URI).then(()=>console.log('Db connected...'))
    }
    catch(error){
        console.log(error);
    }
}
export default ConnectDB;