import Image from "next/image";
import RetroComputer from "./components/Computer";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="flex items-center">
          <Image src="/hello.svg" alt="logo" width={80} height={80} />
        </div>
        <div className="flex items-center space-x-8">
          <a href="#" className="hover:text-gray-400 text-lg font-medium roboto-title">
            Home
          </a>
          <a href="#" className="hover:text-gray-400 text-lg font-medium ">
            About
          </a>
          <a href="#" className="hover:text-gray-400 text-lg font-medium roboto-title">
            Services
          </a>
          <a href="#" className="hover:text-gray-400 text-lg font-medium roboto-title">
            Contact
          </a>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="flex h-[calc(100vh-80px)]">
        {/* Left Side: Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 montserrat-text">
              Software engineer, from sunny Tunisia
            </h1>
            <p className="text-xl text-gray-400 mb-8 roboto-title">
              Having a project idea or need help with your existing project? I'm here to help you.
            </p>
            <a
              href="mailto:chaabaneboussadia@gmail.com"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors"
            >
              chaabaneboussadia@gmail.com
            </a>
          </div>
        </div>

        {/* Right Side: 3D Section */}
        <div className="flex-1 relative">
          <RetroComputer />
        </div>
      </section>
    </div>
  );
}