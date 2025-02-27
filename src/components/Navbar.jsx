import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = () => {
    setIsOpen(false); // Close the navbar when a link is clicked
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  };

  return (
    <nav className="bg-[#6caddf] p-4 sticky top-0 z-50 shadow-md">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 sm:h-14 sm:w-14 rounded-full"
            />
            <span className="text-white font-bold text-2xl md:text-3xl uppercase tracking-wider">
              MCityX
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-6 text-lg font-semibold">
          {[
            "Home",
            "Schedule",
            "Results",
            "Trophy Cabinet",
            "Player Card",
            "History",
          ].map((label, index) => (
            <NavLink
              key={index}
              to={
                label === "Home"
                  ? "/"
                  : `/${label.replace(/\s+/g, "-").toLowerCase()}`
              }
              className={({ isActive }) =>
                `px-5 py-2 rounded-md transition-all duration-300 shadow-md font-bold ${
                  isActive
                    ? "bg-sky-900 text-white"
                    : "text-white hover:bg-sky-800 hover:text-sky-300"
                }`
              }
              onClick={handleNavLinkClick}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white focus:outline-none"
        >
          {isOpen ? (
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transform transition-all duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full h-full bg-[#6caddf] p-6 shadow-lg flex flex-col space-y-4 relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            &times;
          </button>
          {[
            "Home",
            "Schedule",
            "Results",
            "Trophy Cabinet",
            "Player Card",
            "History",
          ].map((label, index) => (
            <NavLink
              key={index}
              to={`/${label.replace(/\s+/g, "-").toLowerCase()}`}
              className={({ isActive }) =>
                `block px-6 py-4 rounded-md text-lg font-bold transition duration-300 ${
                  isActive
                    ? "bg-sky-900 text-white"
                    : "text-white hover:bg-sky-800"
                }`
              }
              onClick={handleNavLinkClick}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
