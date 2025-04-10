
import { ScrollToTop } from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';

// Import all sections
import { AboutSection } from './components/AboutSection';
import { AboutStatsSection } from './components/AboutStatsSection';
import { AICapabilitiesSection } from './components/AICapabilitiesSection';
import { ClientsSection } from './components/ClientsSection';
import { ContactSection } from './components/ContactSection';
import FilterableTeamSection from './components/FilterableTeamSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MissionSection } from './components/MissionSection';
import { ServicesSection } from './components/ServicesSection';
import { SolutionsSection } from './components/SolutionsSection';
import { TechStackSection } from './components/TechStackSection';

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <AboutStatsSection />
        <MissionSection />
        <ServicesSection />
        <AICapabilitiesSection />
        <SolutionsSection />
        <FilterableTeamSection />
        <TechStackSection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </>
  );
}

export default App;
