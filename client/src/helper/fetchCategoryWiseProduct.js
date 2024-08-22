import axios from "axios"
import { SummaryApi } from "../common/common"

const fetchCategoryWiseProduct = async(category)=>{

    const response = await axios.post(SummaryApi.categorywiseProduct.url,{category})

    return  response.data

}

export default fetchCategoryWiseProduct