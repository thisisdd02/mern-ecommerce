import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2 from '../assest/banner/img2.webp'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3 from '../assest/banner/img3.jpg'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4 from '../assest/banner/img4.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5 from '../assest/banner/img5.webp'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {

    const [currImg, setCurrImg] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImg =()=>{
        if(desktopImages.length -1  > currImg){
        setCurrImg(prev => prev+1)
    }}

    const prevImg =()=>{
        if(currImg > 0){
            setCurrImg(prev => prev-1)
        }
        
    }

    useEffect(()=>{
        const intervel = setInterval(()=>{
            if(desktopImages.length -1  > currImg){
                nextImg()
            }
            else{
                setCurrImg(0)
            }

        },5000)
        return  ()=> clearInterval(intervel)
    },[currImg])

    return (
        <div className='container mx-auto px-4 rounded '>
            <div className=' h-56 md:h-72 w-full bg-slate-200 relative'>

                <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
                    <div className='flex justify-between w-full'>
                         <button onClick={prevImg} className='bg-white rounded-full shadow-md p-1'>
                             <FaAngleLeft size={25} />
                          </button>
                         <button  onClick={nextImg} className='bg-white rounded-full shadow-md p-1' >
                             <FaAngleRight size={25} />
                        </button>
                    </div>
                </div>

                <div className='hidden md:flex w-full h-full overflow-hidden '>
                    {
                        desktopImages.map((i, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={index} style={{ transform: `translateX(-${currImg * 100}%` }} >
                                    <img src={i} className='w-full  h-full' />
                                </div>
                            )
                        })
                    }
                </div>
                 {/* mobile version */}
                 <div className='flex w-full h-full overflow-hidden md:hidden'>
                    {
                        mobileImages.map((i, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={index} style={{ transform: `translateX(-${currImg * 100}%` }} >
                                    <img src={i} className='w-full  h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct