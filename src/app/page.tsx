import Image from "next/image";
import EarthScene  from './components/Test'

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
          <a href="#" className="hover:text-gray-400 text-lg font-medium roboto-title">
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
      {/* 3D Section */}
      <section className="relative h-[calc(100vh-80px)]">
        <EarthScene/>
      </section>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[calc(100vh-80px)] text-center px-4">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">
            Software engineer , from sunny Tunisia
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Having project idea or need help with your existing project? I'm here to help you.
          </p>
          <a
            href="mailto:chaabaneboussadia@gmail.com"
            className="inline-block bg-white text-black px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-200 transition-colors"
          >
            chaabaneboussadia@gmail.com
          </a>
        </div>
      </section>
    </div>
  );
}