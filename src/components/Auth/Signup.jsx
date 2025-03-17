import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoMention, GoPerson } from "react-icons/go";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [fireBaseError, setFireBaseError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const toggleVisibility = (field) => {
        if (field === "password") {
            setShowPassword((prev) => !prev);
        } else if (field === "confirmPassword") {
            setShowConfirmPassword((prev) => !prev);
        }
    };
    

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name || formData.name.length < 3) newErrors.name = "Name must be at least 3 characters.";
        if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address.";
        if (!formData.password || formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
        if (!formData.confirmPassword || formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        try {
            const { email, password, name } = formData;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await sendEmailVerification(userCredential.user);
            await addUserToDB(name, email);
    
            navigate('/signup/EmailVerification', { state: { email } });
        } catch (error) {
            console.error("Signup error:", error);
            
            if (error.code === "auth/email-already-in-use") {
                setFireBaseError("Email is already in use. Please try logging in.");
            } else if (error.code === "auth/network-request-failed") {
                setFireBaseError("Network error. Please check your internet connection.");
            } else {
                setFireBaseError("Something went wrong. Please try again.");
            }
        }
    };
    

    const addUserToDB = async (name, email) => {
        try {
            await setDoc(doc(db, "users", email), { name, email, role: "user" });
        } catch (error) {
            console.error("Error adding user to Firestore:", error);
        }
    };

    const renderInput = (label, name, type, icon) => (
        <div>
          <label className="text-base font-medium text-gray-900">{label}</label>
          {errors[name] && <span className="text-red-500 text-sm ml-2">{errors[name]}</span>}
          <div className="mt-2 relative text-gray-400 focus-within:text-gray-600">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
            <input
              type={
                name === "password"
                  ? (showPassword ? "text" : "password")
                  : name === "confirmPassword"
                  ? (showConfirmPassword ? "text" : "password")
                  : type
              }
              name={name}
              placeholder={`Enter your ${label.toLowerCase()}`}
              value={formData[name]}
              onChange={handleChange}
              className={`block w-full py-3 pl-10 pr-10 text-black placeholder-gray-500 border ${
                errors[name] ? "border-red-500" : "border-gray-200"
              } rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600`}
            />
            {["password", "confirmPassword"].includes(name) && (  // This correctly detects both password fields
              <span
                onClick={() => toggleVisibility(name)}
                className="absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-600"
              >
                {name === "password"
                  ? showPassword
                    ? <FaEyeSlash />
                    : <FaEye />
                  : showConfirmPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </span>
            )}
          </div>
        </div>
      );
      

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            {/* Left Side - Banner */}
            <div className="relative flex flex-1 items-end transition-all animate-slideLeft px-4 pb-10 pt-60 bg-gray-50 h-full">
                <img className="absolute inset-0 w-full h-full object-cover" src="/signUpbg.jpg" alt="Background" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="relative">
                    <h3 className="text-4xl font-bold text-white">
                        Your tasks, Your way <br /> Start now with <span className="bg-textPrimary bg-clip-text text-transparent">Taskpulse</span>
                    </h3>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex flex-1 items-center transition-all animate-slideRight  justify-center px-4 py-4 bg-white h-full">
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-bold text-black text-center mb-2">Create an Account</h2>

                    {fireBaseError && <p className="text-red-500 text-center">{fireBaseError}</p>}

                    <form className="space-y-5" onSubmit={handleFormSubmit}>
                        {renderInput("Full Name", "name", "text", <GoPerson className="w-5 h-5" />)}
                        {renderInput("Email Address", "email", "email", <GoMention className="w-5 h-5" />)}
                        {renderInput("Password", "password", "password", <RiLockPasswordLine className="w-5 h-5" />)}
                        {renderInput("Confirm Password", "confirmPassword", "password", <RiLockPasswordFill className="w-5 h-5" />)}

                        <button
                            type="submit"
                            className="w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-fuchsia-600 to-blue-600 
                            rounded-md focus:outline-none hover:opacity-90"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-4 text-base text-gray-600 text-center">
                        Already have an account?
                        <a href="/login" className="font-medium text-blue-600 hover:text-blue-700 hover:underline ml-1">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
