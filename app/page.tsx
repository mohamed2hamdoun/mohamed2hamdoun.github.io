import Hero from '@/components/home/Hero';
import SelectedWork from '@/components/home/SelectedWork';
import Statement from '@/components/home/Statement';
import Capabilities from '@/components/home/Capabilities';
import Process from '@/components/home/Process';
import ResearchPreview from '@/components/home/ResearchPreview';
import AboutPreview from '@/components/home/AboutPreview';
import CreativeArchive from '@/components/home/CreativeArchive';
import ContactSection from '@/components/home/ContactSection';

// Home is a server component; the only client islands are Nav, the contact form,
// and the ScrollReveal effect.
export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Statement />
      <Capabilities />
      <Process />
      <ResearchPreview />
      <AboutPreview />
      <CreativeArchive />
      <ContactSection />
    </>
  );
}
