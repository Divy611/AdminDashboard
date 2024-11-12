import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function Skillenrollments() {
    const history = useHistory();
    const handleButtonClick = () => {
        history.goBack();
    };
    return (
        <div className='p-6'>
            <button className="flex items-center" onClick={handleButtonClick}>
                <i className="fa-solid fa-chevron-left text-2xl"></i>
                <h1 className='text-3xl text-black font-semibold ml-2'>Skill Enrollments</h1>
            </button>
            <section className="container px-5 py-20 mx-auto">
                <div className="">
                    <div className="flex flex-wrap -m-4">
                        <EnrollmentTile title={"Corporate and Business Law"} number={20} pathName={'details-cbl'} />
                        <EnrollmentTile title={"Performance Management"} number={30} pathName={'details-pm'} />
                        <EnrollmentTile title={"Taxation"} number={45} pathName={'details-tx'} />
                        <EnrollmentTile title={"Financial Reporting"} number={40} pathName={'details-fr'} />
                        <EnrollmentTile title={"Audit and Assurance"} number={34} pathName={'details-aa'} />
                        <EnrollmentTile title={"Financial Management"} number={66} pathName={'details-fm'} />
                    </div>
                </div>
            </section>
        </div>
    )
}

const EnrollmentTile = ({ title, number, pathName }) => {
    const history = useHistory();
    const handleButtonClick = (path) => {
        history.push(pathName); 
    };
    return (
        <div className="lg:w-1/3 sm:w-1/2 p-4">
            <div className="flex w-full h-full">
                <button onClick={() => handleButtonClick(`/${pathName}`)} className='flex justify-between py-2 items-center w-full'>
                    <div className="px-5 py-12 relative z-10 w-full border border-gray-300 rounded-lg shadow-xl">
                        <div className="flex justify-between items-center py-4">
                            <h1 className="text-start text-lg font-medium text-gray-900 mb-3 w-1/2">{title}</h1>
                            <h1 className='text-3xl text-end w-1/3'>{number} <span className='text-xl'>Students</span></h1>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}
