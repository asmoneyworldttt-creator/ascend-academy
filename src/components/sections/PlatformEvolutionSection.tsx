import { useState } from "react";
import { GraduationCap, Users, Briefcase, ShoppingBag, Bitcoin, Wallet, Globe, Rocket, ChevronRight, Sparkles } from "lucide-react";

const platformPhases = [
  {
    phase: 1,
    icon: GraduationCap,
    title: "Educational Excellence",
    subtitle: "Extensive Online Courses & Certifications",
    description: "World-class video courses covering digital marketing, trading, e-commerce, AI, and more. Industry-recognized certifications to boost your career.",
    status: "Active",
    color: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.5)",
  },
  {
    phase: 2,
    icon: Users,
    title: "Skill Development",
    subtitle: "Live & Offline Expert Training Classes",
    description: "Interactive live sessions, hands-on workshops, and regional offline training events with industry experts.",
    status: "Coming 2025",
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16, 185, 129, 0.5)",
  },
  {
    phase: 3,
    icon: Briefcase,
    title: "Career Growth",
    subtitle: "Advanced Freelancing Job Opportunities Hub",
    description: "Direct job placements, freelance marketplace, and client connections for skilled learners.",
    status: "Coming 2025",
    color: "from-violet-500 to-purple-500",
    glowColor: "rgba(139, 92, 246, 0.5)",
  },
  {
    phase: 4,
    icon: ShoppingBag,
    title: "Digital Commerce",
    subtitle: "E-commerce Launch (In-house Production & Retail)",
    description: "Our own e-commerce platform with exclusive products, dropshipping opportunities, and seller programs.",
    status: "Coming 2026",
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.5)",
  },
  {
    phase: 5,
    icon: Bitcoin,
    title: "Financial Ecosystem",
    subtitle: 'Launching "Skill Learners" Own Crypto Coin',
    description: "Native cryptocurrency for platform transactions, rewards, and exclusive member benefits.",
    status: "Coming 2026",
    color: "from-yellow-400 to-amber-500",
    glowColor: "rgba(251, 191, 36, 0.5)",
  },
  {
    phase: 6,
    icon: Wallet,
    title: "Digital Assets",
    subtitle: "Secure Wallet & Native Exchange Launch",
    description: "Integrated crypto wallet and exchange platform for seamless digital asset management.",
    status: "Coming 2027",
    color: "from-rose-500 to-pink-500",
    glowColor: "rgba(244, 63, 94, 0.5)",
  },
  {
    phase: 7,
    icon: Globe,
    title: "Global Income Hub",
    subtitle: "Multi-stream Passive and Active Income",
    description: "Complete ecosystem for generating multiple income streams globally with minimal effort.",
    status: "Vision",
    color: "from-indigo-500 to-blue-600",
    glowColor: "rgba(99, 102, 241, 0.5)",
  },
];

const PlatformEvolutionSection = () => {
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden transition-colors duration-500">
      {/* Dark Gradient Background - Works in both themes */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Futuristic Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
        }} />
      </div>
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/20 to-transparent blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-gradient-to-bl from-purple-500/20 to-transparent blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm font-medium text-primary mb-6">
            <Rocket className="w-4 h-4" />
            Our Version of the Future
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 text-white">
            Platform <span className="text-gradient-gold">Evolution</span> Roadmap
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Our ambitious journey to build a complete ecosystem for learning, earning, and financial freedom.
          </p>
        </div>

        {/* 3D Futuristic Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Central Glowing Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_30px_rgba(139,92,246,0.5)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse opacity-50" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-8 lg:space-y-0">
            {platformPhases.map((phase, index) => {
              const Icon = phase.icon;
              const isLeft = index % 2 === 0;
              const isHovered = hoveredPhase === phase.phase;
              
              return (
                <div 
                  key={phase.phase}
                  className={`relative lg:flex ${isLeft ? 'lg:justify-start' : 'lg:justify-end'} lg:py-8`}
                  onMouseEnter={() => setHoveredPhase(phase.phase)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  {/* Mobile Timeline Dot */}
                  <div className="lg:hidden absolute left-0 top-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-white/10">
                    <span className="text-sm font-bold text-white">{phase.phase}</span>
                  </div>

                  {/* Desktop Center Node */}
                  <div className={`hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10`}>
                    <div 
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-2xl transition-all duration-500 ${isHovered ? 'scale-125' : 'scale-100'}`}
                      style={{
                        boxShadow: isHovered ? `0 0 40px ${phase.glowColor}` : '0 10px 30px rgba(0,0,0,0.3)',
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div 
                    className={`lg:w-[calc(50%-4rem)] ml-16 lg:ml-0 ${isLeft ? 'lg:pr-8' : 'lg:pl-8'}`}
                  >
                    <div 
                      className={`relative p-6 rounded-2xl border transition-all duration-500 ${
                        isHovered 
                          ? 'bg-white/10 border-white/30 shadow-2xl transform lg:scale-105' 
                          : 'bg-white/5 border-white/10'
                      }`}
                      style={{
                        boxShadow: isHovered ? `0 20px 60px ${phase.glowColor}40` : 'none',
                      }}
                    >
                      {/* Phase Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${phase.color} text-white`}>
                          Phase {phase.phase}
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          phase.status === 'Active' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {phase.status}
                        </span>
                      </div>

                      {/* Mobile Icon */}
                      <div className={`lg:hidden w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${phase.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1">{phase.title}</h3>
                      <p className="text-primary text-sm font-medium mb-3">{phase.subtitle}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{phase.description}</p>

                      {/* Hover Arrow */}
                      {isHovered && (
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden lg:block">
                          <ChevronRight className="w-6 h-6 text-primary animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-white/10">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-white font-medium">Join us on this revolutionary journey</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformEvolutionSection;