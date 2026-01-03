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
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-[#080c14]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1020] via-[#060810] to-[#0a0e18]" />
      
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-blue-600/8 blur-[100px]" />
      <div className="absolute bottom-1/3 right-10 w-64 h-64 rounded-full bg-violet-600/8 blur-[80px]" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/25 text-sm font-medium text-primary mb-5">
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

        {/* Visible Road Path Design */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Road - Desktop - More visible */}
          <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 hidden lg:block">
            {/* Road base */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700 rounded-full shadow-lg" />
            {/* Center line glow */}
            <div className="absolute inset-x-1 inset-y-0 bg-gradient-to-b from-blue-500 via-purple-500 via-amber-500 to-indigo-500 rounded-full" />
            {/* Road lane markers - dashed white line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 flex flex-col gap-3 py-2">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex-shrink-0 h-6 w-full bg-white/60 rounded-full" />
              ))}
            </div>
          </div>

          {/* Mobile Road Line - More visible */}
          <div className="absolute left-6 top-0 bottom-0 w-2 lg:hidden">
            <div className="absolute inset-0 bg-slate-700 rounded-full" />
            <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-b from-blue-500 via-purple-500 via-amber-500 to-indigo-500 rounded-full opacity-80" />
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

                  {/* Content Card - More visible with better contrast */}
                  <div 
                    className={`lg:w-[calc(50%-3rem)] ml-14 lg:ml-0 ${isLeft ? 'lg:pr-6' : 'lg:pl-6'}`}
                  >
                    <button 
                      onClick={() => setSelectedPhase(phase)}
                      className="w-full text-left p-4 rounded-xl border bg-slate-900/90 border-slate-700/50 hover:bg-slate-800/90 hover:border-slate-600/60 transition-all duration-300 group shadow-lg"
                    >
                      {/* Phase Badge Row */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r ${phase.color} text-white shadow-sm`}>
                          Phase {phase.phase}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          phase.status === 'Active' 
                            ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/30' 
                            : 'bg-amber-500/25 text-amber-300 border border-amber-500/30'
                        }`}>
                          {phase.status}
                        </span>
                      </div>

                      {/* Mobile Icon */}
                      <div className={`lg:hidden w-10 h-10 mb-2 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <h3 className="text-base font-bold text-white mb-0.5">{phase.title}</h3>
                      <p className="text-primary text-xs font-semibold mb-2">{phase.subtitle}</p>
                      <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">{phase.description}</p>
                      
                      <span className="inline-flex items-center text-[10px] text-primary font-semibold mt-3 group-hover:gap-1.5 transition-all">
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

      {/* Phase Detail Modal - Mobile optimized */}
      <Dialog open={!!selectedPhase} onOpenChange={() => setSelectedPhase(null)}>
        <DialogContent className="max-w-md p-0 border-0 overflow-hidden mx-4 max-h-[85vh] overflow-y-auto">
          {selectedPhase && (
            <>
              {/* Header with gradient */}
              <div className={`relative p-5 bg-gradient-to-br ${selectedPhase.color}`}>
                <button 
                  onClick={() => setSelectedPhase(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <selectedPhase.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">
                      Phase {selectedPhase.phase} • {selectedPhase.status}
                    </span>
                    <h3 className="text-lg font-bold text-white">{selectedPhase.title}</h3>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5 bg-card">
                <p className="text-sm font-semibold text-primary mb-2">{selectedPhase.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{selectedPhase.fullDescription}</p>
                
                <Button 
                  onClick={() => setSelectedPhase(null)} 
                  variant="hero" 
                  className="w-full mt-5"
                  size="default"
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