import { rows } from './list';
import DownloadCSV from '../Utility/downloadCSV';
import React, { useEffect, useRef, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function TotalEnrollments() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const rowsPerPage = 10;
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredRows = rows.filter((row) => {
        return [
            row.email,
            row.phone,
            row.state,
            row.status,
            row.lastName,
            row.category,
            row.firstName,
            row.joiningDate,
            row.programMode,
            row.offeredProgram.toString()
        ].some(
            (field) => field && field.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });
    const filterRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
    const history = useHistory();
    const handleButtonClick = () => {
        history.goBack();
    };
    return (
        <div className='px-3.5 py-7' style={{ fontFamily: "Noto Sans" }}>
            <button className="flex items-center" onClick={handleButtonClick}>
                <i className="fa-solid fa-chevron-left text-2xl"></i>
                <h1 className='text-3xl text-black font-semibold ml-2'>Total Enrollments</h1>
                <div className="px-3">
                    <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60">
                        <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        <h2 class="text-sm font-normal text-emerald-500">70 Confirmed</h2>
                    </div>
                </div>
                <div className="px-3">
                    <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-red-100">
                        <span class="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        <h2 class="text-sm font-normal text-red-500">20 Cancelled</h2>
                    </div>
                </div>
                <div className="px-3">
                    <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100">
                        <span class="h-1.5 w-1.5 rounded-full bg-yellow-500"></span>
                        <h2 class="text-sm font-normal text-yellow-500">10 Refunded</h2>
                    </div>
                </div>
            </button>
            <section className="py-7 px-5 flex justify-between items-center">
                <div className="border border-gray-500 w-3/5 justify-between rounded-lg flex items-center px-1">
                    <input type="text" className='w-5/6 p-4 focus:outline-none focus:border-none' value={searchQuery} onChange={handleSearch} />
                    <i className="fa-solid fa-magnifying-glass text-center px-5"></i>
                </div>
                <div className="flex w-1/4 items-center">
                    <OptionsDropdown />
                </div>
            </section>
            <section className="mx-auto py-2">
                {/*<ImportCSV filePath={process.env.PUBLIC_URL + "/Data/TotalEnrollments.csv"} removeCol1={"subjectName"}/>*/}
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg items-center text-center">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">S. No</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">Date of Enrollment</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">First Name</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">Last Name</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">Email ID</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">Phone</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">State</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">Category</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">Mode of Learning</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">Number of Programs</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">Programs Offered</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700">Status</th>
                                            <th scope="col" className="px-2 py-6 text-sm font-normal text-gray-700 w-1/12">Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 items-center text-center py-4">
                                        {filterRows.map((row, index) => (<TableRow key={index} row={row} />))}
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
                        {Array.from({ length: Math.ceil(filteredRows.length / rowsPerPage) }).map((_, index) => (
                            <a key={index} className={`px-2 py-1 text-sm rounded-md hover:bg-gray-100 ${currentPage === index + 1 ? 'text-blue-500 bg-blue-100/60' : 'text-gray-500'}`} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </a>
                        ))}
                    </div>
                    <div className='flex'>
                        <DownloadCSV data={rows} />
                        <a className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ml-3" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredRows.length / rowsPerPage)}>
                            <span>Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}

const TableRow = ({ row, programName }) => {
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
    const statusColor = getStatusColor(row.status);
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
        if (isPopupVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopupVisible]);
    const [redirect, setRedirect] = useState(false);
    const [redirect1, setRedirect1] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleButtonClick = (row) => {
        const serializableRow = { ...row };
        setSelectedRow(serializableRow);
        setRedirect(true);
    };
    const handleButtonClick1 = (row) => {
        const serializableRow = { ...row };
        setSelectedRow(serializableRow);
        history.push({ pathname: '/edit-student-profile', state: { row } });
    };

    if (redirect && selectedRow) {
        return <Redirect to={{ pathname: "/student-details", state: { row: selectedRow } }} />;
    }
    if (redirect1 && selectedRow) {
        return <Redirect to={{ pathname: "/edit-student-profile", state: { row: selectedRow } }} />;
    }
    return (
        <>
            <tr>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{row.sno}</td>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{row.joiningDate}</td>
                <td className="px-2.5 py-3.5 text-sm text-black whitespace-nowrap font-semibold"><button onClick={() => handleButtonClick(row)}>{row.firstName}</button></td>
                <td className="px-2.5 py-3.5 text-sm text-black whitespace-nowrap font-semibold">{row.lastName}</td>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{row.email}</td>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{row.phone}</td>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{row.state}</td>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{row.category}</td>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{row.programMode}</td>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap">{row.numberofPrograms}</td>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap">
                    {Array.isArray(row.offeredProgram) ? row.offeredProgram.map((program, index) => (
                        <span key={index} className={`inline-block px-2 py-1 mr-1 rounded-full ${getBackgroundColor(program)}`}>{program}</span>
                    )) : row.offeredProgram}
                </td>
                <td className='py-2.5'>
                    <div className={`px-3 py-2  text-sm font-normal rounded-full gap-x-2 ${statusColor}`}>{row.status}</div>
                </td>
                <td className="px-2.5 py-3.5 text-sm text-gray-600 whitespace-nowrap flex justify-between items-center">
                    <button onClick={togglePopup}>
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
                    <button onClick={() => handleButtonClick1(row)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                </td>
            </tr>
        </>
    );
}

const OptionsDropdown = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className='flex items-center w-full justify-between'>
            <label htmlFor="options" className=''>Filter By:</label>
            <select id="options" className='border border-black px-2 py-4 rounded-lg w-3/4' value={selectedOption} onChange={handleChange}>
                <option value="" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">--Select--</option>
                <option value="option1" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Name: A to Z</option>
                <option value="option1" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Name: Z to A</option>
                <option value="option2" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Category: Live</option>
                <option value="option3" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Category: E-Learning</option>
                <option value="option4" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Status: Confirmed</option>
                <option value="option5" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Status: Cancelled</option>
                <option value="option5" className="block px-4 py-3 text-sm text-black capitalize transition-colors duration-300 transform hover:bg-gray-100">Status: Refunded</option>
            </select>
        </div>
    );
};