import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom/cjs/react-router-dom';
import Header from '../Header/header';

export default function ACCA() {
    const history = useHistory();
    const handleButtonClick = () => {
        history.goBack();
    };

    return (
        <>
            <div className='p-6'>
                <button className="flex items-center w-1/4" onClick={handleButtonClick}>
                    <i className="fa-solid fa-chevron-left text-2xl"></i>
                    <h1 className='lg:text-3xl sm:text-xl text-black font-semibold lg:ml-2 sm:text-start'>ACCA Enrollments</h1>
                </button>
                <section className="container px-5 py-20 mx-auto">
                    <div className="">
                        <div className="flex flex-wrap -m-4">
                            {/* <EnrollmentTile title={"Master Data"} number={630} pathName={'master-data'} /> */}
                            <EnrollmentTile title={"Knowledge Level"} number={150} pathName={'knowledge-enrollments'} />
                            <EnrollmentTile title={"Skill Level"} number={235} pathName={'skill-enrollments'} />
                            <EnrollmentTile title={"Professional Level"} number={245} pathName={'professional-enrollments'} />
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

const EnrollmentTile = ({ title, number, pathName }) => {
    const history = useHistory();
    const [redirect, setRedirect] = useState(false);
    const handleButtonClick = () => {
        history.push(pathName);
    };

    return (
        <div className="lg:w-1/3 sm:w-1/2 p-4">
            <button onClick={() => handleButtonClick()} className='flex items-center justify-between py-2 w-full'>
                <div className="px-5 py-12 items-center relative z-10 w-full border border-gray-300 rounded-lg shadow-xl">
                    <div className="flex justify-between items-center py-4 text-start">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3 w-1/2">{title}</h1>
                        <h1 className='text-3xl text-end'>{number} <span className='text-xl'>Students</span></h1>
                    </div>
                </div>
            </button>
        </div>
    )
}
