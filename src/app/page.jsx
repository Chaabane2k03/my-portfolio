"use client";
import Image from "next/image";
import RetroComputer from "./components/Computer";
import { FaLinkedin, FaGithub, FaFileAlt } from "react-icons/fa";
import { useState } from "react";
import Footer from "./components/Footer";

export default function Home() {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 md:px-12 md:py-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <Image
            src="/hello.svg"
            alt="logo"
            width={60}
            height={60}
            className="w-14 h-14 md:w-16 md:h-16"
          />
          <h1 className="text-lg md:text-2xl font-bold">Chaabane Boussadia</h1>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-400 text-sm md:text-base font-medium">
            Home
          </a>
          <a href="#" className="hover:text-gray-400 text-sm md:text-base font-medium">
            About
          </a>
          <a href="#" className="hover:text-gray-400 text-sm md:text-base font-medium">
            Services
          </a>
          <a href="#" className="hover:text-gray-400 text-sm md:text-base font-medium">
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="flex flex-1 flex-col md:flex-row items-center justify-between">
        {/* Left Side: Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 md:px-16 py-10">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Software Engineer from Sunny Tunisia
            </h1>
            <p className="text-gray-400 text-base md:text-lg mb-8">
              Got a project idea or need help with an existing one? I'm here to bring your ideas to life.
            </p>
            <a
              href="mailto:chaabaneboussadia@gmail.com"
              className="inline-block bg-white text-black px-6 py-3 rounded-lg text-sm md:text-base font-medium hover:bg-gray-200 transition-colors"
            >
              Contact Me
            </a>
          </div>
          <div className="mt-8 flex space-x-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-400"
              onMouseEnter={() => setHoveredIcon("linkedin")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-400"
              onMouseEnter={() => setHoveredIcon("github")}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <FaGithub />
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-gray-400"
            >
              <FaFileAlt />
            </a>
          </div>
        </div>

        {/* Right Side: 3D Section */}
        <div className="flex-1 relative flex items-center justify-center px-8 md:px-16 py-10">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          <div className="w-full h-full">
            <RetroComputer onLoad={() => setIsLoaded(true)} />
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
