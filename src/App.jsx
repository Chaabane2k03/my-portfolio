import { I18nProvider } from "./i18n";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhatIsSE from "./components/WhatIsSE";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Leadership from "./components/Leadership";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import FloatingParticles from "./components/FloatingParticles";

function App() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-dark-900 text-slate-100 font-body transition-colors duration-500">
        <ScrollProgress />
        <FloatingParticles />
        <Navbar />
        <main>
          <Hero />
          <WhatIsSE />
          <Skills />
          <Experience />
          <Leadership />
          <Certifications />
          <Education />
          <Blogs />
          <Contact />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}

export default App;
