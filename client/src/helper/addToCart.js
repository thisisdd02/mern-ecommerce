import axios from 'axios'
import { SummaryApi } from '../common/common'
import {toast} from 'react-toastify'

const addToCart =async(e,id)=>{
    e?.stopPropagation()
    e?.preventDefault()

    const response = await axios.post(SummaryApi.addToCartproduct.url,{productId:id},{withCredentials:'include'})

    if(response.data.success){
        toast.success(response.data.message)
    }
    else{
        toast.error(response.data.message)
    }

    return response.data
}

export default addToCart