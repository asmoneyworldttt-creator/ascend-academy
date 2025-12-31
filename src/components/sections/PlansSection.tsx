import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Gift, ChevronLeft, ChevronRight, Shield, Award, TrendingUp, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { packages, incomeTypes, futureIncomeTypes } from "@/data/packages";

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
    
    const cardWidth = 340;
    const gap = 24;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setCurrentIndex(Math.min(newIndex, packages.length - 1));
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateScrollState);
    updateScrollState();
    return () => container.removeEventListener("scroll", updateScrollState);
  }, []);

  const scrollTo = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = 340;
    const gap = 24;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = 340;
    const gap = 24;
    carouselRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section id="plans" className="py-24 lg:py-36 relative overflow-hidden">
      {/* Royal Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
      
      {/* Decorative Orbs */}
      <div className="parallax-bg">
        <div className="absolute top-1/4 left-[5%] w-72 h-72 rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute top-1/2 right-[5%] w-80 h-80 rounded-full bg-accent/6 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-electric/5 blur-[80px]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 rounded-full border border-primary/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">Choose Your Path</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold font-display mb-6 leading-tight">
            Premium <span className="text-gradient-gold">Learning Tiers</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Invest in yourself with our expertly crafted packages. Each tier unlocks more value, more skills, and more income opportunities.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-card/50 rounded-full border border-border/50 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-emerald" />
              <span className="text-foreground/80 font-medium">Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-card/50 rounded-full border border-border/50 backdrop-blur-sm">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-foreground/80 font-medium">7 Income Streams</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 bg-card/50 rounded-full border border-border/50 backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-accent" />
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
              className="absolute -left-4 lg:-left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 border border-border/50 shadow-elevated flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all z-20 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollTo("right")}
              className="absolute -right-4 lg:-right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 border border-border/50 shadow-elevated flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all z-20 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Cards Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide px-4 -mx-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {packages.map((plan, index) => (
              <PlanCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2.5 mt-6">
            {packages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-400 ${
                  index === currentIndex
                    ? "w-10 bg-primary shadow-glow-gold"
                    : "w-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-4">
            ← Swipe or use arrows to explore all tiers →
          </p>
        </div>

        {/* Income Opportunities Section */}
        <IncomeSection />
      </div>
    </section>
  );
};

