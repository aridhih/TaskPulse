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
          title="Seamless Task Management"
          description="Organize your tasks efficiently with real-time collaboration, priorities, and deadlines."
          features={["Drag & Drop Task Boards", "Smart Reminders & Notifications", "Kanban & List Views"]}
          image="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
        <FeatureSection
          title="AI-Powered Productivity"
          description="Leverage AI-driven insights to optimize your workflow and boost team efficiency."
          features={["Automated Task Assignments", "AI-Generated Task Suggestions", "Smart Progress Tracking"]}
          image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          reverse
        />
        <FeatureSection
          title="Powerful Team Collaboration"
          description="Enhance communication and teamwork with built-in chat, file sharing, and integrations."
          features={["Real-Time Chat & Comments", "File Attachments & Cloud Sync", "Integrated with Slack & Zoom"]}
          image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
        />
        <FeatureSection
          title="Custom Workflows & Automations"
          description="Automate repetitive tasks and streamline your workflow with custom rules."
          features={["No-Code Workflow Builder", "Trigger-Based Automations", "Integration with Webhooks"]}
          image="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          reverse
        />
      </div>
    </section>
  );
};

export default Features;