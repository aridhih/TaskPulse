import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { FcApproval } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';

const EmailSent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const  email = location.state?.email;

  const handleEnterApp = () => {
    navigate('/'); 
}; 
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/ResetDone');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                <div className="mb-6">
                    <FcApproval className=' w-12 h-12 mx-auto text-green-500' />

                </div>
                <h2 className="text-2xl font-semibold mb-4">Successfully Sent</h2>
                <p className="text-gray-700 mb-6">
                    We have sent instructions on how to reset your password to <strong>{email}</strong>. Please follow the instructions from the email.
                </p>
                <button
                    onClick={handleEnterApp}
                    className="min-w-[400px] bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default EmailSent;
