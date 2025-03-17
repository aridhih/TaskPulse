import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoMention } from "react-icons/go";
import { RiFingerprintFill } from "react-icons/ri";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [fireBaseError, setFireBaseError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (!formData.password || formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/home"); 
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setFireBaseError("Invalid email or password.");
      } else if (error.code === "auth/network-request-failed") {
        setFireBaseError("Network error. Please check your internet connection.");
      } else {
        setFireBaseError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <motion.div className="grid grid-cols-1 lg:grid-cols-2 h-screen" initial="hidden" animate="visible" variants={fadeIn}>
      {/* Left Side - Login Form */}
      <motion.div
        className="flex flex-1 items-center transition-all animate-slideLeft justify-center px-4 py-10 bg-white h-full"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-black text-center mb-2">Welcome Back!</h2>

          {fireBaseError && <p className="text-red-500 text-center">{fireBaseError}</p>}

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label className="text-base font-medium text-gray-900">Email Address</label>
              {errors.email && <span className="text-red-500 text-sm ml-2">{errors.email}</span>}
              <div className="mt-2 relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <GoMention className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full py-3 pl-10 text-black placeholder-gray-500 border ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  } rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="text-base font-medium text-gray-900">Password</label>
              {errors.password && <span className="text-red-500 text-sm ml-2">{errors.password}</span>}
              <div className="mt-2 relative text-gray-400 focus-within:text-gray-600">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <RiFingerprintFill className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full py-3 pl-10 text-black placeholder-gray-500 border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  } rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600`}
                />
                <span onClick={togglePasswordVisibility} className="absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-600">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              className="w-full px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-fuchsia-600 to-blue-600 
              rounded-md focus:outline-none hover:opacity-90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>

          {/* Signup Link */}
          <p className="mt-4 text-base text-gray-600 text-center">
            Don't have an account?
            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-700 hover:underline ml-1">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>

      {/* Right Side - Banner */}
      <motion.div
        className="relative flex flex-1 transition-all animate-slideRight items-end px-4 pb-10 pt-60 bg-gray-50 h-full"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img className="absolute inset-0 w-full h-full object-cover" src="/loginbg.jpg" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="relative">
          <h3 className="text-4xl font-bold text-white">
            Time to get things done <br />
            with <span className="bg-textPrimary bg-clip-text text-transparent">Taskpulse</span>
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
