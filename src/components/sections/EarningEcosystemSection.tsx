import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, Users, TrendingUp, Crown, Shield, BookOpen, Briefcase, Coins, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

const EarningEcosystemSection = () => {
  const benefits = [
    {
      icon: BookOpen,
      title: "Skill Development",
      description: "Master in-demand skills like digital marketing, trading, content creation, and e-commerce that enable freelancing success.",
      color: "from-amber-400 to-yellow-500",
    },
    {
      icon: Briefcase,
      title: "Working Income",
      description: "Apply your skills immediately to earn active income through freelancing, client projects, and digital services.",
      color: "from-violet-500 to-purple-600",
    },
    {
      icon: Users,
      title: "Referral Rewards",
      description: "Earn 10-30% commission when you help others join and succeed. Share knowledge, grow together.",
      color: "from-emerald-400 to-teal-500",
    },
    {
      icon: Coins,
      title: "Passive Income",
      description: "Revenue sharing based on seniority and company sales volume. Earn even when not actively working.",
      color: "from-blue-500 to-indigo-600",
    },
  ];

  const stats = [
    { value: "1000+", label: "Active Students" },
    { value: "7", label: "Income Streams" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Royal Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-background dark:via-muted/30 dark:to-background" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
      
      {/* Decorative Elements - Smaller */}
      <div className="absolute top-1/4 left-[5%] w-64 h-64 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-[5%] w-56 h-56 rounded-full bg-accent/10 blur-[80px]" />

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 rounded-full border border-primary/30 mb-6 backdrop-blur-sm">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary tracking-wider uppercase">Premium Ecosystem</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 text-white dark:text-foreground leading-tight">
            The <span className="text-gradient-gold">Earning</span> Ecosystem
          </h2>
          
          <p className="text-base lg:text-lg text-white/70 dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We sell premium online courses to help you develop high-value skills for freelancing and multiple income streams. 
            Plus, bonus earning opportunities to maximize your returns.
          </p>
        </div>

        {/* Stats Bar - Compact */}
        <div className="grid grid-cols-3 gap-3 mb-12 max-w-xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-4 rounded-xl bg-white/5 dark:bg-card/50 border border-white/10 dark:border-border/30 backdrop-blur-lg"
            >
              <div className="text-2xl lg:text-3xl font-bold font-display text-gradient-gold mb-1">
                {stat.value}
              </div>
              <p className="text-xs text-white/60 dark:text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Grid - Compact */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={benefit.title}
                className="p-5 rounded-xl bg-white/5 dark:bg-card/50 border border-white/10 dark:border-border/30 backdrop-blur-lg group hover:-translate-y-1 transition-all duration-300"
              >
                <div 
                  className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-bold font-display text-white dark:text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-white/60 dark:text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Business Model Explanation */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-white/5 dark:bg-card/50 border border-white/10 dark:border-border/30 backdrop-blur-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white dark:text-foreground">Working Income</h4>
            </div>
            <p className="text-sm text-white/70 dark:text-muted-foreground leading-relaxed">
              Apply your newly learned skills to earn actively. Take on freelance projects, create digital products, 
              or offer services. Your effort directly translates to income based on the skills you develop.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/5 dark:bg-card/50 border border-white/10 dark:border-border/30 backdrop-blur-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white dark:text-foreground">Passive Income</h4>
            </div>
            <p className="text-sm text-white/70 dark:text-muted-foreground leading-relaxed">
              Based on your seniority and the company's overall sales performance, you receive revenue sharing. 
              This is linked to the platform's growth—transparent and based on collective success.
            </p>
          </div>
        </div>

        {/* Future Ready Section - Compact */}
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
          <div className="absolute inset-0 backdrop-blur-xl" />
          
          <div className="relative p-6 lg:p-8 border border-primary/20 rounded-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-xl lg:text-2xl font-bold font-display text-white dark:text-foreground">
                    Future-Ready for the <span className="text-gradient-gold">AI Economy</span>
                  </h3>
                  <p className="text-sm text-white/70 dark:text-muted-foreground mt-1">
                    Our curriculum evolves with industry trends—AI, Web3, automation, and beyond.
                  </p>
                </div>
              </div>
              
              <Link to="/register" className="flex-shrink-0">
                <Button variant="hero" size="lg" className="group shadow-lg">
                  Start Your Journey
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

export default EarningEcosystemSection;
