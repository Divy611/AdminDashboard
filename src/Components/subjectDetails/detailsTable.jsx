import DownloadCSV from '../Utility/downloadCSV';
import React, { useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function DetailsTable({ headers,  subject }) {
    const rows = [
        { sno: 1, name: 'Amit Chauhan', email: "amitchauhan77717@gmail.com", phone: "8676789800", status: "Confirmed", category: "Combo", offeredProgram: "Skill", subjectName:subject, programMode: "Online Live", numberofPrograms: "3", address: "Faridabad" },
        { sno: 2, name: 'Divy Parikh', email: "divy.parikh@gmail.com", phone: "3456789878", status: "Confirmed", category: "Combo", offeredProgram: "Skill", subjectName:subject, programMode: "Online Live", numberofPrograms: "4", address: "New Delhi" },
        { sno: 3, name: 'Divyam', email: "divyam@gmail.com", phone: "9654678908", status: "Confirmed", category: "Individual", offeredProgram: "CPA", subjectName:subject, programMode: "Online Live", numberofPrograms: "1", address: "Noida" },
        { sno: 4, name: 'Jaineet', email: "jaineet@gmail.com", phone: "6578908877", status: "Refunded", category: "Combo", offeredProgram: "ACCA", subjectName:subject, programMode: "E-Learning", numberofPrograms: "5", address: "Gurugram" },
        { sno: 5, name: 'Jaineet Arora', email: "jaineet.arora@gmail.com", phone: "8676789800", status: "Confirmed", category: "Combo", offeredProgram: "Skill", subjectName:subject, programMode: "Online Live", numberofPrograms: "3", address: "Faridabad" },
        { sno: 6, name: 'Amit Chauhan', email: "amitchauhan77717@gmail.com", phone: "8676789800", status: "Cancelled", category: "Combo", offeredProgram: "Skill", subjectName:subject, programMode: "Online Live", numberofPrograms: "3", address: "Faridabad" },
        { sno: 7, name: 'Divy Parikh', email: "divy.parikh@gmail.com", phone: "3456789878", status: "Cancelled", category: "Combo", offeredProgram: "Skill", subjectName:subject, programMode: "Online Live", numberofPrograms: "4", address: "New Delhi" },
        { sno: 8, name: 'Divyam', email: "divyam@gmail.com", phone: "9654678908", status: "Confirmed", category: "Individual", offeredProgram: "CPA", subjectName:subject, programMode: "Online Live", numberofPrograms: "1", address: "Noida" },
        { sno: 9, name: 'Jaineet', email: "jaineet@gmail.com", phone: "6578908877", status: "Confirmed", category: "Combo", offeredProgram: "ACCA", subjectName:subject, programMode: "E-Learning", numberofPrograms: "5", address: "Gurugram" },
        { sno: 10, name: 'Jaineet Arora', email: "jaineet.arora@gmail.com", phone: "8676789800", status: "Confirmed", category: "Combo", offeredProgram: "Skill", subjectName:subject, programMode: "Online Live", numberofPrograms: "3", address: "Faridabad" },
        { sno: 11, name: 'Amit Chauhan', email: "amitchauhan77717@gmail.com", phone: "8676789800", status: "Confirmed", category: "Combo", offeredProgram: "Skill", subjectName:subject, programMode: "Online Live", numberofPrograms: "3", address: "Faridabad" },
        { sno: 12, name: 'Divy Parikh', email: "divy.parikh@gmail.com", phone: "3456789878", status: "Refunded", category: "Combo", offeredProgram: "Skill", subjectName:subject, programMode: "Online Live", numberofPrograms: "4", address: "New Delhi" },
        { sno: 13, name: 'Divyam', email: "divyam@gmail.com", phone: "9654678908", status: "Cancelled", category: "Individual", offeredProgram: "CPA", subjectName:subject, programMode: "Online Live", numberofPrograms: "1", address: "Noida" },
        { sno: 14, name: 'Jaineet', email: "jaineet@gmail.com", phone: "6578908877", status: "Refunded", category: "Combo", offeredProgram: "ACCA", subjectName:subject, programMode: "E-Learning", numberofPrograms: "5", address: "Gurugram" },
        { sno: 15, name: 'Jaineet Arora', email: "jaineet.arora@gmail.com", phone: "8676789800", status: "Confirmed", category: "Combo", offeredProgram: "Skill", subjectName:subject, programMode: "Online Live", numberofPrograms: "3", address: "Faridabad" },
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = rows.slice(indexOfFirstRow, indexOfLastRow);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const popupRef = useRef(null);
    const [isPopupVisible, setisPopupVisible] = useState(false);
    const togglePopup = () => {
        setisPopupVisible(!isPopupVisible);
    };
    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setisPopupVisible(false);
        }
    };
    useEffect(() => {
        if (isPopupVisible) {document.addEventListener('mousedown', handleClickOutside);}
        else {document.removeEventListener('mousedown', handleClickOutside);}
        return () => {document.removeEventListener('mousedown', handleClickOutside);};
    }, [isPopupVisible]);
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
    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const [redirect, setRedirect] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleButtonClick = (row) => {
        setSelectedRow(row);
        setRedirect(true);
    };

    if (redirect && selectedRow) { return <Redirect to={{ pathname: "/student-details", state: { row: selectedRow } }} />; }
    return (
        <section className="container px-4 py-8 mx-auto">
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>{headers.map((row) => (<th scope="col" className="py-4 px-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">{row}</th>))}</tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentRows.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{row.sno}</td>
                                            <td className="px-4 py-4 text-center text-sm font-medium text-gray-700 whitespace-nowrap"><button onClick={() => handleButtonClick(row)}>{row.name}</button></td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{row.email}</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-500 whitespace-nowrap">{row.phone}</td>
                                            <td className="px-4 py-4 text-center text-sm whitespace-nowrap">{row.subjectName}</td>
                                            <div className='py-4 text-center'><td className={`inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 ${getStatusColor(row.status)}`}>{row.status}</td></div>
                                            <td className="px-4 py-4 text-center text-sm whitespace-nowrap justify-between">
                                                <div className="flex items-center text-center justify-between">
                                                    <button onClick={togglePopup} className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                    {isPopupVisible && (
                                                        <div className="popup w-full h-full items-center justify-center flex">
                                                            <div className="popup-content bg-white p-14 rounded-lg" ref={popupRef}>
                                                                <button className="close hover:text-black" onClick={togglePopup} style={{ right: "20px", fontSize: "xx-large" }}>&times;</button>
                                                                <p className="py-4 text-lg">Are you sure you want to<br /> delete this entry?</p>
                                                                <div className="py-3 flex">
                                                                    <button className="bg-red-700 hover:bg-red-800 text-white py-3 px-4 rounded-lg">Yes I'm Sure</button>
                                                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-600 py-3 px-4 rounded-lg ml-3" onClick={togglePopup}>Cancel</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <button className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className='flex'>
                    <button className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        <i className="fa-solid fa-chevron-left"></i>
                        <span>Previous</span>
                    </button>
                    <select id="options" className='ml-2 border border-gray-400 px-2 py-4 rounded-lg w-3/4' value={selectedOption} onChange={handleChange}>
                        <option value="" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Results per Page</option>
                        <option value="option1" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">50</option>
                        <option value="option2" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">75</option>
                        <option value="option3" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">100</option>
                        <option value="option4" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">150</option>
                        <option value="option5" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">300</option>
                    </select>
                    {/* <p>You selected: {selectedOption}</p> */}
                </div>
                <div className="items-center hidden lg:flex gap-x-3">
                    {Array.from({ length: Math.ceil(currentRows.length / rowsPerPage) }).map((_, index) => (
                        <button key={index} className={`px-2 py-1 text-sm rounded-md hover:bg-gray-100 ${currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60' : 'text-gray-500'}`} onClick={() => paginate(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
                <div className="flex">
                <DownloadCSV data={rows}/>
                <button className="flex items-center px-5 py-2 text-sm text-gray-700 ml-2 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(currentRows.length / rowsPerPage)}>
                    <span>Next</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </button>
                </div>
            </div>
        </section>
    )
}
