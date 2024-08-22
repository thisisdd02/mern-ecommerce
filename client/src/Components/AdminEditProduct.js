import React, { useState } from 'react'
import { RxCrossCircled } from "react-icons/rx";
import productCategory from '../helper/productCategory';
import { MdOutlineCloudUpload } from "react-icons/md";
import uploadImage from '../helper/uploadImage';
import DisplayImage from './DisplayImage';
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios'
import { SummaryApi } from '../common/common';
import {toast} from 'react-toastify'

const AdminEditProduct = ({onClose,productData,fetchProductData}) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage||[],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
      }) 
      const[fullImage,setFullImage]=useState('')
      const[openImage,setOpenImage] = useState(false)
      const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData((prev) => {
          return {
            ...prev,
            [name]: value 
          }
        })
        // setData({ ...data, [name]: value })
      }
    
      const onChangeImageHandler = async (e) => {
        const file = e.target.files[0];
        
        const uploadImageCloudinary = await uploadImage(file)
        setData((prev) => {
          return {
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudinary.url]
          }
        })
      }
    
      const deleteImageHandler = async(index)=>{
            console.log('index',index) 
    
            const newProductImage=[...data.productImage]
            newProductImage.splice(index,1)
            setData((prev) => {
              return {
                ...prev,
                productImage: [...newProductImage]
              }
            })
      }
      // onSubmit
       const submitHandler =async(e)=>{
          e.preventDefault();
        const response  = await axios.post(SummaryApi.updateProduct.url,data,{withCredentials:'include'})
        
          if(response.data.success){
            toast.success(response.data.message)
            onClose()
            fetchProductData()
        }
          else{
            toast.error(response.data.message)
          }
          
      }
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-30 top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
    <div className='bg-white p-4 rounded w-full h-full max-w-2xl max-h-[80%] overflow-y-scroll'>
      <div className='flex justify-between pb-3'>
        <h2 className='font-bold text-lg'> Edit Product </h2>
        <button onClick={onClose} className='cursor-pointer'>
          <RxCrossCircled size={27} color='red' />
        </button>
      </div>
      <form className='grid p-4 gap-3 pb-5 h-full' onSubmit={submitHandler}>
        <label htmlFor='productName'>Product Name :</label>
        <input type='text' id='productName' name='productName' value={data.productName} placeholder='productName' onChange={onChangeHandler} className='p-2 border bg-slate-100 rounded' required />

        <label htmlFor='brandName'>Brand Name :</label>
        <input type='text' id='brandName' name='brandName' value={data.brandName} placeholder='brandName' onChange={onChangeHandler} className='p-2 border bg-slate-100 rounded ' required/>

        <label htmlFor='category'> Product Category :</label>
        <select value={data.category} name='category' onChange={onChangeHandler} className='p-2 border  bg-slate-100 rounded' required>
                <option value={""}> select category</option>
          {
            productCategory.map((i, index) => {
              return (
                <option value={i.value} key={i.value + index} >{i.label}</option>
              )
            })
          }
        </select>
        <label htmlFor='productImage'> Product Image :</label>

        <label htmlFor='uploadImage'>

          <div className='p-2 h-32 w-full border rounded bg-slate-100 flex justify-center items-center cursor-pointer'>
            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
              <MdOutlineCloudUpload size={40} />
              <p>Upload Product Image</p>
              <input type='file' id='uploadImage' onChange={onChangeImageHandler} hidden />
            </div>
          </div>
        </label>
        <div>
          {
            data?.productImage[0] ? (
              <div className='flex items-center gap-2'>
              {
                data.productImage.map((i,index) => {
                  return (
                    <div className='relative group'>
                    <img src={i} width={100} height={100} alt={i} className='bg-slate-100 border-2 cursor-pointer'
                     onClick={()=>{
                          setOpenImage(true)
                          setFullImage(i)
                     }}
                     />
                     <div className='absolute bottom-0 right-0 hidden group-hover:block cursor-pointer' onClick={()=>deleteImageHandler(index)}>
                     <RiDeleteBin6Line size={20} color='red' />
                       </div>

                     </div>
                  )
                })}</div>
            ) : (
              <p className='text-red-600 test-xs'> *Kindly Upload Image</p>
            )
          }
        </div>
        <label htmlFor='price'> Price :</label>
        <input type='number' id='price' name='price' value={data.price} placeholder='price' onChange={onChangeHandler} className='p-2 border bg-slate-100 rounded ' required />

        <label htmlFor='sellingPrice'>  sellingPrice :</label>
        <input type='number' id='sellingPrice' name='sellingPrice' value={data.sellingPrice} placeholder=' Offer price' onChange={onChangeHandler} className='p-2 border bg-slate-100 rounded ' required/>

        <label htmlFor='description'>Description:</label>
        <textarea className='h-28 bg-slate-100 border resize-none p-1' name='description' value={data.description} onChange={onChangeHandler} placeholder='Enter Description' rows={5}>

        </textarea>


        <button className='border bg-blue-500 rounded text-white px-3 py-2 mb-10 hover:bg-blue-700'> Update Product</button>
      </form>
    </div>
     {/* upload image Full Screen */}
     {
      openImage &&(
        <DisplayImage imgUrl={fullImage} onClose={()=>setOpenImage(false)}/>
      )
     }
    
  </div>
  )
}

export default AdminEditProduct