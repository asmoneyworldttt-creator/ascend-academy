import { useState } from "react";
import { GraduationCap, Users, Briefcase, ShoppingBag, Bitcoin, Wallet, Globe, Rocket, Sparkles, X, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const platformPhases = [
  {
    phase: 1,
    icon: GraduationCap,
    title: "Educational Excellence",
    subtitle: "Extensive Online Courses & Certifications",
    description: "World-class video courses covering digital marketing, trading, e-commerce, AI, and more. Industry-recognized certifications to boost your career.",
    fullDescription: "Our comprehensive educational platform offers world-class video courses meticulously crafted by industry experts. From digital marketing to stock trading, e-commerce strategies to AI fundamentals—we cover every skill needed to thrive in the digital economy. Each course comes with industry-recognized certifications that boost your professional credibility and open doors to new opportunities.",
    status: "Active",
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    phase: 2,
    icon: Users,
    title: "Skill Development",
    subtitle: "Live & Offline Expert Training",
    description: "Interactive live sessions, hands-on workshops, and regional offline training events.",
    fullDescription: "Go beyond recorded content with interactive live sessions led by industry professionals. Participate in hands-on workshops, Q&A sessions, and regional offline training events. This phase bridges the gap between theoretical knowledge and practical application, ensuring you're job-ready.",
    status: "Coming 2025",
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
  {
    phase: 3,
    icon: Briefcase,
    title: "Career Growth",
    subtitle: "Freelancing & Job Opportunities Hub",
    description: "Direct job placements, freelance marketplace, and client connections.",
    fullDescription: "Our dedicated career hub connects skilled learners directly with employers and clients. Access job placements, freelance opportunities, and a marketplace where your newly acquired skills translate into real income. We bridge the gap between learning and earning.",
    status: "Coming 2025",
    color: "from-violet-500 to-purple-500",
    glowColor: "rgba(139, 92, 246, 0.5)",
  },
  {
    phase: 4,
    icon: ShoppingBag,
    title: "Digital Commerce",
    subtitle: "E-commerce Platform Launch",
    description: "In-house production, exclusive products, and seller programs.",
    fullDescription: "Launch of our own e-commerce ecosystem featuring in-house manufactured products, dropshipping opportunities, and exclusive seller programs for community members. A complete platform for digital entrepreneurs to start their own businesses.",
    status: "Coming 2026",
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  {
    phase: 5,
    icon: Bitcoin,
    title: "Financial Ecosystem",
    subtitle: "Skill Learners Crypto Coin",
    description: "Native cryptocurrency for platform transactions and rewards.",
    fullDescription: "Introduction of our native cryptocurrency—Skill Learners Coin. Use it for platform transactions, earn it as rewards, and unlock exclusive member benefits. A step towards building a decentralized learning and earning ecosystem.",
    status: "Coming 2026",
    color: "from-yellow-400 to-amber-500",
    glowColor: "rgba(251, 191, 36, 0.5)",
  },
  {
    phase: 6,
    icon: Wallet,
    title: "Digital Assets",
    subtitle: "Secure Wallet & Exchange",
    description: "Integrated crypto wallet and exchange platform.",
    fullDescription: "Complete digital asset management with our secure wallet and native exchange platform. Seamlessly manage, trade, and grow your digital assets within the Skill Learners ecosystem. Designed for both beginners and experienced crypto users.",
    status: "Coming 2027",
    color: "from-rose-500 to-pink-500",
    glowColor: "rgba(244, 63, 94, 0.5)",
  },
  {
    phase: 7,
    icon: Globe,
    title: "Global Income Hub",
    subtitle: "Multi-stream Passive Income",
    description: "Complete ecosystem for generating multiple income streams globally.",
    fullDescription: "The ultimate vision—a complete global ecosystem enabling members to generate multiple passive and active income streams with minimal effort. From investments to royalties, from referrals to dividends—build lasting wealth through our comprehensive platform.",
    status: "Vision",
    color: "from-indigo-500 to-blue-600",
    glowColor: "rgba(99, 102, 241, 0.5)",
  },
];

const PlatformEvolutionSection = () => {
  const [selectedPhase, setSelectedPhase] = useState<typeof platformPhases[0] | null>(null);

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Dark Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-5 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/15 to-transparent blur-[80px] animate-pulse" />
      <div className="absolute bottom-1/4 right-5 w-48 h-48 rounded-full bg-gradient-to-bl from-purple-500/15 to-transparent blur-[60px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm font-medium text-primary mb-5">
            <Rocket className="w-4 h-4" />
            Our Vision of the Future
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold font-display mb-3 text-white">
            Platform <span className="text-gradient-gold">Evolution</span> Roadmap
          </h2>
          <p className="text-sm lg:text-base text-white/60 max-w-xl mx-auto">
            Our journey to build a complete ecosystem for learning, earning, and financial freedom.
          </p>
        </div>

        {/* 3D Road Path */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Road Line - Desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 via-amber-500 to-indigo-500 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-indigo-500/50 rounded-full blur-sm animate-pulse" />
            {/* Road lane markers */}
            <div className="absolute inset-x-0 top-0 bottom-0 flex flex-col justify-around items-center">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="w-1 h-4 bg-white/40 rounded-full" />
              ))}
            </div>
          </div>

          {/* Mobile Road Line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 lg:hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 via-amber-500 to-indigo-500 rounded-full" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-4 lg:space-y-0">
            {platformPhases.map((phase, index) => {
              const Icon = phase.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={phase.phase}
                  className={`relative lg:flex ${isLeft ? 'lg:justify-start' : 'lg:justify-end'} lg:py-6`}
                >
                  {/* Mobile Node */}
                  <button
                    onClick={() => setSelectedPhase(phase)}
                    className="lg:hidden absolute left-3 top-1 w-7 h-7 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-white/20 z-10 hover:scale-110 transition-transform"
                  >
                    <span className="text-[10px] font-bold text-white">{phase.phase}</span>
                  </button>

                  {/* Desktop Center Node */}
                  <button
                    onClick={() => setSelectedPhase(phase)}
                    className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 group"
                  >
                    <div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110`}
                      style={{
                        boxShadow: `0 0 25px ${phase.glowColor}`,
                      }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </button>

                  {/* Content Card */}
                  <div 
                    className={`lg:w-[calc(50%-3rem)] ml-14 lg:ml-0 ${isLeft ? 'lg:pr-6' : 'lg:pl-6'}`}
                  >
                    <button 
                      onClick={() => setSelectedPhase(phase)}
                      className="w-full text-left p-4 rounded-xl border bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                    >
                      {/* Phase Badge Row */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r ${phase.color} text-white`}>
                          Phase {phase.phase}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          phase.status === 'Active' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {phase.status}
                        </span>
                      </div>

                      {/* Mobile Icon */}
                      <div className={`lg:hidden w-10 h-10 mb-2 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <h3 className="text-base font-bold text-white mb-0.5">{phase.title}</h3>
                      <p className="text-primary text-xs font-medium mb-2">{phase.subtitle}</p>
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{phase.description}</p>
                      
                      <span className="inline-flex items-center text-[10px] text-primary font-semibold mt-2 group-hover:gap-1.5 transition-all">
                        Learn More
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-white/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-white font-medium text-sm">Join us on this revolutionary journey</span>
          </div>
        </div>
      </div>

      {/* Phase Detail Modal */}
      <Dialog open={!!selectedPhase} onOpenChange={() => setSelectedPhase(null)}>
        <DialogContent className="max-w-lg p-0 border-0 overflow-hidden mx-4">
          {selectedPhase && (
            <>
              {/* Header with gradient */}
              <div className={`relative p-6 bg-gradient-to-br ${selectedPhase.color}`}>
                <button 
                  onClick={() => setSelectedPhase(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <selectedPhase.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                      Phase {selectedPhase.phase} • {selectedPhase.status}
                    </span>
                    <h3 className="text-xl font-bold text-white">{selectedPhase.title}</h3>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 bg-card">
                <p className="text-sm font-semibold text-primary mb-3">{selectedPhase.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedPhase.fullDescription}</p>
                
                <Button 
                  onClick={() => setSelectedPhase(null)} 
                  variant="hero" 
                  className="w-full mt-6"
                >
                  Got it!
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PlatformEvolutionSection;