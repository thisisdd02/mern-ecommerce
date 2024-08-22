import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import ForgotPassword from '../Pages/ForgotPassword'
import SignUp from '../Pages/SignUp'
import AdminPanel from '../Pages/AdminPanel'
import AllUser from '../Pages/AllUser'
import AllProduct from '../Pages/AllProduct'
import CategoryProduct from '../Pages/CategoryProduct'
import ProductDetail from '../Pages/ProductDetail'
import Cart from '../Pages/Cart'
import SearchProduct from '../Pages/searchProduct'
import PaymentSuccess from '../Pages/PaymentSuccess'
import CancelPayment from '../Pages/CancelPayment'
import OrderPage from '../Pages/OrderPage'



const router = createBrowserRouter([
    { 
        path: "/",
        element: <App/>,
        children: [{
            path: "/",
            element: <Home/>
        },
        {
            path: "login",
            element:<Login/>
        },
        {
            path: "forgot-password",
            element:<ForgotPassword/>
        },
        {
             path: "sign-up",
            element: <SignUp/>
        },
        {
            path:'product-category',
            element:<CategoryProduct/>
        },
        {
            path: "product/:id",
            element: <ProductDetail/>

        },
        {
            path: "cart",
            element: <Cart/>
        },
        {
            path: "search",
            element:<SearchProduct/>
        },
        {
            path: "success",
            element: <PaymentSuccess/>
        },
        {
            path: "cancel",
            element: <CancelPayment/>
        },
        {
            path:"order",
            element:<OrderPage/>
        },
        {  
            path:'admin-panel',
            element:<AdminPanel/>,
            children:[
                {
                    path: 'all-user',
                    element:<AllUser/>
                },
                {
                    path:'all-product',
                    element:<AllProduct/>
                }
            ]
        },
       
    ]
    }
])

export default router