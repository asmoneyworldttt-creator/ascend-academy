import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, Users, TrendingUp, Crown, Gem, Shield, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const EarningEcosystemSection = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Learn & Earn",
      subtitle: "Simultaneously",
      description: "Start generating income while you're still learning. Apply skills in real-time projects.",
      color: "from-amber-400 to-yellow-500",
      glowColor: "#f59e0b",
    },
    {
      icon: Target,
      title: "Multiple",
      subtitle: "Income Streams",
      description: "Unlock 7+ revenue channels through freelancing, affiliate programs, and digital products.",
      color: "from-violet-500 to-purple-600",
      glowColor: "#8b5cf6",
    },
    {
      icon: Users,
      title: "Referral",
      subtitle: "Rewards",
      description: "Earn 10-30% commission by sharing knowledge and inviting others to join.",
      color: "from-emerald-400 to-teal-500",
      glowColor: "#10b981",
    },
    {
      icon: TrendingUp,
      title: "Passive",
      subtitle: "Income",
      description: "Build systems that generate income even when you're not actively working.",
      color: "from-blue-500 to-indigo-600",
      glowColor: "#3b82f6",
    },
  ];

  const stats = [
    { value: "1000+", label: "Active Students" },
    { value: "₹5L+", label: "Total Payouts" },
    { value: "7", label: "Income Streams" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <section className="py-28 lg:py-40 relative overflow-hidden">
      {/* Royal Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-background dark:via-muted/30 dark:to-background" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
      
      {/* Decorative Royal Orbs */}
      <div className="absolute top-1/4 left-[5%] w-96 h-96 rounded-full bg-primary/10 blur-[150px]" />
      <div className="absolute bottom-1/4 right-[5%] w-80 h-80 rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[200px]" />

      {/* Crown Decorative Element */}
      <div className="absolute top-20 right-[15%] opacity-10">
        <Crown className="w-40 h-40 text-primary" />
      </div>
      <div className="absolute bottom-20 left-[10%] opacity-10">
        <Gem className="w-32 h-32 text-accent" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/15 rounded-full border border-primary/30 mb-8 backdrop-blur-sm">
            <Crown className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-primary tracking-wider uppercase">Premium Ecosystem</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold font-display mb-6 text-white dark:text-foreground leading-tight">
            The <span className="text-gradient-gold">Earning</span> Ecosystem
          </h2>
          
          <p className="text-lg lg:text-xl text-white/70 dark:text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At Skill Learners, education is an investment that pays dividends. 
            Our unique ecosystem allows you to start earning while you're still learning.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white/5 dark:bg-card/50 border border-white/10 dark:border-border/30 backdrop-blur-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl lg:text-4xl font-bold font-display text-gradient-gold mb-2">
                {stat.value}
              </div>
              <p className="text-sm text-white/60 dark:text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Bento Grid */}
        <div className="grid lg:grid-cols-12 gap-6 mb-20">
          {/* Large Feature Card */}
          <div className="lg:col-span-7 glass-card-premium p-8 lg:p-10 rounded-3xl bg-white/5 dark:bg-card/60 border border-white/10 dark:border-border/30 group hover:-translate-y-2 transition-all duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-xl relative">
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-50 bg-gradient-to-br from-amber-400 to-yellow-500" />
                <Zap className="w-8 h-8 text-white relative z-10" />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold font-display text-white dark:text-foreground">
                  {benefits[0].title}
                </h3>
                <p className="text-lg text-primary font-semibold">{benefits[0].subtitle}</p>
              </div>
            </div>
            <p className="text-white/70 dark:text-muted-foreground text-lg leading-relaxed mb-6">
              {benefits[0].description}
            </p>
            <div className="flex items-center gap-2 text-primary">
              <BadgeCheck className="w-5 h-5" />
              <span className="text-sm font-semibold">Start earning from day one</span>
            </div>
          </div>

          {/* Right Stack */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {benefits.slice(1, 3).map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.title}
                  className="flex-1 glass-card-premium p-6 rounded-2xl bg-white/5 dark:bg-card/60 border border-white/10 dark:border-border/30 group hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg relative flex-shrink-0`}
                    >
                      <div className={`absolute inset-0 rounded-xl blur-lg opacity-40 bg-gradient-to-br ${benefit.color}`} />
                      <Icon className="w-7 h-7 text-white relative z-10" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-display text-white dark:text-foreground mb-1">
                        {benefit.title} <span className="text-primary">{benefit.subtitle}</span>
                      </h3>
                      <p className="text-sm text-white/60 dark:text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Full Width */}
          <div className="lg:col-span-12 glass-card-premium p-8 rounded-3xl bg-white/5 dark:bg-card/60 border border-white/10 dark:border-border/30 group hover:-translate-y-1 transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div 
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${benefits[3].color} flex items-center justify-center shadow-xl relative flex-shrink-0`}
              >
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-50 bg-gradient-to-br ${benefits[3].color}`} />
                <TrendingUp className="w-10 h-10 text-white relative z-10" />
              </div>
              <div className="text-center lg:text-left flex-1">
                <h3 className="text-2xl lg:text-3xl font-bold font-display text-white dark:text-foreground mb-2">
                  {benefits[3].title} <span className="text-primary">{benefits[3].subtitle}</span>
                </h3>
                <p className="text-white/70 dark:text-muted-foreground text-lg leading-relaxed max-w-2xl">
                  {benefits[3].description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Link to="/register">
                  <Button variant="hero" size="lg" className="group shadow-xl">
                    Start Earning Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Future Ready Section */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20" />
          <div className="absolute inset-0 backdrop-blur-xl" />
          
          <div className="relative p-8 lg:p-12 border border-primary/20 rounded-3xl">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="text-2xl lg:text-4xl font-bold font-display text-white dark:text-foreground">
                Future-Ready for the <span className="text-gradient-gold">AI Economy</span>
              </h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-white/80 dark:text-foreground/80 text-lg">
              <p className="leading-relaxed">
                The world is rapidly evolving with AI, automation, and Web 3.0 technologies reshaping 
                every industry. At Skill Learners, we're committed to preparing you for this future 
                with constantly updated curriculum.
              </p>
              <p className="leading-relaxed">
                From AI prompt engineering to blockchain basics, from e-commerce empires to viral 
                digital marketing—we equip you with skills that remain relevant and profitable for 
                decades to come.
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <Link to="/register">
                <Button variant="hero" size="lg" className="group shadow-xl px-10">
                  Join the Future
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