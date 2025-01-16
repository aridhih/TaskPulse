import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoMention, GoPerson } from "react-icons/go";
import { RiFingerprintFill } from "react-icons/ri";
import { Navigate } from "react-router-dom";

function Login() {
    const [action, setAction] = useState("Sign up");
    const [showPassword, setShowPassword] = useState(false);

    const toggleAction = () => {
        setAction(action === "Sign up" ? "Login" : "Sign up");
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            {/* Div 1 */}
            <div className={`relative flex flex-1 transition-all  items-end px-4 pb-10  pt-60  bg-gray-50 h-full ${action === "Sign up" ? "animate-slideLeft -translate-x-full order-1 " : "animate-slideRight translate-x-full order-2"}`}>
                <div className="absolute inset-0">
                    <img
                        className="object-cover w-full h-full"
                        src={` ${action == "Sign up" ? "/loginbg.jpg"
                            : "signUpbg.jpg"}`}
                        alt="Background"
                    />

                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="relative">
                    {action === "Login" && (
                        <div className="top-4 fixed">
                            <span className="bg-textPrimary text-4xl font-bold  bg-clip-text text-transparent">Taskpulse</span>
                        </div>
                    )}
                    <div className="w-full cursor-default">
                        <h3 className="text-4xl font-bold text-textSecondary ">
                            {action === "Sign up" ? "Your tasks, Your way" : <p className='text-textPrimary'>Time to get things done</p>}<br className="hidden xl:block" /> {action === "Sign up" ? "Start now with " : ""}<span className="bg-textPrimary bg-clip-text text-transparent">{action === "Sign up" ? "Taskpulse" : ""} </span>
                        </h3>
                    </div>
                </div>
            </div>
            {/* Div 2 */}
            <div className={`flex flex-1 items-center transition-all justify-center px-4 py-10 bg-white h-full ${action === "Sign up" ? "animate-slideRight  translate-x-full order-2" : "animate-slideLeft -translate-x-full order-1"} `}>
                <div className="w-full max-w-md">
                    <div className="flex justify-center items-center cursor-default">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            {action === "Sign up" ? "Create an account" : "Welcome back!"}
                        </h2>
                    </div>
                    <form className="mt-8" action="/">
                        <div className="space-y-5">
                            {action === "Sign up" ?
                                (<div>
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
                                </div>) : (null)

                            }
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
                                    {action}
                                </button>
                            </div>
                            <div>
                                <p className="mt-2 text-base text-gray-600">{action === "Sign up" ? "Already have an account?" : "Don't have an account?"}  <a className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 cursor-pointer hover:underline" onClick={toggleAction}>{action === "Sign up" ? "Login" : "Sign up"}</a></p>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;




