import { useState } from "react";
import { ShoppingCart, Bitcoin, Briefcase, Video, X, Rocket, Zap, Globe, Brain, Target } from "lucide-react";

const platformMilestones = [
  {
    id: 1,
    icon: ShoppingCart,
    title: "E-Commerce Mastery",
    color: "#F97316",
    shortDesc: "Build and scale profitable online stores",
    fullDesc: `E-commerce is revolutionizing retail with global sales expected to exceed $8 trillion by 2027. At SkillHonors, we prepare you to capture this opportunity.

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
    color: "#FBBF24",
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
    color: "#14B8A6",
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
    color: "#8B5CF6",
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

const futureVision = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description: "Personalized learning paths powered by artificial intelligence",
    status: "Coming Soon",
  },
  {
    icon: Globe,
    title: "Global Job Portal",
    description: "Direct job opportunities with partner companies worldwide",
    status: "2025",
  },
  {
    icon: Zap,
    title: "Instant Certifications",
    description: "Blockchain-verified certificates recognized globally",
    status: "In Development",
  },
  {
    icon: Target,
    title: "Freelance Marketplace",
    description: "Connect with clients seeking your newly acquired skills",
    status: "2025 Q2",
  },
];

const PlatformEvolutionSection = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<typeof platformMilestones[0] | null>(null);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm font-medium text-primary mb-6">
            <Rocket className="w-4 h-4" />
            Platform Evolution
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 text-white">
            Our <span className="text-gradient-teal">Vision</span> for the Future
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            We're continuously evolving to bring you the best learning experience and career opportunities.
          </p>
        </div>

        {/* Current Offerings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {platformMilestones.map((milestone) => {
            const Icon = milestone.icon;
            return (
              <button
                key={milestone.id}
                onClick={() => setSelectedMilestone(milestone)}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-left"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{ 
                    background: `linear-gradient(135deg, ${milestone.color}40, ${milestone.color}20)`,
                    border: `1px solid ${milestone.color}50`
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: milestone.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{milestone.title}</h3>
                <p className="text-sm text-white/60">{milestone.shortDesc}</p>
                <span className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                  Active
                </span>
              </button>
            );
          })}
        </div>

        {/* Future Vision Timeline */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white text-center mb-8">Coming Soon</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-emerald hidden md:block" />
            
            <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
              {futureVision.map((item, index) => {
                const Icon = item.icon;
                const isLeft = index % 2 === 0;
                
                return (
                  <div 
                    key={index} 
                    className={`relative ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:col-start-2'}`}
                  >
                    {/* Timeline dot */}
                    <div className={`hidden md:block absolute top-4 ${isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-4 h-4 rounded-full bg-primary border-4 border-slate-800`} />
                    
                    <div className="p-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                      <div className={`flex items-center gap-3 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 font-medium md:hidden">
                          {item.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-white/60 mb-2">{item.description}</p>
                      <span className="hidden md:inline-block text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 font-medium">
                        {item.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMilestone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-2xl p-6 shadow-2xl animate-scale-in">
            <button
              onClick={() => setSelectedMilestone(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${selectedMilestone.color}, ${selectedMilestone.color}80)`
                }}
              >
                <selectedMilestone.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedMilestone.title}</h3>
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-white/80 whitespace-pre-line">{selectedMilestone.fullDesc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default PlatformEvolutionSection;
