import { FcApproval } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
    const navigate = useNavigate();

    const handleEnterApp = () => {
        navigate('/'); 
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
                <div className="mb-6">
                <FcApproval className=' w-12 h-12 mx-auto text-green-500' />
                
                </div>
                <h2 className="text-2xl font-semibold mb-4">Successfully Registration</h2>
                <p className="text-gray-700 mb-6">
                    Hurray! You have successfully created your account. Enter the app to explore all its features.
                </p>
                <button
                    onClick={handleEnterApp}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                    Login Now To Enter The App
                </button>
            </div>
        </div>
    );
};

export default RegistrationSuccess;
