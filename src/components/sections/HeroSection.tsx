import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroStudent from "@/assets/hero-student.png";
import ParticleBackground from "@/components/ui/ParticleBackground";

const HeroSection = () => {
  const highlights = [
    "10+ Skill-based Video Courses",
    "7+ Income Opportunities",
    "Earn 10%–30% per Referral",
    "Lifetime Community Access",
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background - Medium navy instead of pitch black */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(220,40%,15%)] via-[hsl(220,35%,20%)] to-[hsl(220,40%,18%)] dark:from-[hsl(220,35%,8%)] dark:via-[hsl(220,30%,12%)] dark:to-[hsl(220,35%,10%)]" />
      <ParticleBackground />
      <div className="absolute inset-0 bg-mesh-gradient opacity-60" />
      
      {/* Floating geometric shapes with glow */}
      <div className="absolute top-1/4 left-10 w-24 h-24 rounded-full bg-primary/30 blur-2xl float-animation animate-pulse" />
      <div className="absolute top-1/3 right-20 w-36 h-36 rounded-full bg-accent/20 blur-3xl float-animation-delayed" />
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 rounded-2xl bg-emerald/20 blur-2xl float-animation-slow rotate-45" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-primary/25 blur-xl float-animation" />
      
      <div className="container relative mx-auto px-4 py-12 lg:py-20 z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Transform Your Future Today
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight font-display">
              Welcome to{" "}
              <span className="text-gradient-gold">Skill</span>{" "}
              <span className="text-gradient-teal">Learners</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Unlock your potential to <strong className="text-foreground">Learn</strong>, <strong className="text-foreground">Earn</strong>, and{" "}
              <strong className="text-foreground">Build Your Path</strong> to Financial Freedom with premium courses and mentorship.
            </p>
            
            <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
              {highlights.map((item, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-3 text-foreground/80"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/register">
                <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                  Start Learning Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto group">
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust badges */}
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <strong className="text-foreground">10,000+</strong> Active Students
                </span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in-right" style={{ animationDelay: "0.3s" }}>
            {/* Glow effect behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-emerald/30 blur-3xl" />
            </div>
            
            {/* Main image */}
            <div className="relative">
              <img
                src={heroStudent}
                alt="Student achieving success with Skill Learners"
                className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto drop-shadow-2xl"
              />
              
              {/* Floating elements */}
              <div className="absolute top-10 -left-10 glass-card p-4 rounded-2xl shadow-elevated float-animation z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Course Completed</p>
                    <p className="font-bold text-foreground">Digital Marketing</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-20 -right-5 glass-card p-4 rounded-2xl shadow-elevated float-animation-delayed z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-teal flex items-center justify-center">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Earnings This Month</p>
                    <p className="font-bold text-emerald">₹25,000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
