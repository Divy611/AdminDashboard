import React, { useState } from 'react'
import { Redirect, useLocation } from 'react-router-dom/cjs/react-router-dom.min'

export default function MasterStudentData() {
    const location = useLocation();
    const row = location.state?.row || {};
    const [redirect, setRedirect] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const handleButtonClick = () => {
        setRedirect(true);
    };
    if (redirect) { return <Redirect to={{ pathname: "/total-enrollments", state: { row } }} />; }
    const tabs = [
        { label: 'General Settings', content: <GeneralSettings name={row.firstName + " " + row.lastName} email={row.email} acca_id={row.acca_id} category={row.category} joiningDate={row.joiningDate} state={row.state} level={row.level} programMode={row.programMode} phone={row.phone} last_access={row.last_access} status={row.status} address={row.address} /> },
        row.acca_id == null ? { label: 'Book Dispatch Status', content: <></> } : { label: 'Program Details', content: <ACCADetails /> },
        row.acca_id == null ? {} : { label: 'Book Dispatch Status', content: <></> },
    ];
    const handleClick = (index) => {
        setActiveTab(index);
    };
    return (
        <div style={{ fontFamily: "Noto Sans" }}>
            <div className="text-3xl pb-7 w-1/2 px-5 py-6">
                <button className='flex items-center justify-between' onClick={handleButtonClick}>
                    <i className="fa-solid fa-chevron-left text-2xl"></i>
                    <h1 className='ml-3'>Student Profile</h1>
                </button>
            </div>
            <div className="vertical-tabs text-lg">
                <div className="tab-list bg-purple-100 w-1/6">
                    {tabs.map((tab, index) => (
                        <div key={index} className={`tab-item p-5 ${index === activeTab ? 'active bg-purple-400 border-r-4 border-r-purple-500 font-bold' : ''}`} onClick={() => handleClick(index)}>{tab.label}</div>
                    ))}
                </div>
                <div className="tab-content">{tabs[activeTab].content}</div>
            </div>
        </div>
    );
}

const GeneralSettings = ({ name, email, category, joiningDate, programMode, phone, state, dob, status, address }) => {
    return (
        <div className="leading-normal overflow-x-hidden flex items-center justify-between">
            <div className="p-4 w-1/2">
                <div className='w-1/2'>
                    <DetailTile title={"Phone"} value={phone || "Not Available"} />
                    <DetailTile title={"Status"} value={status || "Status"} />
                    <DetailTile title={"Category"} value={category || "Category"} />
                    <DetailTile title={"Program Mode"} value={programMode || "Subject"} />
                </div>
            </div>
            <div className='w-1/2'>
                <DetailTile title={"State"} value={state || "Not Available"} />
                <DetailTile title={"Enrollment Date"} value={joiningDate || "NA"} />
                <DetailTile title={"DOB"} value={dob || "NA"} />
            </div>
            <div className="p-4 w-1/2 text-center">
                <div className="flex-col">
                    <div className='justify-center w-1/2'><img src={Image} className='rounded-full' alt="" /></div>
                    <h1 className='text-3xl font-semibold'>{name || "Name"}</h1>
                    <h1 className='text-xl font-semibold'>{email || "example@email.com"}</h1>
                </div>
            </div>
        </div>
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

const ACCADetails = () => {
    return (
        <>ACCA Details go here</>
    );
}
