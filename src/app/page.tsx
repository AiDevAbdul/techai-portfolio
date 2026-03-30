import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import Services from '@/components/public/Services';
import About from '@/components/public/About';
import Portfolio from '@/components/public/Portfolio';
import Testimonials from '@/components/public/Testimonials';
import Blog from '@/components/public/Blog';
import Contact from '@/components/public/Contact';
import Footer from '@/components/public/Footer';

export default function Home() {
  return (
    <div className="bg-primary-bg text-text-primary">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
