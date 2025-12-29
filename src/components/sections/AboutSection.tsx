import { useState } from "react";
import { Eye, Target, Crosshair, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const aboutCards = [
  {
    icon: Eye,
    title: "Our Vision",
    shortDesc: "To be a global leader in transforming lives through online education.",
    fullDesc: `Our vision is to be a global leader in transforming lives through online education, empowering individuals worldwide to unlock their full potential, thrive in the digital age, and achieve fulfilling lives with financial freedom.

We envision a world where quality education is accessible to everyone, regardless of their background or location. Through innovative learning experiences and cutting-edge technology, we aim to bridge the gap between ambition and achievement.

Our commitment is to create pathways that lead to personal growth, professional success, and lasting prosperity for every member of our community.`,
    color: "from-primary to-gold-dark",
    bgColor: "bg-primary/10",
    bannerImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
  },
  {
    icon: Target,
    title: "Our Mission",
    shortDesc: "To empower individuals through quality education and practical training.",
    fullDesc: `Our mission is to empower individuals to unlock their full potential and thrive in the digital age through our online courses. We aim to create a supportive community for learning and career growth, providing high-quality education, practical training, and expert guidance.

We believe in:
• Delivering world-class content created by industry experts
• Providing hands-on, practical learning experiences
• Building a supportive community of learners and mentors
• Offering personalized guidance for career advancement
• Creating multiple income opportunities through skill development

Every course we offer is designed with real-world application in mind, ensuring our students graduate with skills that are immediately valuable in the marketplace.`,
    color: "from-accent to-teal-dark",
    bgColor: "bg-accent/10",
    bannerImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
  },
  {
    icon: Crosshair,
    title: "Our Goal",
    shortDesc: "To provide innovative courses tailored to future technologies.",
    fullDesc: `Our main goal is to provide innovative online courses tailored to future technologies and market trends, developing practical skills essential for career advancement and creating income-generating opportunities.

We focus on:
• AI & Machine Learning expertise
• Digital Marketing mastery
• E-commerce & Dropshipping strategies
• Cryptocurrency & Web3 knowledge
• High-income skill development
• Freelancing & Remote work opportunities

By staying ahead of industry trends and continuously updating our curriculum, we ensure our students are always prepared for the jobs and opportunities of tomorrow, not yesterday.`,
    color: "from-emerald to-emerald-light",
    bgColor: "bg-emerald/10",
    bannerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  },
];

const AboutSection = () => {
  const [selectedCard, setSelectedCard] = useState<typeof aboutCards[0] | null>(null);

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6">
            About <span className="text-gradient-gold">Skill Learners</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            At Skill Learners, our mission is to help you unlock your potential in the digital world. 
            We offer high-quality video courses created by industry experts in fields like AI and digital marketing. 
            These courses provide practical, hands-on skills to advance your career and create new income streams.
          </p>
        </div>

        {/* Cards Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onClick={() => setSelectedCard(card)}
                className="glass-card p-6 lg:p-8 rounded-2xl lg:rounded-3xl cursor-pointer group hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon - Centered on mobile, left-aligned on desktop */}
                <div className="flex flex-col items-center md:items-start">
                  <div className={`w-14 h-14 lg:w-16 lg:h-16 mb-4 lg:mb-6 rounded-xl lg:rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-lg lg:text-xl font-bold font-display mb-2 lg:mb-3 group-hover:text-primary transition-colors text-center md:text-left">
                    {card.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm lg:text-base text-center md:text-left">
                    {card.shortDesc}
                  </p>
                  
                  <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all text-sm">
                    Learn More
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Modal with Banner Image */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-2xl p-0 glass-card border-border/50 overflow-hidden mx-4">
          {/* Banner Image */}
          {selectedCard && (
            <div className="relative h-32 md:h-48 overflow-hidden">
              <img 
                src={selectedCard.bannerImage} 
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              <div className={`absolute bottom-4 left-4 md:left-6 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${selectedCard.color} flex items-center justify-center shadow-lg`}>
                <selectedCard.icon className="w-6 h-6 md:w-8 md:h-8 text-primary-foreground" />
              </div>
            </div>
          )}
          
          <div className="p-4 md:p-6 pt-2 md:pt-4">
            <DialogHeader>
              <DialogTitle className="text-xl md:text-2xl font-bold font-display">
                {selectedCard?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line mt-4 text-sm md:text-base max-h-[50vh] overflow-y-auto">
              {selectedCard?.fullDesc}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AboutSection;