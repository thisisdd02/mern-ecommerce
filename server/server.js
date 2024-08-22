import express from 'express'
import cors from 'cors'
import'dotenv/config'
import ConnectDB from './config/db.js';
import router from './routes/route.js';
import cookieParser  from 'cookie-parser'
import bodyParser from 'body-parser';


const app= express();
const port =4000 || process.env.PORT

//middleware
app.use(cors(
   {origin : process.env.FRONTEND_URL,
   credentials:true,
}
));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    limit:'50mb',extended:true
}));


//db Connection
ConnectDB()


//end points
app.use('/api',router)

app.get('/',(req,res)=>{
    res.send('API WORKING')
})

//create server
app.listen(port,()=>{
    console.log(`server running on ${port}`);
})




