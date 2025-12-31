import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Gift, Users, Layers, PieChart, CheckSquare, ArrowDownRight, Zap, Crown, Sparkles, Smartphone, BookOpen, Star, TrendingUp, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { packages, incomeTypes, futureIncomeTypes } from "@/data/packages";

const incomeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Layers, PieChart, CheckSquare, ArrowDownRight, Zap, Crown, Smartphone, BookOpen
};

const PlansSection = () => {
  const [expandedIncome, setExpandedIncome] = useState<string | null>(null);

  return (
    <section id="plans" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      {/* Decorative elements */}
      <div className="parallax-bg">
        <div className="absolute top-20 left-[5%] w-40 h-40 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 right-[10%] w-60 h-60 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-20 left-[15%] w-48 h-48 rounded-full bg-electric/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Choose Your Path</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold font-display mb-4">
            Premium <span className="text-gradient-gold">Learning Tiers</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Unlock your potential with our expertly crafted packages. Each tier builds on the previous, giving you more value and skills.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald" />
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-primary" />
              <span>7 Income Streams</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span>1000+ Students</span>
            </div>
          </div>
        </div>

        {/* Plans - Mobile Horizontal Scroll */}
        <div className="lg:hidden mb-12">
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide px-2 -mx-2">
            {packages.map((plan, index) => (
              <div key={plan.name} className="snap-center flex-shrink-0 w-[85%] sm:w-[48%]">
                <PlanCard plan={plan} index={index} />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            ← Swipe to explore all tiers →
          </p>
        </div>

        {/* Plans - Desktop Masonry Grid */}
        <div className="hidden lg:grid grid-cols-12 gap-6 items-start mb-16">
          {/* First row - 3 cards */}
          <div className="col-span-3">
            <PlanCard plan={packages[0]} index={0} />
          </div>
          <div className="col-span-4">
            <PlanCard plan={packages[1]} index={1} />
          </div>
          <div className="col-span-5">
            <PlanCard plan={packages[2]} index={2} />
          </div>
          
          {/* Second row - 2 cards (popular larger) */}
          <div className="col-span-7">
            <PlanCard plan={packages[3]} index={3} />
          </div>
          <div className="col-span-5">
            <PlanCard plan={packages[4]} index={4} />
          </div>
        </div>

        {/* Income Opportunities Section */}
        <div className="glass-card-premium p-6 lg:p-10 rounded-3xl border border-border/30">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald/10 rounded-full mb-4">
              <Gift className="w-4 h-4 text-emerald" />
              <span className="text-sm font-medium text-emerald">Included in Every Tier</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold font-display mb-2">
              7 Ways to <span className="text-gradient-gold">Earn Income</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every package unlocks multiple income streams. Build passive income while you learn.
            </p>
          </div>
          
          {/* Income Types Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4">
            {incomeTypes.map((income) => {
              const IconComponent = incomeIcons[income.icon];
              const isExpanded = expandedIncome === income.name;
              
              return (
                <button 
                  key={income.name}
                  onClick={() => setExpandedIncome(isExpanded ? null : income.name)}
                  className={`text-center p-4 rounded-2xl transition-all duration-300 group relative ${
                    income.upcoming 
                      ? 'bg-muted/50 border border-dashed border-primary/30' 
                      : 'bg-card hover:bg-card/80 border border-border/50 hover:-translate-y-1 hover:shadow-lg'
                  } ${isExpanded ? 'ring-2 ring-primary shadow-lg' : ''}`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110 ${
                    income.upcoming 
                      ? 'bg-muted' 
                      : 'bg-gradient-to-br from-primary to-primary/80'
                  }`}>
                    {IconComponent && <IconComponent className={`w-5 h-5 ${income.upcoming ? 'text-muted-foreground' : 'text-primary-foreground'}`} />}
                  </div>
                  <h4 className="font-bold text-sm leading-tight mb-1">{income.name}</h4>
                  <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {income.description}
                  </p>
                  {income.upcoming && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                      Coming Soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Future Earnings */}
          <div className="mt-8 p-6 bg-gradient-to-r from-electric/5 via-accent/5 to-electric/5 rounded-2xl border border-electric/20">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-accent flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold font-display">Ecosystem Expansion</h4>
                  <p className="text-xs text-muted-foreground">More ways to earn coming soon</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-electric/20 text-electric rounded-full text-xs font-bold animate-pulse">
                COMING SOON
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {futureIncomeTypes.map((income) => {
                const IconComponent = incomeIcons[income.icon];
                return (
                  <div 
                    key={income.name}
                    className="flex items-center gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-xl border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      {IconComponent && <IconComponent className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{income.name}</p>
                      <p className="text-xs text-muted-foreground">{income.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ plan, index }: { plan: typeof packages[0]; index: number }) => {
  const Icon = plan.icon;
  const isPopular = plan.popular;
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  
  // Determine card height based on position
  const getCardStyle = () => {
    if (isPopular) return "min-h-[520px]";
    if (index === 2) return "min-h-[480px]";
    return "min-h-[440px]";
  };
  
  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col group ${getCardStyle()} ${
        isPopular 
          ? "neon-border bg-gradient-to-b from-card via-card to-primary/5 shadow-2xl" 
          : "glass-card hover:-translate-y-2 hover:shadow-xl"
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary via-primary to-amber-400 text-primary-foreground text-center py-2 text-sm font-bold tracking-wide">
          <Star className="w-4 h-4 inline mr-2" />
          MOST POPULAR CHOICE
          <Star className="w-4 h-4 inline ml-2" />
        </div>
      )}

      <div className={`p-6 flex flex-col flex-1 ${isPopular ? 'pt-12' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}
               style={{ boxShadow: `0 8px 24px ${plan.glowColor}50` }}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-muted/80 text-muted-foreground font-medium">
            {plan.level}
          </span>
        </div>

        {/* Name & Tagline */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-tier tracking-wider" style={{ color: plan.glowColor }}>
              {plan.name}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
              {plan.nickname}
            </span>
          </div>
          <p className="text-sm text-accent font-medium">{plan.tagline}</p>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {plan.shortDesc}
        </p>

        {/* Pricing */}
        <div className="mb-4 p-4 rounded-xl bg-muted/30 border border-border/50">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold font-display">₹{plan.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block px-2 py-0.5 rounded bg-emerald/20 text-emerald text-xs font-bold">
              SAVE {Math.round((1 - plan.price / plan.mrp) * 100)}%
            </span>
            {plan.period === "lifetime" && (
              <span className="text-xs text-muted-foreground">Lifetime Access</span>
            )}
          </div>
        </div>

        {/* Included Packages */}
        {plan.includes.length > 0 && (
          <div className="mb-4 p-3 bg-primary/5 rounded-xl border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-xs text-primary font-bold">FREE BONUS: ₹{plan.savings.toLocaleString()}+ value</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Includes: {plan.includes.join(" + ")}
            </p>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-2 mb-4 flex-1">
          {plan.features.slice(0, showAllFeatures ? undefined : 5).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-emerald mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
          {plan.features.length > 5 && !showAllFeatures && (
            <button 
              onClick={() => setShowAllFeatures(true)}
              className="text-xs text-primary hover:text-primary/80 font-medium pl-6 transition-colors"
            >
              +{plan.features.length - 5} more features →
            </button>
          )}
        </ul>

        {/* CTA */}
        <Link to={`/register?plan=${plan.name}`} className="block mt-auto">
          <Button
            variant={isPopular ? "hero" : "outline"}
            className={`w-full h-12 text-base font-semibold ${isPopular ? 'shadow-lg' : 'hover:bg-primary hover:text-primary-foreground'}`}
          >
            Get {plan.displayName}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlansSection;
