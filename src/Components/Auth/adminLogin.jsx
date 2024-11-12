import { AuthStatus } from '../../App'
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

const users = [
    { email: 'anuj.kumar@in.gt.com', password: 'Anuj@123' },
    { email: 'divy.parikh@in.gt.com', password: 'Divy@123' },
    { email: 'kapil.arora@in.gt.com', password: 'Kapil@123' },
    { email: 'amit.chauhan1@in.gt.com', password: 'Amit@123' },
];

export default function AdminLogin({ setAuthStatus }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            setMessage('Login successful!');
            setAuthStatus(AuthStatus.LOGGED_IN);
            setRedirect(true);
        } else {
            setMessage('Invalid email or password.');
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
                        <p className="text-center text-4xl font-bold">Admin Login</p>
                        <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleSubmit}>
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
                    </div>
                </div>
            </div>
        </section>
    )
}
