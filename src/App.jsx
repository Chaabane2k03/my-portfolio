import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Technologies from "./components/Technologies";
import Experience from "./components/Experience";
import ContactMe from "./components/ContactMe";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Container maxWidth="lg" className="space-y-6 py-6">
          <Navbar />
          <Hero />
          <AboutMe />
          <Education />
          <Certifications />
          <Technologies />
          <Experience />
          <ContactMe />
          <Blogs />
          <Footer />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
