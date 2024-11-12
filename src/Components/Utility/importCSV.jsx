import "./importCSV.css"
import Papa from "papaparse"
import DownloadCSV from "./downloadCSV"
import { useHistory } from 'react-router-dom'
import React, { useState, useRef, useEffect } from "react"

export default function ImportCSV({ filePath, removeCol1, removeCol2, removeCol3, removeCol4 }) {
    const entriesPerPage = 10;
    const history = useHistory();
    const [csvData, setCSVData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [inputVisible, setInputVisible] = useState(true);
    useEffect(() => {
        fetch(filePath)
            .then(response => response.text())
            .then(text => {
                Papa.parse(text, {
                    complete: (result) => {
                        const filteredData = result.data.map(row => {
                            const filteredRow = {};
                            Object.keys(row).forEach(key => {
                                if (key.trim() !== '' && !key.startsWith('_') && key !== removeCol1 && key !== removeCol2 && key !== removeCol3 && key !== removeCol4) {
                                    filteredRow[key] = row[key];
                                }
                            });
                            return filteredRow;
                        });
                        setInputVisible(false);
                        setCSVData(filteredData);
                    },
                    header: true,
                    skipEmptyLines: true,
                });
            });
    }, []);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = csvData.slice(indexOfFirstEntry, indexOfLastEntry);

    const totalPages = Math.ceil(csvData.length / entriesPerPage);
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
    const getBackgroundColor = (program) => {
        switch (program) {
            case 'BT':
                return 'bg-blue-200';
            case 'TX':
                return 'bg-green-200';
            case 'MA':
                return 'bg-yellow-200';
            default:
                return 'bg-gray-200';
        }
    };
    const [selectedRow, setSelectedRow] = useState(null);
    const handleButtonClick = (row) => {
        const serializableRow = { ...row };
        setSelectedRow(serializableRow);
        // setRedirect(true);
        history.push({ pathname: "/student-details", state: { row: selectedRow } });
    };

    const statusColor = getStatusColor(csvData.status);
    const columnStyles = (header, content) => {
        switch (header) {
            case "Name":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-black whitespace-nowrap font-semibold"><button onClick={() => handleButtonClick(csvData)}>{content}</button></td>
                );
            case "Subject Name":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-black whitespace-nowrap font-semibold"><button onClick={() => handleButtonClick(csvData)}>{content}</button></td>
                );
            case "Number of Books":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-black whitespace-nowrap"><button onClick={() => handleButtonClick(csvData)}>{content}</button></td>
                );
            case "First Name":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-black whitespace-nowrap font-semibold"><button onClick={() => handleButtonClick(csvData)}>{content}</button></td>
                );
            case "Last Name":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-black whitespace-nowrap font-semibold">{content}</td>
                );
            case "Email":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-gray-600 whitespace-nowrap">{content}</td>
                );
            case "Phone":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-gray-600 whitespace-nowrap">{content}</td>
                );
            case "Status":
                return (
                    <td className={`px-1.5 py-2.5 text-center text-sm font-normal rounded-full gap-x-2 ${statusColor}`}>{content}</td>
                );
            case "Category":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-gray-600 whitespace-nowrap">{content}</td>
                );
            case "Offered Program":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-gray-600 whitespace-nowrap">
                        {Array.isArray(content) ? content.map((program, index) => (
                            <span key={index} className={`inline-block px-2 py-1 mr-1 rounded-full ${getBackgroundColor(program)}`}>{program}</span>
                        )) : content}
                    </td>
                );
            case "Program Mode":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-gray-600 whitespace-nowrap">{content}</td>
                );
            case "NumberofPrograms":
                return (
                    <td className="py-2.5 text-center text-sm text-gray-600 whitespace-nowrap bg-black">{content}</td>
                );
            case "State":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-gray-600 whitespace-nowrap">{content}</td>
                );
            case "Address":
                return (<td className="px-1.5 py-2.5 text-sm text-gray-600 whitespace-nowrap">{content}</td>);
            case "Joining Date":
                return (<td className="px-1.5 py-2.5 text-sm text-gray-600 whitespace-nowrap">{content}</td>);
            default:
                return (<td className="px-1.5 py-2.5 text-sm text-gray-600 whitespace-nowrap">{content}</td>);
        }
    }
    const popupRef = useRef(null);
    const [isPopupVisible, setisPopupVisible] = useState(false);
    const togglePopup = () => {
        setisPopupVisible(!isPopupVisible);
    };
    const handleDelete = (rowIndex) => {
        const updatedData = csvData.filter((_, index) => index !== rowIndex);
        setCSVData(updatedData);
        // Update CSV file
    };

    const handleEdit = (rowIndex) => {
        const rowData = csvData[rowIndex];
        history.push({ pathname: '/edit-user', state: { rowData, rowIndex } });
    };
    return (
        <>
            <section className="flex flex-col mt-7">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle lg:px-12">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {csvData.length > 0 && Object.keys(csvData[0]).map((header, index) => (
                                            index !== removeCol1 && index !== removeCol2 && <th key={index} scope="col" className="px-3 py-4 text-sm font-normal text-center text-gray-600 capitalize">
                                                {header}
                                            </th>))
                                        }
                                        {!inputVisible && (
                                            <th scope="col" className="w-1/7 px-3 py-4 text-sm font-normal text-center text-gray-600 capitalize">
                                                Edit
                                            </th>)}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-center">
                                    {currentEntries.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="text-center">
                                            {Object.entries(row).map(([header, content], colIndex) => (
                                                <td key={colIndex} className="px-3 py-4 text-sm text-gray-500 text-center whitespace-nowrap">
                                                    {columnStyles(header, content)}
                                                </td>
                                            ))}
                                            <td className="w-1/7 justify-between text-center px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
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
                                                                <button className="bg-red-700 hover:bg-red-800 text-white py-3 px-4 rounded-lg" onClick={() => {
                                                                    handleDelete(rowIndex); togglePopup();
                                                                }}>Yes I'm Sure</button>
                                                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-500 py-3 px-4 rounded-lg ml-3" onClick={togglePopup}>Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <button onClick={() => handleEdit(rowIndex)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                    <a className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                        <i className="fa-solid fa-chevron-left"></i>
                        <span>Previous</span>
                    </a>
                    <div className="items-center hidden lg:flex gap-x-3">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <a key={index} className={`px-2 py-1 text-sm rounded-md hover:bg-gray-100 ${currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60' : 'text-gray-500'}`} onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                            </a>
                        ))}
                    </div>
                    <div className='flex'>
                        {csvData == null ? <></> : <DownloadCSV data={csvData} />}
                        <a className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ml-3" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
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
