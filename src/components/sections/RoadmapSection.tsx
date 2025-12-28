import { useState } from "react";
import { ShoppingCart, Bitcoin, Briefcase, Video, CheckCircle, X } from "lucide-react";

const milestones = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "E-Commerce Mastery",
    color: "from-orange-500 to-red-500",
    position: "left",
    shortDesc: "Build and scale profitable online stores",
    fullDesc: `E-commerce is revolutionizing retail with global sales expected to exceed $8 trillion by 2027. At Skill Learners, we prepare you to capture this opportunity.

You'll learn:
• Dropshipping & product sourcing strategies
• Shopify & WooCommerce store setup
• Facebook & Google Ads for e-commerce
• Customer service automation
• Scaling to 6-figure revenue

Start with zero inventory and build a sustainable online business that generates passive income around the clock.`,
  },
  {
    id: 2,
    icon: Bitcoin,
    title: "Cryptocurrency & Web3",
    color: "from-yellow-500 to-orange-500",
    position: "right",
    shortDesc: "Navigate the future of finance",
    fullDesc: `Cryptocurrency and blockchain technology are reshaping finance, gaming, and digital ownership. Understanding this space positions you at the frontier of innovation.

You'll learn:
• Bitcoin, Ethereum & altcoin fundamentals
• Safe trading and investment strategies
• DeFi protocols and yield farming
• NFTs and digital asset creation
• Blockchain technology basics

Whether you want to invest wisely or build in Web3, this knowledge is essential for the digital economy.`,
  },
  {
    id: 3,
    icon: Briefcase,
    title: "High-Income Skills",
    color: "from-primary to-gold-dark",
    position: "left",
    shortDesc: "Skills that command premium rates",
    fullDesc: `High-income skills are abilities that businesses are willing to pay premium rates for. These skills provide freedom, flexibility, and unlimited earning potential.

You'll master:
• Copywriting & Sales
• Video Editing & Content Creation
• UI/UX Design
• Social Media Management
• Consulting & Coaching

With these skills, you can earn ₹50,000-₹5,00,000+ per month as a freelancer or start your own agency.`,
  },
  {
    id: 4,
    icon: Video,
    title: "Live Online Training",
    color: "from-accent to-teal-dark",
    position: "right",
    shortDesc: "Real-time expert guidance",
    fullDesc: `Theory is important, but real growth happens through live interaction with experts. Our live training sessions bridge the gap between learning and doing.

You'll experience:
• Weekly live Q&A sessions
• Real-time project feedback
• Guest expert masterclasses
• Live trading/marketing sessions
• Networking with other learners

These sessions provide accountability, motivation, and the personalized guidance needed to accelerate your success.`,
  },
];

const RoadmapSection = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<typeof milestones[0] | null>(null);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Your <span className="text-gradient-teal">Roadmap</span> to Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our proven path from beginner to expert. Each milestone unlocks new opportunities and income streams.
          </p>
        </div>

        {/* Roadmap Visual */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-emerald -translate-x-1/2 hidden md:block" />

          {/* Milestones */}
          <div className="space-y-12 md:space-y-24">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isLeft = milestone.position === "left";

              return (
                <div
                  key={milestone.id}
                  className={`relative flex items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8`}
                >
                  {/* Content Card */}
                  <div
                    className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}
                  >
                    <button
                      onClick={() => setSelectedMilestone(milestone)}
                      className="glass-card p-6 rounded-2xl w-full text-left hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className={`flex items-center gap-4 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold font-display group-hover:text-primary transition-colors">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground">{milestone.shortDesc}</p>
                      <span className="inline-flex items-center mt-3 text-primary font-medium text-sm">
                        Learn more →
                      </span>
                    </button>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-card border-4 border-primary shadow-glow-gold z-10">
                    <span className="font-bold text-primary">{milestone.id}</span>
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>

          {/* Finish Line */}
          <div className="flex flex-col items-center mt-16">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center shadow-lg mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold font-display text-center">
              Financial Freedom Achieved! 🎉
            </h3>
            <p className="text-muted-foreground text-center mt-2">
              You've mastered the skills to earn ₹1 Lakh+ per month
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMilestone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={() => setSelectedMilestone(null)}
        >
          <div
            className="glass-card max-w-xl w-full p-8 rounded-3xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedMilestone.color} flex items-center justify-center`}>
                <selectedMilestone.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold font-display">{selectedMilestone.title}</h3>
            </div>

            <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {selectedMilestone.fullDesc}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoadmapSection;
