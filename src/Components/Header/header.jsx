import "./header.css"
import { AuthStatus } from "../../App"
import Image from "../../assets/main-logo.png"
import Image1 from "../../assets/user_image.jpg"
import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Header() {
  return (
    <header style={{ fontFamily: "Noto Sans" }} className="mx-auto flex flex-wrap flex-col md:flex-row items-center shadow-md justify-between p-6">
      <div className='flex items-center'>
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={Image} className='h-13 w-40' alt="" />
        </Link>
        <div className="ml-6">
          <Link to="/">
            <div className="flex items-center text-gray-800">
              <i className="fa-solid fa-house"></i><h1 className="text-xl ml-2">Home</h1></div>
          </Link>
        </div>
      </div>
      <DropdownMenu />
    </header>
  )
}

export function DashboardHeader({title}) {
  return (
    <header style={{ fontFamily: "Noto Sans" }} className="mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between px-4 py-2">
      <div className='flex items-center'>
        <h1 className="text-4xl font-semibold capitalize">{title}</h1>
      </div>
      <DropdownMenu />
    </header>
  )
}


const DropdownMenu = () => {
  const history=useHistory();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState(AuthStatus.NOT_DETERMINED);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const logOut = () => {
    //event.preventDefault();
    setAuthStatus(AuthStatus.NOT_LOGGED_IN);
    window.location.reload();
  };
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-button rounded-lg border-0 py-1 px-3 focus:outline-none hover:bg-gray-50 rounded text-base mt-4 md:mt-0">
        <div className="flex justify-between items-center">
          <div className="flex-col text-start">
            <h1 className='text-xl font-semibold'>Kapil Arora</h1>
            <h2 className='text-md'>kapil.arora@in.gt.com</h2>
          </div>
          <div className="w-12 h-12">
            <img src={Image1} className='rounded-full' alt="" />
          </div>
        </div>
      </button>
      {isOpen && (
        <ul className="dropdown-menu z-10 rounded-lg">
          <Link to="/admin"><li className="dropdown-item p-5">Admin Profile</li></Link>
          <button className="w-full text-start" onClick={logOut}><li className="dropdown-item p-5">Log out</li></button>
        </ul>
      )}
    </div>
  );
};