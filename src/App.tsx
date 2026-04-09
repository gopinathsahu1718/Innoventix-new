import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Technologies from './sections/Technologies';
import Projects from './sections/Projects';
import Team from './sections/Team';
import Clients from './sections/Clients';
import Pricing from './sections/Pricing';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Technologies />
        <Projects />
        <Team />
        <Clients />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
