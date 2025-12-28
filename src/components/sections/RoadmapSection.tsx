import { useState } from "react";
import { ShoppingCart, Bitcoin, Briefcase, Video, CheckCircle, X, Flag, Sparkles } from "lucide-react";

const milestones = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "E-Commerce Mastery",
    color: "#F97316", // Orange
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
    color: "#FBBF24", // Yellow/Gold
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
    color: "#14B8A6", // Teal
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
    color: "#8B5CF6", // Purple
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
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald/5 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-6">
            <Flag className="w-4 h-4" />
            Your Success Journey
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Your <span className="text-gradient-teal">Roadmap</span> to Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our proven path from beginner to expert. Each milestone unlocks new opportunities and income streams.
          </p>
        </div>

        {/* Roadmap Visual */}
        <div className="relative max-w-5xl mx-auto">
          {/* SVG Road Path - Desktop */}
          <svg 
            className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 1000 800"
            preserveAspectRatio="none"
            style={{ zIndex: 0 }}
          >
            <defs>
              {/* Road gradient */}
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#22C55E" stopOpacity="0.8" />
              </linearGradient>
              
              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* Dash pattern for road */}
              <pattern id="dashPattern" patternUnits="userSpaceOnUse" width="20" height="10">
                <rect x="0" y="4" width="12" height="2" fill="white" opacity="0.5"/>
              </pattern>
            </defs>

            {/* Main winding road path */}
            <path
              d="M 150 80 
                 C 300 80, 400 120, 500 150
                 C 700 200, 800 180, 850 250
                 C 900 350, 700 380, 500 400
                 C 300 420, 200 450, 150 520
                 C 100 600, 300 650, 500 680
                 C 700 700, 850 720, 850 780"
              stroke="url(#roadGradient)"
              strokeWidth="40"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />
            
            {/* Road center line - dashed */}
            <path
              d="M 150 80 
                 C 300 80, 400 120, 500 150
                 C 700 200, 800 180, 850 250
                 C 900 350, 700 380, 500 400
                 C 300 420, 200 450, 150 520
                 C 100 600, 300 650, 500 680
                 C 700 700, 850 720, 850 780"
              stroke="url(#roadGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="20 15"
              filter="url(#glow)"
              className="animate-pulse"
            />
          </svg>

          {/* Mobile vertical line */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-emerald rounded-full" />

          {/* Milestones */}
          <div className="relative space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-32 md:gap-y-16">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;
              
              // Position calculations for desktop
              const positions = [
                { top: '0', left: isEven ? '0' : 'auto', right: isEven ? 'auto' : '0' },
                { top: '180px', left: isEven ? '0' : 'auto', right: isEven ? 'auto' : '0' },
                { top: '360px', left: isEven ? '0' : 'auto', right: isEven ? 'auto' : '0' },
                { top: '540px', left: isEven ? '0' : 'auto', right: isEven ? 'auto' : '0' },
              ];

              return (
                <div
                  key={milestone.id}
                  className={`relative flex items-start gap-6 md:gap-8 ${
                    !isEven ? 'md:col-start-2 md:flex-row-reverse md:text-right' : ''
                  }`}
                >
                  {/* Mobile node connector */}
                  <div className="md:hidden absolute left-8 top-6 w-4 h-0.5 bg-gradient-to-r from-primary to-transparent" 
                       style={{ background: `linear-gradient(to right, ${milestone.color}, transparent)` }} 
                  />

                  {/* Milestone Node */}
                  <div className="relative z-10 flex-shrink-0 ml-4 md:ml-0">
                    <button
                      onClick={() => setSelectedMilestone(milestone)}
                      className="group relative"
                    >
                      {/* Outer glow ring */}
                      <div 
                        className="absolute inset-0 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity animate-pulse"
                        style={{ background: milestone.color, transform: 'scale(1.3)' }}
                      />
                      
                      {/* Main node */}
                      <div 
                        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300"
                        style={{ 
                          background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}dd)`,
                          boxShadow: `0 8px 32px ${milestone.color}60`
                        }}
                      >
                        <Icon className="w-7 h-7 md:w-9 md:h-9 text-white" />
                      </div>

                      {/* Step number */}
                      <div 
                        className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card border-2 flex items-center justify-center text-sm font-bold shadow-md"
                        style={{ borderColor: milestone.color, color: milestone.color }}
                      >
                        {milestone.id}
                      </div>
                    </button>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pb-8 md:pb-0">
                    <button
                      onClick={() => setSelectedMilestone(milestone)}
                      className={`w-full glass-card p-6 rounded-2xl text-left hover:-translate-y-1 transition-all duration-300 group border-2 border-transparent hover:border-opacity-50 ${
                        !isEven ? 'md:text-right' : ''
                      }`}
                      style={{ 
                        '--hover-border-color': milestone.color 
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${milestone.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                      }}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                        <h3 
                          className="text-lg md:text-xl font-bold font-display group-hover:opacity-90 transition-colors"
                          style={{ color: milestone.color }}
                        >
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base mb-3">
                        {milestone.shortDesc}
                      </p>
                      <span 
                        className="inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                        style={{ color: milestone.color }}
                      >
                        Learn more 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Finish Line - Financial Freedom */}
          <div className="relative mt-16 flex flex-col items-center">
            {/* Connector from last milestone */}
            <div className="hidden md:block absolute -top-16 left-1/2 w-1 h-16 bg-gradient-to-b from-accent to-emerald rounded-full" />
            
            {/* Trophy destination */}
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-emerald/30 blur-2xl animate-pulse" style={{ transform: 'scale(2)' }} />
              
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-emerald to-emerald-light flex items-center justify-center shadow-2xl"
                   style={{ boxShadow: '0 12px 48px rgba(34, 197, 94, 0.5)' }}>
                <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-white" />
              </div>
              
              {/* Sparkles */}
              <Sparkles className="absolute -top-2 -left-2 w-6 h-6 text-primary animate-pulse" />
              <Sparkles className="absolute -top-1 -right-3 w-5 h-5 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
              <Sparkles className="absolute -bottom-1 left-0 w-4 h-4 text-emerald animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold font-display text-center mt-6">
              <span className="text-gradient-gold">Financial Freedom</span> Achieved! 🎉
            </h3>
            <p className="text-muted-foreground text-center mt-2 max-w-md">
              You've mastered the skills to earn ₹1 Lakh+ per month and build lasting wealth
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMilestone && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMilestone(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm animate-fade-in" />
          
          {/* Modal Content */}
          <div
            className="relative glass-card max-w-xl w-full rounded-3xl overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header banner with gradient */}
            <div 
              className="h-24 relative"
              style={{ 
                background: `linear-gradient(135deg, ${selectedMilestone.color}40, ${selectedMilestone.color}20)` 
              }}
            >
              <div 
                className="absolute -bottom-8 left-8 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${selectedMilestone.color}, ${selectedMilestone.color}dd)`,
                  boxShadow: `0 8px 24px ${selectedMilestone.color}50`
                }}
              >
                <selectedMilestone.icon className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="p-8 pt-12">
              <div className="flex items-center gap-3 mb-4">
                <span 
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ 
                    background: `${selectedMilestone.color}20`,
                    color: selectedMilestone.color
                  }}
                >
                  STEP {selectedMilestone.id}
                </span>
              </div>
              
              <h3 
                className="text-2xl font-bold font-display mb-4"
                style={{ color: selectedMilestone.color }}
              >
                {selectedMilestone.title}
              </h3>

              <div className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm md:text-base">
                {selectedMilestone.fullDesc}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoadmapSection;
