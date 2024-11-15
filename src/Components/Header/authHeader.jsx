import React from 'react'
import Image from '../../assets/logo-nobg.png'

export default function AuthHeader() {
    return (
        <header style={{ fontFamily: "Noto Sans" }} className="mx-auto flex flex-wrap px-8 py-5 flex-col md:flex-row items-center shadow-md justify-between">
            <div className='flex items-center'>
                <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img src={Image} className='h-13 w-40' alt="" />
                </div>
            </div>
            <div className='flex items-center'>
                <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"></div>
            </div>
        </header>
    )
}
