import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import PlansSection from "@/components/sections/PlansSection";
import WhySkillLearnersSection from "@/components/sections/WhySkillLearnersSection";
import EarningEcosystemSection from "@/components/sections/EarningEcosystemSection";
import CoursesSection from "@/components/sections/CoursesSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import RoadmapSection from "@/components/sections/RoadmapSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <PlansSection />
        <WhySkillLearnersSection />
        <EarningEcosystemSection />
        <CoursesSection />
        <ReviewsSection />
        <RoadmapSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
