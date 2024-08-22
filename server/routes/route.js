import express from 'express'
import { registerUser } from '../Controller/user/userSignup.js';
import { loginUser } from '../Controller/user/userSignin.js';
import userDetail from '../Controller/user/userDetails.js';
import authToken from '../middleware/authToken.js';
import { userLogout } from '../Controller/user/userLogout.js';
import { allUser } from '../Controller/user/allUser.js';
import { updateUser } from '../Controller/user/updateUser.js';
import { uploadProductController } from '../Controller/product/uploadProduct.js';
import { getProduct } from '../Controller/product/getProduct.js';
import { updateProductController } from '../Controller/product/updateProduct.js';
import { getCategoryProduct } from '../Controller/product/getCategoryProductOne.js';
import { getCategoryWiseProduct } from '../Controller/product/getCategoryWiseProduct.js';
import { getProductDetail } from '../Controller/product/getProductDetail.js';
import { addtoCartController } from '../Controller/user/addToCartController.js';
import { cartProductCount } from '../Controller/user/cartProductCount.js';
import { addToCartViewPort } from '../Controller/user/addToCartViewport.js';
import { updateAddToCart } from '../Controller/user/updateAddToCart.js';
import { deleteCartProduct } from '../Controller/user/deleteCartProduct.js';
import { searchProduct } from '../Controller/product/searchProduct.js';
import { filterProduct } from '../Controller/product/filterProduct.js';
import { paymentController } from '../Controller/order/paymentController.js';
import { webhook } from '../Controller/order/webhook.js';
import { orderController } from '../Controller/order/orderController.js';


const router = express.Router();


router.post('/register',registerUser);
router.post('/login',loginUser) 
router.get('/user-detail',authToken,userDetail)
router.get('/userLogout',userLogout) 
 
//Admin panel
router.get('/all-user',authToken,allUser)
router.post('/update-user',authToken,updateUser) 

//products
router.post('/upload-product',authToken,uploadProductController)
router.get('/all-product',getProduct)
router.post('/update-product',authToken,updateProductController)
router.get('/get-category',getCategoryProduct)
router.post('/category-product',getCategoryWiseProduct) 
router.post('/product-detail',getProductDetail)
router.get('/search',searchProduct)
router.post('/filter',filterProduct)

//user Add to cart
router.post('/addtocart',authToken,addtoCartController)
router.get('/count-addtocart',authToken,cartProductCount)
router.get('/view-addtocart',authToken,addToCartViewPort)
router.post('/update-cart',authToken,updateAddToCart)
router.post('/delete-cart',authToken,deleteCartProduct)

//payment
router.post('/checkout',authToken,paymentController)
router.post('/webhook',webhook) //api/webhook
router.get('/order-list',authToken,orderController)

export default router; 