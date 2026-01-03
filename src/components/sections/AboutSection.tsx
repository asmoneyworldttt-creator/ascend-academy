import { useState } from "react";
import { Eye, Target, Crosshair, Sparkles, Award, Globe, Users, ArrowRight, Lightbulb, Rocket } from "lucide-react";
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
    accentIcon: Globe,
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
    accentIcon: Users,
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
    accentIcon: Award,
  },
];

const AboutSection = () => {
  const [selectedCard, setSelectedCard] = useState<typeof aboutCards[0] | null>(null);

  return (
    <section id="about" className="py-16 lg:py-24 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-60" />

      <div className="container relative mx-auto px-4">
        {/* Compact Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-5">
            <Sparkles className="w-4 h-4" />
            About Skill Learners
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold font-display mb-4">
            Empowering Your <span className="text-gradient-gold">Digital Future</span>
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Empowering the next generation of digital entrepreneurs through learning, earning, and future-tech innovation.
          </p>
        </div>

        {/* Compact Storytelling Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 lg:p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative grid lg:grid-cols-5 gap-6 items-center">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-display">Our Story</h3>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  In a world where technology evolves faster than traditional education can keep up, we created 
                  <strong className="text-foreground"> Skill Learners</strong> — a complete ecosystem designed to transform 
                  lives through practical education and real earning opportunities.
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald/10 border border-emerald/20">
                    <Rocket className="w-3.5 h-3.5 text-emerald" />
                    <span className="text-xs font-medium text-emerald">Future-Focused</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-medium text-primary">Community-Driven</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg" />
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=280&fit=crop" 
                  alt="Team collaboration"
                  className="relative rounded-xl shadow-xl w-full h-40 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Compact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onClick={() => setSelectedCard(card)}
                className="glass-card p-5 lg:p-6 rounded-2xl cursor-pointer group hover:-translate-y-2 transition-all duration-400 relative overflow-hidden"
              >
                {/* Icon */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {card.shortDesc}
                  </p>
                  
                  <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowRight className="ml-1 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Premium Modal */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-2xl p-0 glass-card border-border/50 overflow-hidden mx-4">
          {selectedCard && (
            <div className="relative h-40 md:h-56 overflow-hidden">
              <img 
                src={selectedCard.bannerImage} 
                alt={selectedCard.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              <div className={`absolute bottom-4 left-4 md:left-6 w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br ${selectedCard.color} flex items-center justify-center shadow-lg`}>
                <selectedCard.icon className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground" />
              </div>
            </div>
          )}
          
          <div className="p-6 md:p-8 pt-4 md:pt-6">
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl font-bold font-display">
                {selectedCard?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-line mt-4 text-base max-h-[50vh] overflow-y-auto">
              {selectedCard?.fullDesc}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AboutSection;