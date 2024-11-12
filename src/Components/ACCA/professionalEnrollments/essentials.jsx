import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function Essentials() {
    const history = useHistory();
    const handleButtonClick = () => {
        history.goBack();
    };
    return (
        <div className='p-5' style={{ fontFamily: "Noto Sans" }}>
            <div className="flex items-center justify-between w-1/3">
                <button className="flex items-center" onClick={handleButtonClick}>
                    <i className="fa-solid fa-chevron-left text-2xl"></i>
                    <h1 className='text-3xl text-black font-semibold ml-2'>Essential Enrollments</h1>
                </button>
            </div>
            <section className="container px-5 py-20 mx-auto">
                <div className="">
                    <div className="flex flex-wrap -m-4">
                        <EnrollmentTile title={"Strategic Business Leadership"} number={39} pathName={"details-sbl"} />
                        <EnrollmentTile title={"Strategic Business Reporting"} number={41} pathName={"details-sbr"} />
                    </div>
                </div>
            </section>
        </div>
    )
}

const EnrollmentTile = ({ title, number, pathName }) => {
    const history = useHistory();
    const handleButtonClick = () => {
        history.push(pathName); 
    };
    return (
        <div className="lg:w-1/2 sm:w-1/2 p-4">
            <button onClick={() => handleButtonClick(`/${pathName}`)} className='flex justify-between py-2 items-center w-full'>
                <div className="px-5 py-12 relative z-10 w-full border border-gray-300 rounded-lg shadow-xl">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3 w-1/2">{title}</h1>
                        <h1 className='text-3xl text-end'>{number} <span className='text-xl'>Students</span></h1>
                    </div>
                </div>
            </button>
        </div>
    )
}