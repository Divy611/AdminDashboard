import "./login.css"
import { AuthStatus } from '../../App'
import React, { useState } from 'react'
import { auth } from '../../firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min"


export default function Login({ setAuthStatus }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const signIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setAuthStatus(AuthStatus.LOGGED_IN);
            setRedirect(true);
        } catch (err) {
            console.error(err);
            setMessage(err.message);
        }
    };

    if (redirect) {
        return <Redirect to="/" />;
    }
    return (
        <section className="bg-white font-family-karla h-screen">
            <div className="w-full flex flex-wrap">
                <div className="w-1/2 shadow-2xl">
                    <img className="object-cover w-full h-screen hidden md:block" src="https://images.pexels.com/photos/5935791/pexels-photo-5935791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </div>
                <div className="bg-purple-300 w-full md:w-1/2 flex flex-col">
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-4xl font-bold">Welcome Back!</p>
                        <form className="flex flex-col pt-3 md:pt-8" onSubmit={signIn}>
                            <div className="flex flex-col pt-4">
                                <label htmlFor="email" className="text-lg">Email</label>
                                <input required type="email" id="email" placeholder="example@email.com" className="rounded-lg shadow appearance-none border w-full p-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col pt-4">
                                <label htmlFor="password" className="text-lg">Password</label>
                                <input required type="password" id="password" placeholder="Password" className="rounded-lg shadow appearance-none border w-full p-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <input type="submit" value="Log In" className="bg-purple-800 rounded-lg text-white font-bold text-lg hover:bg-purple-700 p-2 mt-8" />
                        </form>
                        {message && (
                            <div className="text-center pt-4">
                                <p className="text-red-500">{message}</p>
                            </div>
                        )}
                        <div className="text-center pt-12 pb-12">
                            <p>Don't have an account? <Link to="/signup" className="underline font-semibold">Sign Up here.</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
