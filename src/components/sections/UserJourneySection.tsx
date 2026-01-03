import { ArrowRight, CheckCircle2, Sparkles, Target, GraduationCap, Wallet, Rocket, Users, Crown, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const journeySteps = [
  {
    step: 1,
    icon: Target,
    title: "Choose Your Path",
    subtitle: "Select a Combo Package",
    description: "Browse our carefully curated combo packages designed to give you maximum value. Each package combines complementary courses that work together to build complete skill sets.",
    highlights: [
      "Multiple courses bundled together",
      "Significant savings vs individual courses",
      "Access to exclusive community",
    ],
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    bgGradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    step: 2,
    icon: GraduationCap,
    title: "Master High-Demand Skills",
    subtitle: "Learn from Industry Experts",
    description: "Dive into comprehensive courses taught by professionals who are actively working in their fields. Our curriculum is constantly updated to match industry demands.",
    highlights: [
      "Practical, project-based learning",
      "Live mentoring sessions",
      "Industry-recognized certificates",
    ],
    gradient: "from-emerald-500 via-green-400 to-teal-400",
    bgGradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    step: 3,
    icon: Wallet,
    title: "Start Earning",
    subtitle: "Multiple Income Streams",
    description: "Apply your new skills immediately. Take on freelance projects, build your portfolio, and leverage our affiliate program for additional income while you learn.",
    highlights: [
      "Freelance opportunities",
      "Affiliate income potential",
      "Direct client connections",
    ],
    gradient: "from-amber-500 via-orange-400 to-yellow-400",
    bgGradient: "from-amber-500/20 to-orange-500/10",
  },
  {
    step: 4,
    icon: Rocket,
    title: "Achieve Financial Freedom",
    subtitle: "Build Your Future",
    description: "With mastered skills and multiple income streams, you're positioned for lasting success. Our community continues to support you as you scale your ventures.",
    highlights: [
      "Passive income opportunities",
      "Business building guidance",
      "Lifetime community access",
    ],
    gradient: "from-violet-600 via-purple-500 to-pink-400",
    bgGradient: "from-violet-500/20 to-purple-500/10",
  },
];

const UserJourneySection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden transition-colors duration-500">
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background transition-colors duration-500" />
      
      {/* Decorative Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Premium Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm font-bold text-primary mb-6 shadow-lg shadow-primary/10">
            <Crown className="w-4 h-4" />
            Your Success Blueprint
          </div>
          <h2 className="text-3xl lg:text-6xl font-bold font-display mb-6">
            Your <span className="text-gradient-gold">Journey</span> to Success
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Follow our proven 4-step path from beginner to financially independent professional. 
            Each step builds on the previous, creating a solid foundation for lasting success.
          </p>
        </div>

        {/* Premium Journey Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div 
                  key={step.step}
                  className="group relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Card Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${step.gradient} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />
                  
                  {/* Main Card */}
                  <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${step.bgGradient} border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl`}>
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-card to-muted flex items-center justify-center shadow-xl border border-border/50">
                      <span className={`text-2xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                        {step.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold font-display mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className={`text-sm font-semibold mb-4 bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.subtitle}
                    </p>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-3">
                      {step.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${step.gradient} flex items-center justify-center flex-shrink-0`}>
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-foreground/80">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Decorative Corner */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Icon className="w-full h-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connection Arrows - Desktop Only */}
          <div className="hidden lg:flex justify-center items-center gap-4 my-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Premium CTA Section */}
        <div className="mt-20 text-center">
          <div className="relative inline-block">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-2xl opacity-50" />
            
            <div className="relative glass-card p-10 rounded-3xl border border-primary/20 max-w-4xl mx-auto bg-gradient-to-br from-card/80 to-muted/50">
              <div className="flex items-center justify-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-emerald" />
                <span className="text-sm font-bold text-emerald">Join 10,000+ learners who started their journey</span>
              </div>
              
              <h3 className="text-3xl lg:text-4xl font-bold font-display mb-4">
                Ready to <span className="text-gradient-teal">Transform</span> Your Future?
              </h3>
              
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                By mastering these skills, you can take on freelance projects, build passive income streams, 
                and position yourself for career growth. We provide extra earning opportunities and future business prospects.
              </p>
              
              <Link to="/register">
                <Button variant="hero" size="xl" className="group shadow-xl shadow-primary/20">
                  <Sparkles className="w-5 h-5" />
                  Start Your Journey Today
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserJourneySection;