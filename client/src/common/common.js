const backendUrl = process.env.BACKEND_URL

 export const SummaryApi ={
    signUp :{
        url:`${backendUrl}/api/register`
    },
    Login:{
        url:`${backendUrl}/api/login`
    },
    userDetail:{
        url:`${backendUrl}/api/user-detail`
    },
    logout:{
        url:`${backendUrl}/api/userLogout`
    },
    allUser:{
        url:`${backendUrl}/api/all-user`
    },
    userUpdate:{
        url:`${backendUrl}/api/update-user`
    },
    uploadProduct:{
        url:`${backendUrl}/api/upload-product`
    },
    allProduct:{
        url:`${backendUrl}/api/all-product`  
    },
    updateProduct:{
        url:`${backendUrl}/api/update-product`
    },
    categoryProduct:{
        url:`${backendUrl}/api/get-category`
    },
    categorywiseProduct:{
        url:`${backendUrl}/api/category-product`
    },
    productDetail:{
        url:`${backendUrl}/api/product-detail`
    },
    addToCartproduct:{
        url:`${backendUrl}/api/addtocart`
    },
    countCartproduct :{
        url:`${backendUrl}/api/count-addtocart`
    },
    addToCartViewPort :{
        url:`${backendUrl}/api/view-addtocart`
    },
    updateAddtocart :{
         url:`${backendUrl}/api/update-cart`
    },
    deleteAddtocart:{
        url:`${backendUrl}/api/delete-cart`
    },
    searchQuery:{
        url:`${backendUrl}/api/search`
    },
    filter:{
        url:`${backendUrl}/api/filter`
    },
   payment:{
         url:`${backendUrl}/api/checkout`
   },
   order:{
         url:`${backendUrl}/api/order-list`
    },


    
}


