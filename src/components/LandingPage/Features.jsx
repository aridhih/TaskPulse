import React from "react";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const FeatureSection = ({ title, description, features, image, reverse = false }) => (
  <motion.div
    className={`items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16 ${reverse ? "lg:flex-row-reverse" : ""}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeIn}
  >
    <img className="hidden w-full rounded-lg lg:flex" src={image} alt="feature" loading="lazy" />
    <div className="text-gray-500 sm:text-lg">
      <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900">{title}</h2>
      <p className="mb-8 font-light lg:text-xl">{description}</p>
      <ul className="pt-8 space-y-5 border-t border-gray-200 my-7">
        {features.map((feature, index) => (
          <li key={index} className="flex space-x-3">
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="w-6 h-6 text-blue-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586l3.293-3.293a1 1 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 010-1.414z"
                clipRule="evenodd"
              ></path>
            </motion.svg>
            <span className="text-base font-medium text-gray-900">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Features = () => {
  return (
    <section className="bg-white" id="features">
     <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:py-24 lg:px-6">
  <FeatureSection
    title="Effortless Team & Project Management"
    description="Create and manage multiple teams and projects with clear roles and streamlined workflows."
    features={[
      "Multi-Team Support",
      "Project-Based Task Grouping",
      "Team Creator Role & Permissions"
    ]}
    image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  />

  <FeatureSection
    title="Smart Task Management"
    description="Organize, prioritize, and track your tasks with an intuitive interface and real-time updates."
    features={[
      "Task Status & Deadlines",
      "Assignment & Progress Tracking",
      "Kanban-style Views"
    ]}
    image="https://images.unsplash.com/photo-1591696205602-2f950c417cb9"
    reverse
  />

  <FeatureSection
    title="Docs & Clips Central"
    description="Easily manage documents, code snippets, and multimedia clips in one organized space."
    features={[
      "Attach Files to Projects",
      "Support for .txt, .zip, Code Files, and More",
      "Future Sharing in Chat"
    ]}
    image="https://images.unsplash.com/photo-1552664730-d307ca884978"
  />

  <FeatureSection
    title="Timesheets & Personal Notes"
    description="Track your work hours and jot down personal notes to stay productive and organized."
    features={[
      "Start/Stop Task Timers",
      "Weekly Timesheet View",
      "Secure Personal Notes Section"
    ]}
    image="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
    reverse
  />
</div>


    </section>
  );
};

export default Features;