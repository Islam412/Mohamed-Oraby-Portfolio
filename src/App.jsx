import Navbar from './components/Layout/Navbar';
import ParticlesBackground from './components/Layout/Particles';
import Hero from './components/Home/Hero';
import About from './components/About/About';
import Courses from './components/Courses/Courses';
import Videos from './components/Videos/Videos';
import Materials from './components/Materials/Materials';
import Gallery from './components/Gallery/Gallery';
import Exams from './components/Exams/Exams';
import Footer from './components/Layout/Footer';
import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-primary text-white relative">
      <ParticlesBackground />
      <Navbar />
      <Hero />
      <About />
      <Courses />
      <Videos />
      <Materials />
      <Gallery />
      <Exams />
      <Footer />
    </div>
  );
}

export default App;