import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [fireBaseError, setFireBaseError] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {

        const { name, surname, email, password, confirmPassword, terms } = formData;

        const newErrors = {};

        if (!name) newErrors.name = "Name is required.";
        if (!surname) newErrors.surname = "Surname is required.";
        if (!email) newErrors.email = "Email is required.";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (!terms) {
            newErrors.terms = "You must agree to the Terms & Conditions.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                sendEmailVerification(userCredential.user)
                .then(() => {
                  navigate('/signup/EmailVerification', { state: { email: userCredential.user.email } });
                })
                .catch((error) => {
                  console.error('Error sending email verification:', error);
                });
                
            })
            .catch((error) => {
                setFireBaseError("Email is already in use");
                console.log(error);
            });
    };
    const addData = async () => {
        try {
            await setDoc(doc(db, "users", formData.email), formData);
        } 
        catch (error) {
            console.error("Error adding document: ", error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {  
            const { email, password} = formData;
            addData();
            signUp(email, password);
        
        }
    };

    return (
        <div className="flex items-center justify-center h-screen py-6 bg-gray-100">
            <div className="bg-white px-6 py-3 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-3 text-center">Welcome to Crypto App</h2>
                <p className="text-gray-600 mb-5 text-xs text-center">Create a free account by filling data below</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-3" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full  px-3 py-0.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600`}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 mb-3" htmlFor="surname">Surname</label>
                            <input
                                type="text"
                                id="surname"
                                name="surname"
                                placeholder="Doe"
                                value={formData.surname}
                                onChange={handleInputChange}
                                className={`w-full  px-3 py-0.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600`}
                            />
                            {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname}</p>}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="block text-gray-700 mb-3" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@email.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-0.5 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                    </div>
                    <div className="mb-3 relative">
                        <label className="block text-gray-700 mb-3" htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-0.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-[50px] transform -translate-y-1/2 cursor-pointer text-gray-600"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className="mb-3 relative">
                        <label className="block text-gray-700 mb-3" htmlFor="confirmPassword">Repeat Password</label>
                        <input type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-0.5 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                        <span
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-3 top-[50px] transform -translate-y-1/2 cursor-pointer text-gray-600"
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <div className={`mb-3 flex items-center ${errors.terms ? 'animate-shake' : ''}`}>
                        <input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            checked={formData.terms}
                            onChange={handleInputChange}
                            className="mr-2 h-4 w-4 text-blue-600  rounded focus:ring-blue-500"
                        />
                        <label htmlFor="terms" className={`text-sm ${errors.terms ? 'text-red-500' : 'text-gray-600'}`}>
                            I agree with <a href="#" className="text-purple-600 underline">Terms & Conditions.</a>
                        </label>
                    </div>
                    {fireBaseError && <p className="text-red-500 text-sm mt-1 mb-3 text-center">{fireBaseError}</p>}
                    <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        Create Account
                    </button>
                </form>
                <p className="text-center text-gray-600 text-sm mt-3">
                    Already have an account? <Link to="/"><button className="text-purple-600">Log in</button></Link>
                </p>

            </div>
        </div>
    );
};

export default SignUp;
