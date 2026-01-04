import { useState } from "react";
import { GraduationCap, Users, Briefcase, ShoppingBag, Bitcoin, Wallet, Globe, Rocket, Sparkles, X, ArrowRight, MapPin } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const platformPhases = [
  {
    phase: 1,
    icon: GraduationCap,
    title: "Educational Excellence",
    subtitle: "Extensive Online Courses & Certifications",
    description: "World-class video courses covering digital marketing, trading, e-commerce, AI, and more.",
    fullDescription: "Our comprehensive educational platform offers world-class video courses meticulously crafted by industry experts. From digital marketing to stock trading, e-commerce strategies to AI fundamentals—we cover every skill needed to thrive in the digital economy. Each course comes with industry-recognized certifications.",
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
    fullDescription: "Go beyond recorded content with interactive live sessions led by industry professionals. Participate in hands-on workshops, Q&A sessions, and regional offline training events. This phase bridges the gap between theoretical knowledge and practical application.",
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
    fullDescription: "Our dedicated career hub connects skilled learners directly with employers and clients. Access job placements, freelance opportunities, and a marketplace where your newly acquired skills translate into real income.",
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
    fullDescription: "Launch of our own e-commerce ecosystem featuring in-house manufactured products, dropshipping opportunities, and exclusive seller programs for community members.",
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
    fullDescription: "Introduction of our native cryptocurrency—Skill Learners Coin. Use it for platform transactions, earn it as rewards, and unlock exclusive member benefits.",
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
    fullDescription: "Complete digital asset management with our secure wallet and native exchange platform. Seamlessly manage, trade, and grow your digital assets within the Skill Learners ecosystem.",
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
    fullDescription: "The ultimate vision—a complete global ecosystem enabling members to generate multiple passive and active income streams with minimal effort. From investments to royalties, from referrals to dividends—build lasting wealth.",
    status: "Vision",
    color: "from-indigo-500 to-blue-600",
    glowColor: "rgba(99, 102, 241, 0.5)",
  },
];

const PlatformEvolutionSection = () => {
  const [selectedPhase, setSelectedPhase] = useState<typeof platformPhases[0] | null>(null);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Premium Dark Background */}
      <div className="absolute inset-0 bg-[#0a0e18]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1220] via-[#080c14] to-[#0a1020]" />
      
      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full bg-violet-600/10 blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/25 text-sm font-medium text-primary mb-5">
            <Rocket className="w-4 h-4" />
            Our Vision of the Future
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 text-white">
            Platform <span className="text-gradient-gold">Evolution</span> Roadmap
          </h2>
          <p className="text-base lg:text-lg text-white/60 max-w-2xl mx-auto">
            Our journey to build a complete ecosystem for learning, earning, and financial freedom.
          </p>
        </div>

        {/* Realistic Roadmap Design */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Road Path - Desktop */}
          <div className="hidden lg:block">
            {/* Road surface */}
            <div className="absolute left-1/2 top-0 bottom-0 w-20 -translate-x-1/2">
              {/* Road base */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 rounded-full shadow-2xl" />
              {/* Road edges */}
              <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-b from-amber-500/60 via-amber-400/60 to-amber-500/60 rounded-l-full" />
              <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-b from-amber-500/60 via-amber-400/60 to-amber-500/60 rounded-r-full" />
              {/* Center line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 flex flex-col gap-4 py-4">
                {[...Array(18)].map((_, i) => (
                  <div key={i} className="flex-shrink-0 h-8 w-full bg-yellow-400/80 rounded-full shadow-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Road Line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-4">
            <div className="absolute inset-0 bg-slate-700 rounded-full" />
            <div className="absolute inset-y-0 left-0 w-0.5 bg-amber-500/60 rounded-l-full" />
            <div className="absolute inset-y-0 right-0 w-0.5 bg-amber-500/60 rounded-r-full" />
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 flex flex-col gap-3 py-2">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex-shrink-0 h-5 w-full bg-yellow-400/70 rounded-full" />
              ))}
            </div>
          </div>

          {/* Timeline Items */}
          <div className="space-y-6 lg:space-y-0">
            {platformPhases.map((phase, index) => {
              const Icon = phase.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={phase.phase}
                  className={`relative lg:flex ${isLeft ? 'lg:justify-start' : 'lg:justify-end'} lg:py-8`}
                >
                  {/* Milestone Marker - Mobile */}
                  <button
                    onClick={() => setSelectedPhase(phase)}
                    className="lg:hidden absolute left-5 top-1/2 -translate-y-1/2 z-20"
                  >
                    <div 
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center border-3 border-white/30 shadow-xl`}
                      style={{ boxShadow: `0 0 20px ${phase.glowColor}` }}
                    >
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                  </button>

                  {/* Milestone Marker - Desktop */}
                  <button
                    onClick={() => setSelectedPhase(phase)}
                    className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    <div 
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center border-4 border-white/20 shadow-2xl transition-all duration-300 group-hover:scale-110`}
                      style={{ boxShadow: `0 0 30px ${phase.glowColor}` }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    {/* Connecting arm */}
                    <div className={`absolute top-1/2 -translate-y-1/2 h-1 w-12 bg-gradient-to-r ${phase.color} ${isLeft ? 'right-full' : 'left-full'} rounded-full opacity-60`} />
                  </button>

                  {/* Content Card */}
                  <div 
                    className={`lg:w-[calc(50%-5rem)] ml-20 lg:ml-0 ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}
                  >
                    <button 
                      onClick={() => setSelectedPhase(phase)}
                      className="w-full text-left p-5 rounded-xl bg-slate-900/90 border border-slate-700/60 hover:bg-slate-800/90 hover:border-slate-600/70 transition-all duration-300 group shadow-xl backdrop-blur-sm"
                    >
                      {/* Phase Badge Row */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r ${phase.color} text-white shadow-md`}>
                          Phase {phase.phase}
                        </span>
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                          phase.status === 'Active' 
                            ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/40' 
                            : 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
                        }`}>
                          {phase.status}
                        </span>
                      </div>

                      {/* Mobile Icon */}
                      <div className={`lg:hidden w-11 h-11 mb-3 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{phase.title}</h3>
                      <p className="text-primary text-xs font-semibold mb-2">{phase.subtitle}</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{phase.description}</p>
                      
                      <span className="inline-flex items-center text-[11px] text-primary font-semibold mt-3 group-hover:gap-1.5 transition-all">
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
        <div className="text-center mt-14">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-white/10 shadow-lg">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-white font-medium text-sm">Join us on this revolutionary journey</span>
          </div>
        </div>
      </div>

      {/* Phase Detail Modal */}
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