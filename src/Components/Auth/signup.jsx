import React from 'react'
//import Image from "../../assets/signup.png"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Signup() {
    return (
        <section className="flex flex-wrap">
            <div className="pt-7 h-full bg-purple-300 w-full md:w-1/2 flex flex-col">
                <div className="flex flex-col justify-center md:justify-start my-auto md:pt-0 px-8 md:px-24 lg:px-32">
                    <p className="text-center text-4xl font-bold">Join Us!</p>
                    <form className="flex flex-col pt-3 md:pt-8">
                        <div className="flex flex-col pt-4">
                            <label htmlFor="name" className="text-lg">Name</label>
                            <input type="text" id="name" placeholder="Your Name Here" className="rounded-lg shadow appearance-none border rounded w-full p-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="flex flex-col pt-4">
                            <label htmlFor="email" className="text-lg">Email</label>
                            <input type="email" id="email" placeholder="example@email.com" className="rounded-lg shadow appearance-none border rounded w-full p-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="flex flex-col pt-4">
                            <label htmlFor="password" className="text-lg">Password</label>
                            <input type="password" id="password" placeholder="Password" className="rounded-lg shadow appearance-none border rounded w-full p-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="flex flex-col pt-4">
                            <label htmlFor="password" className="text-lg">Confirm Password</label>
                            <input type="password" id="password" placeholder="Confirm Password" className="rounded-lg shadow appearance-none border rounded w-full p-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <input type="submit" value="Register" className="bg-purple-800 rounded-lg text-white font-bold text-lg hover:bg-purple-700 p-2 mt-8" />
                    </form>
                    <div className="text-center pt-12 pb-12">
                        <p>Already have an account? <Link to="/" className="underline font-semibold">Log in here.</Link></p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 shadow-2xl">
                <img className="object-cover w-full h-full hidden md:block" src='https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=600' alt="" />
            </div>
        </section>
    )
}
