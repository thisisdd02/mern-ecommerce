import React from 'react'
import { RxCrossCircled } from "react-icons/rx";


const DisplayImage = ({ imgUrl, onClose }) => {
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-2'>
                <button onClick={onClose} className='cursor-pointer ml-auto'>
                    <RxCrossCircled size={27} color='red' />
                </button>
                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgUrl} alt='' className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default DisplayImage