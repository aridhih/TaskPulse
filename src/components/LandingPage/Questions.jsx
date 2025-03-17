import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const accordionVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const QuestionItem = ({ question, answer, index, activeIndex, setActiveIndex }) => {
  const isOpen = activeIndex === index;

  return (
    <motion.div variants={fadeIn}>
      <button
        onClick={() => setActiveIndex(isOpen ? null : index)}
        className={`flex items-center justify-between w-full py-5 font-medium text-left transition-colors border-b border-gray-300 ${
          isOpen ? "text-white" : "text-gray-200"
        }`}
      >
        <span className="text-lg">{question}</span>
        <motion.svg
          className={`w-6 h-6 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 010-1.414z"
            clipRule="evenodd"
          ></path>
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={accordionVariants}
            className="py-5 border-b border-gray-300"
          >
            <p className="mb-2 text-gray-100">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: "What is TaskPulse and how does it work?",
      answer:
        "TaskPulse is an all-in-one productivity app designed for teams and individuals to manage tasks, projects, and workflows seamlessly. It offers real-time collaboration, file sharing, and powerful integrations.",
    },
    {
      question: "Can I use TaskPulse for free?",
      answer:
        "Yes! TaskPulse offers a free plan with essential features like task management and team collaboration. For advanced functionalities like automation, analytics, and premium integrations, you can upgrade to a paid plan.",
    },
    {
      question: "Does TaskPulse support third-party integrations?",
      answer:
        "Absolutely! TaskPulse integrates with popular tools like Slack, Google Drive, Trello, and Notion to enhance your workflow and keep all your work in one place.",
    },
    {
      question: "Is there a mobile app for TaskPulse?",
      answer:
        "Yes! TaskPulse is available on iOS and Android, allowing you to manage your tasks on the go with real-time sync between devices.",
    },
    {
      question: "How secure is my data on TaskPulse?",
      answer:
        "TaskPulse ensures high-level security with encrypted data storage, two-factor authentication (2FA), and compliance with industry standards like GDPR and SOC 2.",
    },
  ];

  return (
    <motion.section
      className="w-full pt-20 px-5 md:px-20 lg:px-32 bg-gradient-to-r from-blue-900 to-purple-900 text-white rounded-lg shadow-lg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="p-8 pt-2">
        <h2 className="mb-10 text-3xl font-extrabold tracking-tight text-center text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto bg-opacity-20 bg-white p-6 rounded-lg shadow-md">
          {faqData.map((item, index) => (
            <QuestionItem
              key={index}
              index={index}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              {...item}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Questions;
