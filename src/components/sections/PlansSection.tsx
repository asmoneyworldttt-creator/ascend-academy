import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Gift, ChevronLeft, ChevronRight, Shield, Award, TrendingUp, Sparkles, Star, Crown } from "lucide-react";
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
    
    const cardWidth = 320;
    const gap = 20;
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
    const cardWidth = 320;
    const gap = 20;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index: number) => {
    if (!carouselRef.current) return;
    const cardWidth = 320;
    const gap = 20;
    carouselRef.current.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section id="plans" className="py-16 lg:py-28 relative overflow-hidden">
      {/* Premium Background with cohesive dark theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6 backdrop-blur-sm">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary tracking-wide">Choose Your Path</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4 leading-tight">
            Premium <span className="text-gradient-gold">Learning Packages</span>
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Invest in yourself with our expertly crafted packages. Each tier unlocks more value and income opportunities.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs lg:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-card/60 rounded-full border border-border/50 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-emerald" />
              <span className="text-foreground/80 font-medium">Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/60 rounded-full border border-border/50 backdrop-blur-sm">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-foreground/80 font-medium">7 Income Streams</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card/60 rounded-full border border-border/50 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-accent" />
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

          {/* Cards Carousel - Uniform cards */}
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
          
          <p className="text-center text-sm text-muted-foreground mt-4">
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
  const Icon = plan.icon;
  const isPopular = plan.popular;
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  
  return (
    <div
      className="snap-center flex-shrink-0 w-[300px] lg:w-[320px]"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div
        className={`relative rounded-2xl overflow-hidden transition-all duration-400 h-[520px] flex flex-col group ${
          isPopular 
            ? "bg-gradient-to-b from-card via-card to-primary/5 shadow-xl ring-2 ring-primary/40" 
            : "bg-card/80 backdrop-blur-sm border border-border/50 hover:-translate-y-2 hover:shadow-xl hover:border-primary/30"
        }`}
      >
        {/* Popular badge */}
        {isPopular && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary via-amber-400 to-primary text-primary-foreground text-center py-2 text-xs font-bold tracking-wider">
            <Star className="w-3 h-3 inline mr-1" />
            MOST POPULAR
          </div>
        )}

        <div className={`p-6 flex flex-col flex-1 ${isPopular ? 'pt-12' : ''}`}>
          {/* Header with Icon */}
          <div className="flex items-start justify-between mb-4">
            <div 
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-all duration-400`}
            >
              <Icon className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full bg-muted/80 text-muted-foreground font-semibold">
              {plan.level}
            </span>
          </div>

          {/* Name & Tagline */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-tier tracking-wider text-foreground">
                {plan.name}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium border border-primary/20">
                {plan.nickname}
              </span>
            </div>
            <p className="text-sm text-accent font-medium">{plan.tagline}</p>
          </div>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
            {plan.shortDesc}
          </p>

          {/* Pricing */}
          <div className="mb-4 p-4 rounded-xl bg-muted/50 border border-border/50">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold font-display">₹{plan.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded-md bg-emerald/20 text-emerald text-xs font-bold">
                SAVE {Math.round((1 - plan.price / plan.mrp) * 100)}%
              </span>
              {plan.period === "lifetime" && (
                <span className="text-xs text-muted-foreground font-medium">Lifetime</span>
              )}
            </div>
          </div>

          {/* Included Packages */}
          {plan.includes.length > 0 && (
            <div className="mb-4 p-3 bg-primary/5 rounded-xl border border-primary/20">
              <div className="flex items-center gap-1.5 mb-1">
                <Gift className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary font-bold">INCLUDES ₹{plan.savings.toLocaleString()} VALUE</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {plan.includes.join(" + ")}
              </p>
            </div>
          )}

          {/* Features */}
          <ul className="space-y-2 mb-4 flex-1">
            {plan.features.slice(0, showAllFeatures ? undefined : 4).map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <div className="w-5 h-5 rounded-full bg-emerald/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald" />
                </div>
                <span className="text-foreground/80 leading-relaxed line-clamp-1">{feature}</span>
              </li>
            ))}
            {plan.features.length > 4 && !showAllFeatures && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllFeatures(true);
                }}
                className="text-xs text-primary hover:text-primary/80 font-semibold pl-7 transition-colors"
              >
                +{plan.features.length - 4} more features →
              </button>
            )}
          </ul>

          {/* CTA */}
          <Link to={`/register?plan=${plan.name}`} className="block mt-auto">
            <Button
              variant={isPopular ? "hero" : "outline"}
              className={`w-full h-12 text-sm font-semibold ${isPopular ? 'shadow-lg' : 'hover:bg-primary hover:text-primary-foreground border-primary/30'}`}
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
    <div className="mt-20 lg:mt-28">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald/10 rounded-full border border-emerald/20 mb-4 backdrop-blur-sm">
          <Gift className="w-4 h-4 text-emerald" />
          <span className="text-sm font-semibold text-emerald tracking-wide">Included in Every Package</span>
        </div>
        <h3 className="text-2xl lg:text-4xl font-bold font-display mb-4">
          7 Ways to <span className="text-gradient-gold">Earn Income</span>
        </h3>
        <p className="text-base lg:text-lg text-muted-foreground max-w-xl mx-auto">
          Every package unlocks multiple income streams. Build wealth while you learn.
        </p>
      </div>

      {/* Income Cards - Premium Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
        {incomeTypes.slice(0, 6).map((income) => {
          const Icon = income.icon;
          const isExpanded = expandedIncome === income.name;
          
          return (
            <button
              key={income.name}
              onClick={() => setExpandedIncome(isExpanded ? null : income.name)}
              className={`text-left p-4 lg:p-5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                income.upcoming 
                  ? 'bg-muted/30 border border-dashed border-primary/30' 
                  : 'bg-card/80 border border-border/50 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30'
              } ${isExpanded ? 'ring-2 ring-primary' : ''}`}
            >
              <div className="relative z-10">
                <div 
                  className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${income.iconColor} flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-sm lg:text-base font-bold font-display mb-1">{income.name}</h4>
                <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed line-clamp-2">{income.description}</p>
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
        {incomeTypes.slice(6).map((income) => {
          const Icon = income.icon;
          
          return (
            <button
              key={income.name}
              className="col-span-2 text-left p-5 rounded-xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 relative overflow-hidden group"
            >
              <div className="flex items-center gap-4">
                <div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${income.iconColor} flex items-center justify-center shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold font-display">{income.name}</h4>
                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-bold animate-pulse">
                      COMING SOON
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{income.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Future Income Teaser */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          More income opportunities coming soon: {futureIncomeTypes.map(i => i.name).join(" • ")}
        </p>
      </div>
    </div>
  );
};

export default PlansSection;
