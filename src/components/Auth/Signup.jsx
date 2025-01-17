import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoMention, GoPerson } from "react-icons/go";
import { RiFingerprintFill } from "react-icons/ri";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            {/* Div 1 */}
            <div className="relative flex flex-1 transition-all animate-slideLeft items-end px-4 pb-10 pt-60 bg-gray-50 h-full">
                <div className="absolute inset-0">
                    <img
                        className="object-cover w-full h-full"
                        src="/signUpbg.jpg"
                        alt="Background"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="relative">
                    <div className="top-4 fixed">
                        <span className="bg-textPrimary text-4xl font-bold bg-clip-text text-transparent">Taskpulse</span>
                    </div>
                    <div className="w-full cursor-default">
                        <h3 className="text-4xl font-bold text-textSecondary">
                            Your tasks, Your way<br className="hidden xl:block" /> Start now with <span className="bg-textPrimary bg-clip-text text-transparent">Taskpulse</span>
                        </h3>
                    </div>
                </div>
            </div>
            {/* Div 2 */}
            <div className="flex flex-1 items-center transition-all animate-slideRight justify-center px-4 py-10 bg-white h-full">
                <div className="w-full max-w-md">
                    <div className="flex justify-center items-center cursor-default">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Create an account
                        </h2>
                    </div>
                    <form className="mt-8" action="/">
                        <div className="space-y-5">
                            <div>
                                <label className="text-base font-medium text-gray-900">Full Name</label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <GoPerson className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-base font-medium text-gray-900">Email Address</label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <GoMention className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Enter email to get started"
                                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-base font-medium text-gray-900">Password</label>
                                <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <RiFingerprintFill className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                    />
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-90"
                                >
                                    Sign up
                                </button>
                            </div>
                            <div>
                                <p className="mt-2 text-base text-gray-600">Already have an account? <a className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 cursor-pointer hover:underline" href="/login">Login</a></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;




