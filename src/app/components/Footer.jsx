"use client";
import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white-300 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Left Section: Logo and Description */}
        <div className="text-center md:text-left">
          <h1 className="text-white text-xl font-bold mb-2">Chaabane Boussadia</h1>
          <p className="text-sm">
            Software engineer based in sunny Tunisia, building solutions for a brighter future.
          </p>
        </div>

        {/* Center Section: Navigation */}
        <div className="flex flex-wrap justify-center space-x-4">
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Home
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Services
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right Section: Social Icons */}
        <div className="flex space-x-4">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:chaabaneboussadia@gmail.com"
            className="text-gray-400 hover:text-white transition-colors text-2xl"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-500 mt-4">
        © {new Date().getFullYear()} Chaabane Boussadia. All rights reserved.
      </div>
    </footer>
  );
}
