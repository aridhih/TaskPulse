import React from "react";
import { motion } from "framer-motion";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FooterSection = ({ title, links }) => (
  <motion.div variants={fadeIn}>
    <h3 className="mb-6 text-sm font-semibold text-gray-900 uppercase">{title}</h3>
    <ul className="text-gray-500">
      {links.map((link, index) => (
        <li key={index} className="mb-4">
          <a href="#" className="hover:underline hover:text-gray-900 transition-colors duration-300">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </motion.div>
);

const Footer = () => {
  return (
    <motion.footer
      className="bg-white w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="p-10">
        {/* Footer Sections */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <FooterSection title="TaskPulse" links={["About Us", "Our Mission", "Blog", "Careers"]} />
          <FooterSection title="Support" links={["Help Center", "FAQs", "Live Chat", "Contact Support"]} />
          <FooterSection title="Legal" links={["Privacy Policy", "Terms of Service", "Security & Compliance"]} />
          <FooterSection title="Features" links={["Task Management", "Team Collaboration", "Project Tracking", "Integrations"]} />
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Footer Bottom Section */}
        <div className="text-center ">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <motion.img
              src="/logo.png"
              alt="TaskPulse Logo"
              className="w-20 h-20 mr-3"
              loading="lazy"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <span className="block text-sm text-gray-600">
              © 2024-2025 TaskPulse. All Rights Reserved.
            </span>
          </div>

          {/* Social Icons */}
          <motion.ul className="flex justify-center mt-5 space-x-5">
            {["linkedin", "twitter", "github", "facebook"].map((platform, index) => (
              <motion.li key={index} whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
                  <i className={`fab fa-${platform} text-xl`}></i>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
