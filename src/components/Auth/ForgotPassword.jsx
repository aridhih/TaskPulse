import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [fireBaseError, setFireBaseError] = useState('');
    const [error, setError] = useState();
    const [email, setEmail] = useState('');

    const validateEmail = (email) => {

        if (!email) {
            setError("Email is required.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return false;
        }
        return true;
    }
    const handleResetPassword = (e) => {
        e.preventDefault();
        if(validateEmail(email)){  
        sendPasswordResetEmail(auth, email)
            .then(() => {
                navigate('/Emailsent', { state: { email: email } });
            })
            .catch((error) => {
                setFireBaseError('error occured! Please try again later');
                console.log(error);
            });
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
                <p className="text-gray-700 mb-4 text-sm">
                Enter your email address for which account you want to reset your password.
                </p>
                <div className="mb-3">
                        <label className="block text-left text-gray-700 mb-3 ml-1" htmlFor="email"><strong>Email</strong></label>
                        <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        placeholder="name@email.com" 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-0.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600" />
                    </div>
                    {fireBaseError && <p className="text-red-500 text-sm mt-1 mb-3 text-center">{fireBaseError}</p>}
                    {error && <p className="text-red-500 text-sm mt-1 mb-3 text-center">{error}</p>}

                <button onClick={handleResetPassword} className="w-full bg-purple-600 text-white py-2 mb-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">
                    Reset Password
                </button>
                <button  onClick={() => navigate('/')} className="w-full bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-600 opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-500">
                    Cancel
                </button>

               
            </div>
        </div>
    );
};

export default ForgotPassword;
