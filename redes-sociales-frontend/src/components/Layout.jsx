import { motion } from "framer-motion";

import PropTypes from "prop-types";
import NavbarX from "./NavbarX";

function Layout({ children }) {
  const buildNumber = window.BUILD_NUMBER || "development";

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const mainVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const footerVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div className="d-flex flex-column min-vh-100">
      <motion.header
        className="shadow bg-white"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        <NavbarX />
      </motion.header>

      <motion.main
        className="flex-grow-1"
        variants={mainVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>

      <motion.footer
        className="bg-dark text-light text-center py-3"
        variants={footerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} Homero Cabrera Araque
        <p>{buildNumber}</p>
      </motion.footer>
    </motion.div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
