import React, { useState } from 'react'
import Image from "../../assets/no_user.png"
import { useLocation, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function StudentDetails() {
    const history = useHistory();
    const location = useLocation();
    const row = location.state?.row || {};
    const [activeTab, setActiveTab] = useState(0);
    const handleButtonClick = () => {
        history.goBack();
    };
    const tabs = [
        { label: 'General Settings', content: <GeneralSettings name={row.name} firstName={row.firstName} lastName={row.lastName} email={row.email} acca_id={row.acca_id} category={row.category} level={row.level} subject={row.subject} phone={row.phone} last_access={row.last_access} status={row.status} address={row.address} dob={row.dob} amountPaid={row.amountPaid} paymentOption={row.paymentOption} /> },
        { label: 'Program Details', content: <>{row.acca_id == null ? <ProgramDetails subjects={row.subjects || row.offeredProgram} /> : <></>}</> },
        { label: 'Book Dispatch Status', content: <BookDispatchStatus subject={row.subjectName} deliveryStatus={"Dispatched"} /> },
    ];
    const handleClick = (index) => { setActiveTab(index); };
    return (
        <div style={{ fontFamily: "Noto Sans" }}>
            <div className="text-3xl pb-7 w-1/2 px-5 py-6">
                <button className='flex items-center justify-between' onClick={handleButtonClick}>
                    <i className="fa-solid fa-chevron-left text-2xl"></i>
                    <h1 className='ml-3'>Student Profile</h1>
                </button>
            </div>
            <div className="vertical-tabs1 text-lg">
                <div className="tab-list1 bg-purple-100 w-1/6">
                    {tabs.map((tab, index) => (
                        <div key={index} className={`tab-item1 p-5 ${index === activeTab ? 'active bg-purple-400 border-4 border-r-purple-500 font-bold' : ''}`} onClick={() => handleClick(index)}>{tab.label}</div>
                    ))}
                </div>
                <div className="tab-content1">{tabs[activeTab].content}</div>
            </div>
        </div>
    );
}

const GeneralSettings = ({ name, firstName, lastName, email, acca_id, category, level, subject, phone, last_access, status, address, dob, amountPaid, paymentOption, discounted }) => {
    return (
        <>
            <div className="leading-normal overflow-x-hidden flex items-center justify-between h-[80vh]">
                <div className="p-4 w-1/2 items-center">
                    <div className='w-1/2'>
                        {acca_id == null ? <></> : <DetailTile title={"ACCA ID"} value={acca_id || "Not Available"} />}
                        <DetailTile title={"Category"} value={category || "Category"} />
                        {dob == null ? <></> : <DetailTile title={"Date of Birth"} value={dob || "Not Available"} />}
                        {level == null ? <></> : <DetailTile title={"Level"} value={level || "Not Available"} />}
                        {subject == null ? <></> : <DetailTile title={"Subject"} value={subject || "Not Available"} />}
                        <DetailTile title={"Phone"} value={phone || "Not Available"} />
                        <DetailTile title={"Payment Option"} value={paymentOption || "NA"} />
                        <DetailTile title={"Amount Paid"} value={"" || "50,000"} />{/*Change amount later*/}
                    </div>
                </div>
                <div className='w-1/2'>
                    {last_access == null ? <></> : <DetailTile title={"Last Accessed LMS"} value={last_access || "Not Available"} />}
                    <DetailTile title={"Status"} value={status || "NA"} />
                    <DetailTile title={"Address"} value={address || "Address"} />
                    <DetailTile title={"Amount Paid"} value={amountPaid || "No"} />
                    <DetailTile title={"Discount Offered"} value={discounted || "None"} />
                    <DetailTile title={"Total Amount"} value={"" || "1,00,000"} />
                </div>
                <div className="p-4 w-1/2">
                    <div className="flex-col px-10">
                        <div className='justify-center items-center'>
                            <img src={Image} className='rounded-full object-center' alt="" />
                        </div>
                        <div className="flex-col py-4">
                            <h1 className='text-3xl font-semibold text-center'>{name || firstName + " " + lastName}</h1>
                            <h1 className='text-xl font-semibold text-center'>{email || "example@email.com"}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const DetailTile = ({ title, value }) => {
    return (
        <div className="flex-col p-4">
            <div className="flex-col">
                <h1 className='text-md'>{title}</h1>
                <h2 className='text-2xl font-semibold'>{value}</h2>
            </div>
        </div>
    )
}

const ProgramDetails = ({ subjects }) => {
    return (
        <div className='p-3'>
            <h1 className="text-3xl font-semibold">Enrolled Subjects</h1>
            <div className="flex py-4">
                {
                    Array.isArray(subjects)
                        ? subjects.map((subject, index) => (
                            // subject === "CPA"||"ACCA"||"Skill"
                            //     ? <ProgramTile key={index} title={subject} pathName={`/${subject}-enrollments`} />
                                 <ProgramTile key={index} title={subject} pathName={`/details-${subject}`} />
                        ))
                        : <ProgramTile title={subjects} />
                }
            </div>
            <div class="flex flex-wrap h-[27vh]">
                <div className='w-1/2'>
                    <DetailTile title={"Book Availability Status"} value={"Available" || "NA"} />
                </div>
                <div className='w-1/2'>
                    <DetailTile title={"Hard Copy Provided"} value={"Yes" || "No"} />
                </div>
            </div>
        </div>
    );
}
const ProgramTile = ({ title, pathName }) => {
    const history = useHistory();
    const handleButtonClick = () => {
        history.push(pathName);
    };
    return (
        <button onClick={() => handleButtonClick()} className='lg:w-1/2 sm:w-1/2 p-4 flex justify-between py-2 items-center text-start'>
            <div className="px-6 py-12 relative z-10 w-full border border-gray-300 rounded-lg shadow-xl items-center">
                <div className="flex justify-between py-4">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3 w-1/2">{title}</h1>
                    <div className="h-10 w-10 rounded-full bg-purple-800 opacity-50"></div>
                </div>
            </div>
        </button>
    )
}

export const BookDispatchStatus = ({ subject, deliveryStatus, discounted }) => {
    return (<>
        <h1 className='text-3xl font-semibold px-2'>Book Dispatch Status</h1>
        <section class="container h-[70vh] mx-auto">
            <div class="flex flex-wrap">
                <div className="p-4 w-1/2 items-center">
                    <div className='w-1/2'>
                        <DetailTile title={"Subject Name"} value={subject || "Not Available"} />
                        <DetailTile title={"Book Delivery Status"} value={deliveryStatus || "NA"} />
                    </div>
                </div>
                <div className='w-1/2'>
                    <DetailTile title={"Discount Offered"} value={discounted || "No"} />
                </div>
            </div>
        </section>
    </>
    )
}
