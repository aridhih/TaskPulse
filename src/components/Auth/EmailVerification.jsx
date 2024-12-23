import { sendEmailVerification } from "firebase/auth";
import { IoIosMail } from "react-icons/io";
import { useLocation,useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";



const EmailVerification = () => {
    const [fireBaseError, setFireBaseError] = useState('');
    const [btnTxt, setBtnTxt] = useState('Resend Email');
    const [isDisabled, setIsDisabled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); 
    const userEmail = location.state?.email;

    const handleResendEmail = () => {
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    setBtnTxt('Email Resend Successfully');
                    setFireBaseError('');
                    setIsDisabled(true);
                })
                .catch((error) => {
                    setFireBaseError('wait for 2 minutes and try again');
                    console.log(error);
                });
        } else {
            alert('No user is signed in.');
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            auth.currentUser?.reload().then(() => {
                if (auth.currentUser.emailVerified) {
                    navigate('/signup/EmailVerification/RegistrationSuccess');
                }
            }).catch((error) => {
                console.log('Error checking email verification status:', error);
            });
        }, 3000);

       
        return () => clearInterval(interval);
    }, [navigate]);
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                <div className="mb-6">
                <IoIosMail className="w-12 h-12 mx-auto text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
                <p className="text-gray-700 mb-4">
                    We have sent you an email verification to <strong>{userEmail}</strong>.
                    If you did not receive it, click the button below.
                </p>
                {fireBaseError && <p className="text-red-500 text-sm mt-1 mb-3 text-center">{fireBaseError}</p>}

                <button onClick={handleResendEmail} disabled={isDisabled}  className={`w-full bg-purple-600 ${isDisabled ? 'opacity-50  cursor-not-allowed' : ''}  text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600`}>
                    {btnTxt}
                </button>
            </div>
        </div>
    );
};

export default EmailVerification;
