import { sendEmailVerification } from "firebase/auth";
import { IoIosMail } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const EmailVerification = () => {
  const [fireBaseError, setFireBaseError] = useState("");
  const [btnTxt, setBtnTxt] = useState("Resend Email");
  const [isDisabled, setIsDisabled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = location.state?.email;

  const handleResendEmail = () => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          setBtnTxt("Email Resent Successfully");
          setFireBaseError("");
          setIsDisabled(true);
        })
        .catch((error) => {
          setFireBaseError("Wait for 2 minutes and try again.");
          console.log(error);
        });
    } else {
      alert("No user is signed in.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      auth.currentUser
        ?.reload()
        .then(() => {
          if (auth.currentUser.emailVerified) {
            navigate("/signup/EmailVerification/RegistrationSuccess");
          }
        })
        .catch((error) => {
          console.log("Error checking email verification status:", error);
        });
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

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
        {/* Mail Icon */}
        <motion.div
          className="mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <IoIosMail className="w-12 h-12 mx-auto text-purple-600" />
        </motion.div>

        {/* Header Text */}
        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Email Verification
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          We have sent you an email verification to <strong>{userEmail}</strong>.  
          If you did not receive it, click the button below.
        </motion.p>

        {/* Error Message (if any) */}
        {fireBaseError && (
          <motion.p
            className="text-red-500 text-sm mt-1 mb-3 text-center"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {fireBaseError}
          </motion.p>
        )}

        {/* Animated Button */}
        <motion.button
          onClick={handleResendEmail}
          disabled={isDisabled}
          className={`w-full bg-purple-600 ${
            isDisabled ? "opacity-50 cursor-not-allowed" : ""
          } text-white py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600`}
          whileHover={!isDisabled ? { scale: 1.05 } : {}}
          whileTap={!isDisabled ? { scale: 0.95 } : {}}
        >
          {btnTxt}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default EmailVerification;
