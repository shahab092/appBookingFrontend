// filepath: c:\Users\HP\Desktop\projects\PAK\asfaqhspital\ashfaqfrontend\src\components\landingpage\Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full" />
          <span className="font-semibold text-blue-700">
            Your Hospital Name
          </span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          <a className="hover:text-blue-600" href="#home">
            Home
          </a>
          <a className="hover:text-blue-600" href="#about">
            About1
          </a>
          <a className="hover:text-blue-600" href="#services">
            Services
          </a>
          <a className="hover:text-blue-600" href="#doctors">
            Doctors
          </a>
          <a className="hover:text-blue-600" href="#contact">
            Contact
          </a>
        </nav>
        <div>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg"
          >
            Book Appointment1
          </button>
        </div>
      </div>
    </header>
  );
}