const PlanCard = ({ plan, index }: { plan: typeof packages[0]; index: number }) => {
  const Icon = plan.icon;
  const isPopular = plan.popular;
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  
  return (
    <div
      className={`snap-center flex-shrink-0 w-[320px] lg:w-[340px] h-full`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={`relative rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col group ${
          isPopular 
            ? "bg-gradient-to-b from-card via-card to-primary/10 shadow-2xl ring-2 ring-primary/50" 
            : "glass-card-premium hover:-translate-y-2 hover:shadow-elevated"
        }`}
        style={isPopular ? { boxShadow: `0 0 60px ${plan.glowColor}30` } : undefined}
      >
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary via-amber-400 to-primary text-primary-foreground text-center py-2.5 text-sm font-bold tracking-wider">
            <Star className="w-4 h-4 inline mr-2 animate-pulse" />
            MOST POPULAR
            <Star className="w-4 h-4 inline ml-2 animate-pulse" />
          </div>
        )}

        <div className={`p-7 flex flex-col flex-1 ${isPopular ? 'pt-14' : ''}`}>
          {/* Header with Icon */}
          <div className="flex items-start justify-between mb-5">
            <div 
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-all duration-500 relative`}
              style={{ boxShadow: `0 8px 32px ${plan.glowColor}50` }}
            >
              {/* Icon Glow Effect */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-60 blur-xl animate-pulse"
                style={{ background: `linear-gradient(135deg, ${plan.glowColor}80, transparent)` }}
              />
              <Icon className="w-8 h-8 text-white relative z-10" />
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full bg-muted/80 text-muted-foreground font-semibold tracking-wide">
              {plan.level}
            </span>
          </div>

          {/* Name & Tagline */}
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-tier tracking-wider" style={{ color: plan.glowColor }}>
                {plan.name}
              </h3>
              <span className="text-xs px-2 py-1 rounded-lg bg-gradient-to-r from-muted to-muted/50 text-foreground/70 font-medium border border-border/30">
                {plan.nickname}
              </span>
            </div>
            <p className="text-sm text-accent font-semibold">{plan.tagline}</p>
          </div>

          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {plan.shortDesc}
          </p>

          {/* Pricing */}
          <div className="mb-5 p-5 rounded-2xl bg-muted/40 border border-border/30">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold font-display">₹{plan.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block px-3 py-1 rounded-lg bg-emerald/20 text-emerald text-xs font-bold">
                SAVE {Math.round((1 - plan.price / plan.mrp) * 100)}%
              </span>
              {plan.period === "lifetime" && (
                <span className="text-xs text-muted-foreground font-medium">Lifetime Access</span>
              )}
            </div>
          </div>

          {/* Included Packages */}
          {plan.includes.length > 0 && (
            <div className="mb-5 p-4 bg-primary/8 rounded-2xl border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-bold">BONUS VALUE: ₹{plan.savings.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Includes: {plan.includes.join(" + ")}
              </p>
            </div>
          )}

          {/* Features */}
          <ul className="space-y-2.5 mb-5 flex-1">
            {plan.features.slice(0, showAllFeatures ? undefined : 5).map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <div className="w-5 h-5 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald" />
                </div>
                <span className="text-foreground/80 leading-relaxed">{feature}</span>
              </li>
            ))}
            {plan.features.length > 5 && !showAllFeatures && (
              <button 
                onClick={() => setShowAllFeatures(true)}
                className="text-xs text-primary hover:text-primary/80 font-semibold pl-7 transition-colors"
              >
                +{plan.features.length - 5} more features →
              </button>
            )}
          </ul>

          {/* CTA */}
          <Link to={`/register?plan=${plan.name}`} className="block mt-auto">
            <Button
              variant={isPopular ? "hero" : "outline"}
              className={`w-full h-13 text-base font-semibold ${isPopular ? 'shadow-xl' : 'hover:bg-primary hover:text-primary-foreground'}`}
            >
              Get {plan.displayName}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const IncomeSection = () => {
  const [expandedIncome, setExpandedIncome] = useState<string | null>(null);

  return (
    <div className="mt-24 lg:mt-32">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald/10 rounded-full border border-emerald/20 mb-6 backdrop-blur-sm">
          <Gift className="w-4 h-4 text-emerald" />
          <span className="text-sm font-semibold text-emerald tracking-wide">Included in Every Tier</span>
        </div>
        <h3 className="text-3xl lg:text-5xl font-bold font-display mb-4">
          7 Ways to <span className="text-gradient-gold">Earn Income</span>
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Every package unlocks multiple income streams. Build wealth while you learn.
        </p>
      </div>

      {/* Income Cards - Royal Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Featured Large Cards - First 2 */}
        {incomeTypes.slice(0, 2).map((income) => {
          const Icon = income.icon;
          const isExpanded = expandedIncome === income.name;
          
          return (
            <button
              key={income.name}
              onClick={() => setExpandedIncome(isExpanded ? null : income.name)}
              className={`lg:col-span-2 text-left p-6 rounded-3xl transition-all duration-500 group relative overflow-hidden ${
                income.upcoming 
                  ? 'bg-muted/40 border-2 border-dashed border-primary/30' 
                  : 'glass-card-premium hover:-translate-y-2 hover:shadow-elevated'
              } ${isExpanded ? 'ring-2 ring-primary shadow-glow-gold' : ''}`}
            >
              {/* Background Glow */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${income.iconColor}`}
              />
              
              <div className="relative z-10 flex items-start gap-5">
                <div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${income.iconColor} flex items-center justify-center shadow-xl relative`}
                >
                  {/* Icon Glow */}
                  <div className={`absolute inset-0 rounded-2xl blur-xl opacity-60 bg-gradient-to-br ${income.iconColor}`} />
                  <Icon className="w-8 h-8 text-white relative z-10" />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-bold font-display mb-2">{income.name}</h4>
                  <p className="text-muted-foreground text-sm mb-3">{income.description}</p>
                  {isExpanded && (
                    <p className="text-sm text-foreground/70 animate-fade-in">{income.details}</p>
                  )}
                </div>
              </div>
              
              {income.upcoming && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-primary/15 text-primary text-xs rounded-full font-semibold">
                  Coming Soon
                </span>
              )}
            </button>
          );
        })}

        {/* Medium Cards - Next 4 */}
        {incomeTypes.slice(2, 6).map((income) => {
          const Icon = income.icon;
          const isExpanded = expandedIncome === income.name;
          
          return (
            <button
              key={income.name}
              onClick={() => setExpandedIncome(isExpanded ? null : income.name)}
              className={`text-left p-5 rounded-2xl transition-all duration-500 group relative overflow-hidden ${
                income.upcoming 
                  ? 'bg-muted/40 border-2 border-dashed border-primary/30' 
                  : 'glass-card-premium hover:-translate-y-2 hover:shadow-elevated'
              } ${isExpanded ? 'ring-2 ring-primary shadow-glow-gold' : ''}`}
            >
              {/* Background Glow */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 bg-gradient-to-br ${income.iconColor}`}
              />
              
              <div className="relative z-10">
                <div 
                  className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${income.iconColor} flex items-center justify-center shadow-lg relative`}
                >
                  {/* Icon Glow */}
                  <div className={`absolute inset-0 rounded-xl blur-lg opacity-50 bg-gradient-to-br ${income.iconColor}`} />
                  <Icon className="w-6 h-6 text-white relative z-10" />
                </div>
                
                <h4 className="text-lg font-bold font-display mb-1.5">{income.name}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{income.description}</p>
                {isExpanded && (
                  <p className="text-xs text-foreground/70 mt-3 animate-fade-in">{income.details}</p>
                )}
              </div>
            </button>
          );
        })}

        {/* Last Card - Royal Bonus */}
        {incomeTypes.slice(6).map((income) => {
          const Icon = income.icon;
          
          return (
            <button
              key={income.name}
              className="lg:col-span-4 text-left p-6 rounded-3xl transition-all duration-500 group relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 hover:border-primary/40"
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
                <div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${income.iconColor} flex items-center justify-center shadow-xl relative`}
                >
                  <div className={`absolute inset-0 rounded-2xl blur-xl opacity-60 bg-gradient-to-br ${income.iconColor} animate-pulse`} />
                  <Icon className="w-8 h-8 text-white relative z-10" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h4 className="text-xl font-bold font-display">{income.name}</h4>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-bold animate-pulse">
                      COMING SOON
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{income.details}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Future Earnings Teaser */}
      <div className="p-6 lg:p-8 rounded-3xl bg-gradient-to-r from-electric/10 via-accent/5 to-electric/10 border border-electric/20">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric to-accent flex items-center justify-center shadow-lg relative">
              <div className="absolute inset-0 rounded-xl blur-lg opacity-50 bg-gradient-to-br from-electric to-accent" />
              <TrendingUp className="w-6 h-6 text-white relative z-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold font-display">Ecosystem Expansion</h4>
              <p className="text-sm text-muted-foreground">More ways to earn coming soon</p>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-electric/20 text-electric rounded-full text-xs font-bold animate-pulse">
            ROADMAP 2024
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {futureIncomeTypes.map((income) => (
            <div 
              key={income.name}
              className="flex items-center gap-4 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/30"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-lg">📱</span>
              </div>
              <div>
                <p className="font-semibold text-sm">{income.name}</p>
                <p className="text-xs text-muted-foreground">{income.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansSection;