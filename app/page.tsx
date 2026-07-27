import About from "@/components/About";
import Achievements from "@/components/Achievements";
import BackToTop from "@/components/BackToTop";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SectionDivider from "@/components/SectionDivider";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <Hero />
      <SectionDivider color="rgba(24,24,15,0.06)" />
      <About />
      <SectionDivider color="rgba(24,24,15,0.05)" />
      <Experience />
      <SectionDivider color="rgba(23,53,107,0.06)" />
      <Achievements />
      <SectionDivider color="rgba(24,24,15,0.06)" />
      <Skills />
      <Education />
      <Certifications />
      <SectionDivider color="rgba(24,24,15,0.05)" />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
