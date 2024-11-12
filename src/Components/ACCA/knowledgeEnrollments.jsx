import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

export default function KnowledgeEnrollments() {
    const history = useHistory();
    const handleButtonClick = () => {
        history.goBack();
    };
    return (
        <div className='p-6' style={{ fontFamily: "Noto Sans" }}>
            <button className="flex items-center" onClick={handleButtonClick}>
                <i className="fa-solid fa-chevron-left text-2xl"></i>
                <h1 className='text-3xl text-black font-semibold ml-2'>Knowledge Enrollments</h1>
            </button>
            <section className="container px-5 py-20 mx-auto">
                <div className="">
                    <div className="flex flex-wrap -m-4">
                        <EnrollmentTile title={"Business and Technology"} number={60} pathName={"details-bt"} />
                        <EnrollmentTile title={"Management Accounting"} number={45} pathName={"details-ma"} />
                        <EnrollmentTile title={"Financial Accounting"} number={45} pathName={"details-fa"} />
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
        <div className="lg:w-1/3 sm:w-1/2 p-4">
            <button onClick={() => handleButtonClick()} className='flex justify-between py-2 items-center w-full'>
                <div className="px-6 py-12 relative z-10 w-full border border-gray-300 rounded-lg shadow-xl">
                    <div className="flex justify-between items-center py-4 text-start">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3 w-1/2">{title}</h1>
                        <h1 className='text-3xl text-end'>{number} <span className='text-xl'>Students</span></h1>
                    </div>
                </div>
            </button>
        </div>
    )
}