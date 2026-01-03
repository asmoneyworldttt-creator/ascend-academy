import { useState } from "react";
import { Eye, Target, Crosshair, X, Sparkles, Award, Globe, Users } from "lucide-react";
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

const stats = [
  { value: "10,000+", label: "Active Learners" },
  { value: "50+", label: "Expert Courses" },
  { value: "95%", label: "Success Rate" },
  { value: "24/7", label: "Support" },
];

const AboutSection = () => {
  const [selectedCard, setSelectedCard] = useState<typeof aboutCards[0] | null>(null);

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-emerald/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Premium Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            About SkillHonors
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6">
            Empowering Your <span className="text-gradient-gold">Digital Future</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4">
            At SkillHonors, our mission is to help you unlock your potential in the digital world. 
            We offer high-quality video courses created by industry experts in fields like AI, digital marketing, 
            trading, and e-commerce. These courses provide practical, hands-on skills to advance your career and create new income streams.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="glass-card p-6 rounded-2xl text-center group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-2xl lg:text-3xl font-bold font-display text-gradient-gold mb-1">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            const AccentIcon = card.accentIcon;
            return (
              <div
                key={card.title}
                onClick={() => setSelectedCard(card)}
                className="glass-card-premium p-8 rounded-3xl cursor-pointer group hover:-translate-y-3 transition-all duration-500 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity">
                  <AccentIcon className="w-full h-full text-primary transform translate-x-8 -translate-y-8" />
                </div>
                
                {/* Icon */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6 text-base">
                    {card.shortDesc}
                  </p>
                  
                  <span className="inline-flex items-center text-primary font-semibold group-hover:gap-3 transition-all text-sm">
                    Discover More
                    <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
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
