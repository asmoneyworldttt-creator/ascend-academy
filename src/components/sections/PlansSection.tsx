import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Gift, ChevronLeft, ChevronRight, Shield, Award, TrendingUp, Crown, Sparkles, Compass, Flame, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { packages, incomeTypes } from "@/data/packages";

// New tier naming with brand-aligned icons and gradients
const tierConfig: Record<string, { 
  name: string; 
  tagline: string; 
  icon: React.ElementType;
  gradient: string;
  bgGradient: string;
}> = {
  bronze: { 
    name: "Explorer", 
    tagline: "The Foundation",
    icon: Compass,
    gradient: "from-amber-600 via-orange-500 to-amber-700",
    bgGradient: "from-amber-500/20 to-orange-500/10"
  },
  silver: { 
    name: "Catalyst", 
    tagline: "The Accelerator",
    icon: Flame,
    gradient: "from-slate-400 via-zinc-300 to-slate-500",
    bgGradient: "from-slate-400/20 to-zinc-400/10"
  },
  gold: { 
    name: "Visionary", 
    tagline: "The Mastery",
    icon: Eye,
    gradient: "from-yellow-400 via-amber-400 to-yellow-500",
    bgGradient: "from-yellow-400/20 to-amber-400/10"
  },
  platinum: { 
    name: "Innovator", 
    tagline: "The Pioneer",
    icon: TrendingUp,
    gradient: "from-cyan-400 via-teal-400 to-cyan-500",
    bgGradient: "from-cyan-400/20 to-teal-400/10"
  },
  diamond: { 
    name: "Legend", 
    tagline: "The Elite",
    icon: Crown,
    gradient: "from-violet-400 via-purple-500 to-violet-600",
    bgGradient: "from-violet-400/20 to-purple-400/10"
  },
};

// Extended features for each plan tier
const extendedFeatures: Record<string, string[]> = {
  bronze: [
    "Access to foundational courses",
    "Basic community forum access",
    "Email support within 48 hours",
    "Downloadable course materials",
    "Progress tracking dashboard",
    "Certificate upon completion"
  ],
  silver: [
    "All Explorer tier benefits",
    "Advanced course library access",
    "Priority email support (24 hours)",
    "Live Q&A session access",
    "Exclusive member webinars",
    "Networking community access",
    "Monthly progress reports"
  ],
  gold: [
    "All Catalyst tier benefits",
    "Complete course catalog access",
    "1-on-1 mentor sessions (monthly)",
    "VIP community membership",
    "Early access to new courses",
    "Premium learning resources",
    "Job placement assistance",
    "Lifetime course updates"
  ],
  platinum: [
    "All Visionary tier benefits",
    "Unlimited mentor sessions",
    "Business coaching calls",
    "Exclusive mastermind group",
    "Revenue sharing opportunities",
    "Custom learning path design",
    "Priority feature requests",
    "Direct founder access"
  ],
  diamond: [
    "All Innovator tier benefits",
    "Elite inner circle access",
    "Personal success manager",
    "Profit-sharing program entry",
    "Exclusive investment opportunities",
    "VIP event invitations",
    "Brand ambassador program",
    "Legacy membership benefits"
  ],
};

const PlansSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    
    // Dynamic card width based on screen size
    const cardWidth = window.innerWidth < 768 ? window.innerWidth - 48 : 340;
    const gap = 20;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.min(newIndex, packages.length - 1));
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollState);
    updateScrollState();
    
    window.addEventListener("resize", updateScrollState);
    return () => {
      container.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scrollTo = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = window.innerWidth < 768 ? window.innerWidth - 48 : 340;
    const gap = 20;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = window.innerWidth < 768 ? window.innerWidth - 48 : 340;
    const gap = 20;
    carouselRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section id="plans" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-5 backdrop-blur-sm">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">Choose Your Path</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Premium <span className="text-gradient-gold">Learning Packages</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Invest in yourself with our expertly crafted packages. Each tier unlocks more value and income opportunities.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs lg:text-sm">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-card/60 rounded-full border border-border/50 backdrop-blur-sm">
              <Shield className="w-3.5 h-3.5 text-emerald" />
              <span className="text-foreground/80 font-medium">Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-card/60 rounded-full border border-border/50 backdrop-blur-sm">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span className="text-foreground/80 font-medium">7 Income Streams</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-card/60 rounded-full border border-border/50 backdrop-blur-sm">
              <TrendingUp className="w-3.5 h-3.5 text-accent" />
              <span className="text-foreground/80 font-medium">1000+ Students</span>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {canScrollLeft && (
            <button
              onClick={() => scrollTo("left")}
              className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 border border-border/50 shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all z-20 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollTo("right")}
              className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 border border-border/50 shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all z-20 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Cards Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide px-2 -mx-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {packages.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {packages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-10 bg-primary shadow-glow-gold"
                    : "w-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
          
          <p className="text-center text-xs text-muted-foreground mt-4">
            ← Swipe to explore all packages →
          </p>
        </div>

        {/* Income Opportunities Section */}
        <IncomeSection />
      </div>
    </section>
  );
};

const PlanCard = ({ plan, index }: { plan: typeof packages[0]; index: number }) => {
  const isPopular = plan.popular;
  const [showDetails, setShowDetails] = useState(false);
  const tier = tierConfig[plan.theme || 'bronze'];
  const TierIcon = tier.icon;
  const features = extendedFeatures[plan.theme || 'bronze'] || plan.features;
  
  return (
    <>
      <div
        className="snap-center flex-shrink-0 w-[calc(100vw-48px)] md:w-[340px]"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div
          className={`relative rounded-3xl overflow-hidden transition-all duration-400 h-[520px] flex flex-col group ${
            isPopular 
              ? 'bg-gradient-to-b from-card to-card border-2 border-primary shadow-2xl shadow-primary/20' 
              : 'bg-card border border-border/60 hover:border-primary/40'
          } hover:-translate-y-2 hover:shadow-xl`}
        >
          {/* Popular Badge */}
          {isPopular && (
            <div className="absolute top-0 left-0 right-0 z-20">
              <div className="bg-gradient-to-r from-primary via-gold-light to-primary text-primary-foreground text-xs font-bold tracking-wider py-2 text-center flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                MOST POPULAR
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* Header Gradient */}
          <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${tier.bgGradient} opacity-60`} />

          <div className={`relative p-6 flex flex-col flex-1 ${isPopular ? 'pt-12' : 'pt-6'}`}>
            {/* Tier Icon & Name */}
            <div className="flex items-center gap-4 mb-4">
              <div 
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-400`}
              >
                <TierIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-wide text-foreground">
                  {tier.name}
                </h3>
                <p className="text-xs text-muted-foreground font-medium">{tier.tagline}</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-5 p-4 rounded-2xl bg-muted/40 border border-border/50 backdrop-blur-sm">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-foreground">₹{plan.price.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald/15 text-emerald text-xs font-bold">
                  SAVE {Math.round((1 - plan.price / plan.mrp) * 100)}%
                </span>
                {plan.period === "lifetime" && (
                  <span className="text-xs text-muted-foreground font-medium">Lifetime Access</span>
                )}
              </div>
            </div>

            {/* Included Packages Bonus */}
            {plan.includes.length > 0 && (
              <div className="mb-4 p-3 bg-primary/10 rounded-xl border border-primary/25">
                <div className="flex items-center gap-2 mb-1">
                  <Gift className="w-4 h-4 text-primary" />
                  <span className="text-xs text-primary font-bold">BONUS: ₹{plan.savings.toLocaleString()} VALUE</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {plan.includes.join(" + ")}
                </p>
              </div>
            )}

            {/* Features Preview */}
            <ul className="space-y-2 mb-4 flex-1">
              {features.slice(0, 4).map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald" />
                  </div>
                  <span className="text-muted-foreground leading-relaxed">{feature}</span>
                </li>
              ))}
              {features.length > 4 && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(true);
                  }}
                  className="text-xs text-primary hover:text-primary/80 font-semibold pl-8 transition-colors"
                >
                  +{features.length - 4} more features →
                </button>
              )}
            </ul>

            {/* CTA */}
            <Link to={`/register?plan=${plan.name}`} className="block mt-auto">
              <Button
                variant={isPopular ? "hero" : "outline"}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-md p-0 border-0 overflow-hidden mx-4 max-h-[85vh] overflow-y-auto">
          <div className={`p-6 bg-gradient-to-br ${tier.gradient}`}>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <TierIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="text-sm text-white/80">{tier.tagline}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-card max-h-[50vh] overflow-y-auto">
            <h4 className="text-base font-bold text-foreground mb-4">All Features Included:</h4>
            <ul className="space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-emerald" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            {plan.includes.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/25">
                <h4 className="text-sm font-bold text-foreground mb-2">Bonus Packages:</h4>
                <p className="text-sm text-muted-foreground">{plan.includes.join(", ")}</p>
                <p className="text-xs text-primary mt-2 font-semibold">Total Value: ₹{plan.savings.toLocaleString()}</p>
              </div>
            )}
            
            <Link to={`/register?plan=${plan.name}`} className="block mt-6">
              <Button variant="hero" className="w-full h-12 text-base">
                Enroll Now - ₹{plan.price.toLocaleString()}
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const IncomeSection = () => {
  const [expandedIncome, setExpandedIncome] = useState<string | null>(null);

  return (
    <div className="mt-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald/10 rounded-full border border-emerald/20 mb-4 backdrop-blur-sm">
          <Gift className="w-4 h-4 text-emerald" />
          <span className="text-sm font-semibold text-emerald tracking-wide">Included in Every Package</span>
        </div>
        <h3 className="text-2xl lg:text-4xl font-bold font-display mb-3">
          7 Ways to <span className="text-gradient-gold">Earn Income</span>
        </h3>
        <p className="text-base text-muted-foreground max-w-xl mx-auto">
          Every package unlocks multiple income streams. Build wealth while you learn.
        </p>
      </div>

      {/* Income Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {incomeTypes.slice(0, 6).map((income) => {
          const Icon = income.icon;
          const isExpanded = expandedIncome === income.name;
          
          return (
            <button
              key={income.name}
              onClick={() => setExpandedIncome(isExpanded ? null : income.name)}
              className={`text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                income.upcoming 
                  ? 'bg-muted/30 border border-dashed border-primary/30' 
                  : 'bg-card/80 border border-border/50 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30'
              } ${isExpanded ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="relative z-10">
                <div 
                  className={`w-10 h-10 mb-3 rounded-xl bg-gradient-to-br ${income.iconColor} flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                
                <h4 className="text-sm font-bold font-display mb-1">{income.name}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{income.description}</p>
                {isExpanded && (
                  <p className="text-xs text-foreground/70 mt-2 animate-fade-in">{income.details}</p>
                )}
              </div>
              
              {income.upcoming && (
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-primary/15 text-primary text-[10px] rounded-full font-semibold">
                  Soon
                </span>
              )}
            </button>
          );
        })}
        
        {/* Royal Bonus Card */}
        <div className="col-span-2 p-5 rounded-xl bg-gradient-to-br from-primary/15 via-accent/10 to-primary/15 border border-primary/25 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground">Royal Bonus</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Special reward pool, Yearly royalty, and coming soon: SL Crypto Coin rewards & more!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansSection;