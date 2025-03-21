import React from "react";
import { Link } from "react-router-dom";

const LandingNavBar = () => {
    return (
        <nav className="bg-white w-full">
            <div className="p-4">
                <div className="realative flex items-center">
                    <div className="absolute left-4 top-6 flex items-center mt-2">
                        <img src="/logo.png" alt="logo" className="w-40 h-40" />
                    </div>
                </div>
                <div className="fixed w-full p-10 flex justify-center items-center h-16">
                    <div className="flex border rounded-xl p-[10px] mr-20 bg-slate-50 items-center gap-5">
                        <p className="text-md text-black font-bold">TaskPukse </p>

                        <div className="border-l pl-3">
                            <p className="text-xs text-black">The everything </p>
                            <p className="text-xs text-black"> app, for work.</p>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <div className="flex border rounded-xl p-4 bg-slate-50 items-center gap-12 font-semibold">
                        <Link to="/home" className="text-gray-800 hover:text-blue-600">
                            Home
                        </Link>
                        <a href="#features" className="text-gray-800 hover:text-blue-600">
                            Features
                        </a>
                        <a href="#Querys" className="text-gray-800 hover:text-blue-600">
                            Querys
                        </a>

                        <a href="#about" className="text-gray-800 hover:text-blue-600">
                            About
                        </a>
                    </div>
                    {/* Buttons */}
                    <div className=" flex gap-2 ml-32 border rounded-xl p-2 bg-slate-50 items-center justify-center ">
                        <Link
                            to="/login"
                            className="px-4 py-2 text-navbar rounded-md"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white rounded-md  hover:to-blue-700"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavBar;
