import About from "@/components/About";
import Achievements from "@/components/Achievements";
import BackToTop from "@/components/BackToTop";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Featured />
      <Achievements />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
