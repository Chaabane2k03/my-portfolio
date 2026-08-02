import { lazy, Suspense, useState } from "react";
import { I18nProvider } from "./i18n";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LoadingScreen from "./components/LoadingScreen";
import ScrollProgress from "./components/ScrollProgress";
import FloatingParticles from "./components/FloatingParticles";

const WhatIsSE = lazy(() => import("./components/WhatIsSE"));
const Skills = lazy(() => import("./components/Skills"));
const Experience = lazy(() => import("./components/Experience"));
const Leadership = lazy(() => import("./components/Leadership"));
const Certifications = lazy(() => import("./components/Certifications"));
const Education = lazy(() => import("./components/Education"));
const Blogs = lazy(() => import("./components/Blogs"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function Section({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

function App() {
  const [appReady, setAppReady] = useState(false);

  return (
    <I18nProvider>
      <div className="min-h-screen bg-dark-900 text-slate-100 font-body transition-colors duration-500">
        <ScrollProgress />
        <FloatingParticles />
        <Navbar />
        <main>
          <Hero />
          <Section>
            <WhatIsSE />
          </Section>
          <Section>
            <Skills />
          </Section>
          <Section>
            <Experience />
          </Section>
          <Section>
            <Leadership />
          </Section>
          <Section>
            <Certifications />
          </Section>
          <Section>
            <Education />
          </Section>
          <Section>
            <Blogs />
          </Section>
          <Section>
            <Contact />
          </Section>
        </main>
        <Section>
          <Footer />
        </Section>
      </div>
      {!appReady && <LoadingScreen onDone={() => setAppReady(true)} />}
    </I18nProvider>
  );
}

export default App;
