import { FcApproval } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  const handleEnterApp = () => {
    navigate("/login");
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Approval Icon Animation */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <FcApproval className="w-12 h-12 mx-auto text-green-500" />
        </motion.div>

        {/* Header Text Animation */}
        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Successfully Registered
        </motion.h2>

        {/* Description Animation */}
        <motion.p
          className="text-gray-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Hurray! You have successfully created your account. Enter the app to explore all its features.
        </motion.p>

        {/* Animated Button */}
        <motion.button
          onClick={handleEnterApp}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login Now To Enter The App
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationSuccess;
