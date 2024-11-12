import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function Optionals() {
    const history = useHistory();
    const [redirect, setRedirect] = useState(false);
    const handleButtonClick = () => {
        // setRedirect(true);
        history.goBack();
    };
    
    return (
        <div className='p-5' style={{ fontFamily: "Noto Sans" }}>
            <div className="flex items-center justify-between w-1/3">
                <button className="flex items-center" onClick={handleButtonClick}>
                    <i className="fa-solid fa-chevron-left text-2xl"></i>
                    <h1 className='text-3xl text-black font-semibold ml-2'>Optional Enrollments</h1>
                </button>
            </div>
            <section className="container px-5 py-20 mx-auto">
                <div className="">
                    <div className="flex flex-wrap -m-4">
                        <EnrollmentTile title={"Advanced Audit and Assurance"} number={30} pathName={"details-aaa"} />
                        <EnrollmentTile title={"Advanced Taxation"} number={35} pathName={"details-atx"} />
                        <EnrollmentTile title={"Advanced Financial Management"} number={41} pathName={"details-afm"} />
                        <EnrollmentTile title={"Advanced Performance Management"} number={44} pathName={"details-apm"} />
                    </div>
                </div>
            </section>
        </div>
    )
}

const EnrollmentTile = ({ title, number, pathName }) => {
    const history=useHistory();
    const handleButtonClick = () => {
        history.push(pathName);
    };
    return (
        <button onClick={() => handleButtonClick()} className='lg:w-1/2 sm:w-1/2 p-4 flex justify-between py-2 items-center text-start'>
            <div className="px-6 py-12 relative z-10 w-full border border-gray-300 rounded-lg shadow-xl items-center">
                <div className="flex justify-between py-4">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3 w-1/2">{title}</h1>
                    <h1 className='text-3xl text-end w-1/3'>{number} <span className='text-xl'>Students</span></h1>
                </div>
            </div>
        </button>
    )
}