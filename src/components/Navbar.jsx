import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = () => {
    setIsOpen(false); // Close the navbar when a link is clicked
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <nav className="bg-[#6caddf] p-4 sticky top-0 z-50 shadow-md">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Centered Nav Links */}
        <div className="flex-1 flex justify-center items-center">
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

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 text-xl">
          {[
            { path: "/", label: "Home" },
            { path: "/Schedule", label: "Schedule" },
            { path: "/Results", label: "Results" },
            { path: "/Trophy-Cabinet", label: "Trophy Cabinet" },
            { path: "/Player-Card", label: "Player Card" },
            { path: "/History", label: "History" },
          ].map(({ path, label }, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-sky-900 rounded-md font-bold px-5 py-3 transition duration-300 shadow-lg"
                  : "text-white hover:bg-sky-900 hover:text-sky-300 rounded-md font-bold px-5 py-3 transition duration-300"
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button (Right) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white focus:outline-none"
        >
          {isOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4 bg-sky-200 rounded-lg shadow-md p-4 space-y-3">
          {[
            { path: "/", label: "Home" },
            { path: "/Schedule", label: "Schedule" },
            { path: "/Results", label: "Results" },
            { path: "/Trophy-Cabinet", label: "Trophy Cabinet" },
            { path: "/Player-Card", label: "Player Card" },
            { path: "/History", label: "History" },
          ].map(({ path, label }, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 rounded-md text-lg bg-sky-900 text-white transition duration-300"
                  : "block px-4 py-2 rounded-md text-lg text-sky-700 hover:bg-sky-400 hover:text-white transition duration-300"
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
