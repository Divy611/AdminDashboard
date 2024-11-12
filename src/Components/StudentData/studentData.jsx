import "./studentData.css"
import { rows } from "./rows";
import DownloadCSV from "../Utility/downloadCSV";
import { DashboardHeader } from "../Header/header";
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function StudentData() {
    const rowsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <>
            <DashboardHeader title={"Student Data"} />
            {/* <div className="py-12">
                <ImportCSV filePath={process.env.PUBLIC_URL + "/Data/StudentData.csv"} removeCol1={"Subject Name"} />
            </div> */}
            <h2 className="px-4 text-xl">Total entries: 100</h2>

            <section className="container px-1.5 py-12 mx-auto">
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg items-center text-center">
                                <table className="min-w-full divide-y divide-gray-200" style={{ fontFamily: "Noto Sans" }}>
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">S. No</th>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">Name</th>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">Email ID</th>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">Mobile Number</th>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">Program Offered</th>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">Category</th>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">Mode of Program</th>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">Number of Programs</th>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">Status</th>
                                            <th scope="col" className="px-2 py-4 text-sm font-normal text-gray-700">Address</th>
                                            <th scope="col" className="px-2 py-4 w-1/2 text-sm font-normal text-gray-700">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 items-center text-center py-4">
                                        {currentRows.map((row, index) => (<TableRow key={index} row={row} />))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <a className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        <i className="fa-solid fa-chevron-left"></i>
                        <span>Previous</span>
                    </a>
                    <div className="items-center hidden lg:flex gap-x-3">
                        {Array.from({ length: Math.ceil(rows.length / rowsPerPage) }).map((_, index) => (
                            <a key={index} className={`px-2 py-1 text-sm rounded-md hover:bg-gray-100 ${currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60' : 'text-gray-500'}`} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </a>
                        ))}
                    </div>
                    <div className="flex">
                        <DownloadCSV data={rows} />
                        <a className="flex items-center ml-3 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(rows.length / rowsPerPage)}>
                            <span>Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}

const TableRow = ({ row }) => {
    const history = useHistory();
    const popupRef = useRef(null);
    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-emerald-100/60 text-emerald-600';
            case 'Refunded':
                return 'bg-yellow-100 text-yellow-800';
            case 'Cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-white text-black';
        }
    };
    const statusColor = getStatusColor(row.status);
    const [redirect, setRedirect] = useState(false);
    const [isPopupVisible, setisPopupVisible] = useState(false);
    const handleButtonClick = () => {
        history.push({ pathname: '/student-details', state: { row } });
    };
    const handleEditClick = () => {
        history.push({ pathname: '/edit-student-profile', state: { row } });
    };
    const togglePopup = () => {
        setisPopupVisible(!isPopupVisible);
    };
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setisPopupVisible(false);
        }
    };
    useEffect(() => {
        if (isPopupVisible) { document.addEventListener('mousedown', handleClickOutside); }
        else { document.removeEventListener('mousedown', handleClickOutside); }
        return () => { document.removeEventListener('mousedown', handleClickOutside); };
    }, [isPopupVisible]);
    if (redirect) {
        //return <Redirect to={{ pathname: "/student-details", state: { row } }} />; 
    }

    return (
        <>
            <tr>
                <td className="px-3 py-3.5 text-sm text-gray-500 whitespace-nowrap">{row.sno}</td>
                <button onClick={handleButtonClick} className="text-start">
                    <td className="px-3 py-3.5 flex gap-x-2 font-bold text-gray-800 text-sm text-gray-700 whitespace-nowrap text-start">{row.name}</td>
                </button>
                <td className="px-3 py-3.5 text-sm text-gray-500 whitespace-nowrap text-start">{row.email}</td>
                <td className="px-3 py-3.5 text-sm text-gray-500 whitespace-nowrap">{row.phone}</td>
                <td className="px-3 py-3.5 text-sm text-gray-500 whitespace-nowrap">{row.category}</td>
                <td className="px-3 py-3.5 text-sm text-gray-500 whitespace-nowrap">{row.offeredProgram}</td>
                <td className="px-3 py-3.5 text-sm text-gray-500 whitespace-nowrap">{row.programMode}</td>
                <td className="px-3 py-3 text-sm text-gray-500 whitespace-nowrap">{row.numberofPrograms}</td>
                <td className={`inline px-3 py-3.5 text-sm font-normal rounded-full ${statusColor}`}>{row.status}</td>
                <td className="px-3 py-3.5 text-sm text-gray-500 whitespace-nowrap">{row.address}</td>
                <td className="px-3 py-3.5 text-md text-gray-500 flex justify-between items-center w-full">
                    <button onClick={togglePopup}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                    {isPopupVisible && (
                        <div className="popup w-full h-full items-center justify-center flex">
                            <div className="popup-content bg-white px-16 py-10 rounded-lg" ref={popupRef}>
                                <button className="close hover:text-black" onClick={togglePopup} style={{ right: "20px", fontSize: "xx-large" }}>&times;</button>
                                <p className="">Are you sure you want to<br /> delete this entry?</p>
                                <div className="py-5 flex">
                                    <button className="bg-red-700 hover:bg-red-800 text-white py-3 px-4 rounded-lg">Yes I'm Sure</button>
                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-500 py-3 px-4 rounded-lg ml-3" onClick={togglePopup}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}
                    <button onClick={handleEditClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                </td>
            </tr>
        </>
    );
}