import { ArrowRight, CheckCircle2, Sparkles, Target, GraduationCap, Wallet, Rocket, Users } from "lucide-react";
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
    color: "from-blue-500 to-cyan-500",
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
    color: "from-emerald-500 to-teal-500",
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
    color: "from-amber-500 to-orange-500",
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
    color: "from-violet-500 to-purple-500",
  },
];

const UserJourneySection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden transition-colors duration-500">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-muted/20 transition-colors duration-500" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl transition-colors duration-500" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald/5 rounded-full blur-3xl transition-colors duration-500" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-sm font-medium text-accent mb-6">
            <Sparkles className="w-4 h-4" />
            Your Success Blueprint
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Your <span className="text-gradient-teal">Journey</span> to Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow our proven 4-step path from beginner to financially independent professional. 
            Each step builds on the previous, creating a solid foundation for lasting success.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-emerald-500 via-amber-500 to-violet-500 opacity-20" />
            
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <div 
                  key={step.step}
                  className={`relative flex items-center gap-12 mb-20 last:mb-0 ${isLeft ? '' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className={`inline-block glass-card p-8 rounded-2xl transition-all duration-500 ${isLeft ? 'ml-auto' : 'mr-auto'}`}>
                      <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white text-xs font-bold mb-4`}>
                        Step {step.step}
                      </span>
                      <h3 className="text-2xl font-bold font-display mb-1">{step.title}</h3>
                      <p className="text-primary font-medium mb-3">{step.subtitle}</p>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      
                      <ul className={`space-y-2 ${isLeft ? 'text-right' : 'text-left'}`}>
                        {step.highlights.map((highlight, i) => (
                          <li key={i} className={`flex items-center gap-2 text-sm text-foreground/80 ${isLeft ? 'justify-end' : ''}`}>
                            {isLeft && <span>{highlight}</span>}
                            <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                            {!isLeft && <span>{highlight}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="relative z-10 shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    {index < journeySteps.length - 1 && (
                      <ArrowRight className="absolute -bottom-14 left-1/2 -translate-x-1/2 rotate-90 w-6 h-6 text-muted-foreground/50" />
                    )}
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </div>
              );
            })}
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-emerald-500 via-amber-500 to-violet-500 opacity-30" />
            
            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div key={step.step} className="relative pl-20">
                  {/* Node */}
                  <div className="absolute left-0 top-0">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="glass-card p-6 rounded-2xl transition-all duration-500">
                    <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white text-xs font-bold mb-3`}>
                      Step {step.step}
                    </span>
                    <h3 className="text-xl font-bold font-display mb-1">{step.title}</h3>
                    <p className="text-primary text-sm font-medium mb-2">{step.subtitle}</p>
                    <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                    
                    <ul className="space-y-2">
                      {step.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="glass-card p-8 rounded-3xl max-w-3xl mx-auto transition-all duration-500">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Join 10,000+ learners who started their journey</span>
            </div>
            <h3 className="text-2xl font-bold font-display mb-4">
              Ready to Transform Your Future?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              By mastering these skills, you can take on freelance projects, build passive income streams, 
              and position yourself for career growth. We provide extra earning opportunities and future business prospects.
            </p>
            <Link to="/register">
              <Button variant="hero" size="lg" className="group">
                Start Your Journey Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserJourneySection;
