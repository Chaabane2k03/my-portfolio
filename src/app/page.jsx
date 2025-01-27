"use client";
import Image from "next/image";
import RetroComputer from "./components/Computer";
import { FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa";
import { useState } from "react";

export default function Home() {
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-4 md:p-6">
        <div className="flex items-center">
          <Image src="/hello.svg" alt="logo" width={60} height={60} className="w-12 h-12 md:w-16 md:h-16" />
          <h1>Chaabane Boussadia</h1>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8">
          <a href="#" className="hover:text-gray-400 text-sm md:text-lg font-medium roboto-title">
            Home
          </a>
          <a href="#" className="hover:text-gray-400 text-sm md:text-lg font-medium">
            About
          </a>
          <a href="#" className="hover:text-gray-400 text-sm md:text-lg font-medium roboto-title">
            Services
          </a>
          <a href="#" className="hover:text-gray-400 text-sm md:text-lg font-medium roboto-title">
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="flex flex-1 flex-col md:flex-row">
        {/* Left Side: Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-start text-center px-4 py-8 md:py-0 mt-4 relative">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 montserrat-text">
              Software engineer, from sunny Tunisia
            </h1>
            <p className="text-base md:text-xl text-gray-400 mb-8 roboto-title">
              Having a project idea or need help with your existing project? I'm here to help you.
            </p>
            <a
              href="mailto:chaabaneboussadia@gmail.com"
              className="inline-block bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-lg text-sm md:text-lg font-medium hover:bg-gray-200 transition-colors"
            >
              chaabaneboussadia@gmail.com
            </a>
          </div>

          {/* Social Icons Section */}
          <div className="mt-8 flex items-center space-x-6">
            <a
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white text-2xl hover:text-gray-400"
              onMouseEnter={() => setHoveredIcon("linkedin")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white text-2xl hover:text-gray-400"
              onMouseEnter={() => setHoveredIcon("github")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FaGithub />
            </a>
            <a
              href="/cv.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white text-2xl hover:text-gray-400"
            >
              <FaFileAlt />
            </a>
          </div>

          {/* Hover Images */}
          
          {hoveredIcon && (
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 mt-4 bg-white p-2 rounded-lg shadow-lg">
              {hoveredIcon === "linkedin" && (
                <Image
                  src="/linkedin-screenshot.png"
                  alt="LinkedIn Profile"
                  width={300}
                  height={200}
                  className="border border-white rounded-md"
                />
              )}
              {hoveredIcon === "github" && (
                <Image
                  src="/github-screenshot.png"
                  alt="GitHub Profile"
                  width={300}
                  height={200}
                  className="border border-white rounded-md"
                />
              )}
            </div>
          )}
          </div>
        

        {/* Right Side: 3D Section */}
        <div className="flex-1 relative flex items-center justify-center">
          <div className="w-full h-full">
            <RetroComputer />
          </div>
        </div>
      </section>
    </div>
  );
}
