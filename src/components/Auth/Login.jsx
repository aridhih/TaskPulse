import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [fireBaseError, setFireBaseError] = useState('');
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/dashboard");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const validateForm = () => {
        const { email, password } = formData;
        const newErrors = {};

        if (!email) newErrors.email = "Email is required.";
        if (!password) newErrors.password = "Password is required.";


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const signIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            if(userCredential.user.emailVerified) {
                navigate("/dashboard");
            }else {
                auth.signOut();
                setFireBaseError('Please Check your mailbox and verify your email');
            }
        }).catch(() => {
            setFireBaseError('Invalid email or password');
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
        signIn(formData.email, formData.password);
        }

    };
    return (
        <div className="flex items-center justify-center h-screen py-6 bg-gray-100">
            <div className="bg-white px-6 py-3 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-2xl font-semibold mb-3 text-center">Welcome to Crypto App</h2>
                <p className="text-gray-600 mb-5 text-xs text-center">Enter your credentials to access the account</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-3" htmlFor="email">Email</label>
                        <input type="email"
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
                            id="password" name="password"
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

                    <div className="mb-3 flex justify-between">
                        <div className="flex items-center justify-center  text-center">
                            <input type="checkbox" id="rememberMe" name="rememberMe" className="mr-2" />
                            <label htmlFor="rememberMe" className="text-gray-600 text-sm">
                                Remember me
                            </label></div>
                        <a href="/ForgotPassword" className="text-purple-600">Forget Password?</a>
                    </div>
                    {fireBaseError && <p className="text-red-500 text-sm mt-1 mb-3 text-center">{fireBaseError}</p>}
                    <button type="submit" className="w-full bg-purple-600 mb-3  text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">
                        Log In
                    </button>

                    <Link to="/SignUp">
                        <button type="submit" className="w-full bg-purple-600 mb-3  text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">
                            Create New Account
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;