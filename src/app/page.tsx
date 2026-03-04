import ThreeScene from '@/components/ThreeScene';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Terminal from '@/components/Terminal';
import HireMe from '@/components/HireMe';
import Contact from '@/components/Contact';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-foreground overflow-hidden selection:bg-primary/30">
      <Navbar />
      <ThreeScene />

      <div className="flex flex-col gap-24 sm:gap-32 md:gap-40 pb-20">
        <Hero />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <About />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Experience />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <Projects />

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center justify-center">
          <Contact />
          <HireMe />
        </section>
      </div>

      <footer className="w-full py-8 text-center text-sm text-gray-500 relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-md">
        <p>© {new Date().getFullYear()} Sanjay Vinod. Building secure, premium digital experiences.</p>
      </footer>
      <Terminal />
    </main>
  );
}
