import { firestore } from '../../firebase-config'
import { DashboardHeader } from '../Header/header'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'

export default function Users() {
    return (
        <div className='h-screen'>
            <DashboardHeader title={"Users"} />
            <div className='py-12'>
                {/* <ImportCSV filePath={process.env.PUBLIC_URL + "/Data/Users.csv"} /> */}
                <UserTable />
            </div>
        </div>
    )
}

const UserTable = () => {
    const entriesPerPage = 10;
    const popupRef = useRef(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastEntry = currentPage * entriesPerPage;
    const [inputVisible, setInputVisible] = useState(true);
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const [isPopupVisible, setisPopupVisible] = useState(false);
    const totalPages = Math.ceil(users.length / entriesPerPage);
    const currentEntries = users.slice(indexOfFirstEntry, indexOfLastEntry);
    const togglePopup = () => {
        setisPopupVisible(!isPopupVisible);
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const columnStyles = (header, content) => {
        switch (header) {
            case "Name":
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
            case "Category":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-gray-600 whitespace-nowrap">{content}</td>
                );
            case "State":
                return (
                    <td className="px-1.5 py-2.5 text-center text-sm text-gray-600 whitespace-nowrap">{content}</td>
                );
            case "Joining Date":
                return (<td className="px-1.5 py-2.5 text-sm text-gray-600 whitespace-nowrap">{content}</td>);
            default:
                return (<td className="px-1.5 py-2.5 text-sm text-gray-600 whitespace-nowrap">{content}</td>);
        }
    }
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "users"));
                const usersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList);
            } catch (err) {
                setError("Error fetching users");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <h2 className="px-4 text-xl">Total users: {users.length}</h2>
            <div className="flex flex-col mt-7">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle lg:px-12">
                        <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-3 py-4 text-sm font-normal text-center text-gray-600 capitalize">Name</th>
                                        <th scope="col" className="px-3 py-4 text-sm font-normal text-center text-gray-600 capitalize">Email</th>
                                        <th scope="col" className="px-3 py-4 text-sm font-normal text-center text-gray-600 capitalize">Date Joined</th>
                                    </tr>
                                    {/* <tr>
                                        {users.length > 0 && Object.keys(users[0]).map((header, index) => (
                                            <th key={index} scope="col" className="px-3 py-4 text-sm font-normal text-center text-gray-600 capitalize">
                                                {header}
                                            </th>))
                                        }
                                        {!inputVisible && (
                                            <th scope="col" className="w-1/7 px-3 py-4 text-sm font-normal text-center text-gray-600 capitalize">
                                                Edit
                                            </th>)}
                                    </tr> */}
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 text-center">
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="px-3 py-4 text-sm text-gray-500 text-center whitespace-nowrap">{user.name}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500 text-center whitespace-nowrap">{user.email}</td>
                                            <td className="px-3 py-4 text-sm text-gray-500 text-center whitespace-nowrap">{user.createdAt}</td>
                                        </tr>
                                    ))}
                                    {/* {currentEntries.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="text-center">
                                            {Object.entries(row).map(([header, content], colIndex) => (
                                                <td key={colIndex} className="px-3 py-4 text-sm text-gray-500 text-center whitespace-nowrap">{columnStyles(header, content)}</td>
                                            ))} 
                                            {/* <td className="w-1/7 justify-between text-center px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
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
                                                                <button className="bg-red-700 hover:bg-red-800 text-white py-3 px-4 rounded-lg" onClick={() => {handleDelete(rowIndex); togglePopup();}}>Yes I'm Sure</button>
                                                                <button className="bg-red-700 hover:bg-red-800 text-white py-3 px-4 rounded-lg">Yes I'm Sure</button>
                                                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-500 py-3 px-4 rounded-lg ml-3" onClick={togglePopup}>Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* <button onClick={() => handleEdit(rowIndex)}>
                                                <button>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                            </td> 
                                        </tr>
                                    ))} */}
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
                        {/* {users == null ? <></> : <DownloadCSV data={users} />} */}
                        <a className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 ml-3" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <span>Next</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            {/* <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    )
}