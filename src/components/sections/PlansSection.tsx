import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Gift, Users, Layers, PieChart, CheckSquare, ArrowDownRight, Zap, Crown, Sparkles, Smartphone, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { packages, incomeTypes, futureIncomeTypes } from "@/data/packages";

const incomeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Users, Layers, PieChart, CheckSquare, ArrowDownRight, Zap, Crown, Smartphone, BookOpen
};

const PlansSection = () => {
  const [expandedIncome, setExpandedIncome] = useState<string | null>(null);

  return (
    <section id="plans" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background with parallax elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      {/* Decorative geometric shapes */}
      <div className="parallax-bg">
        <div className="absolute top-20 left-[10%] w-32 h-32 border border-primary/20 rotate-45 parallax-element" />
        <div className="absolute top-40 right-[15%] w-24 h-24 rounded-full bg-accent/5 blur-xl parallax-element" />
        <div className="absolute bottom-32 left-[20%] w-40 h-40 rounded-full bg-primary/5 blur-2xl parallax-element" />
        <div className="absolute top-1/2 right-[10%] w-20 h-20 border border-accent/10 rotate-12 parallax-element" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Choose Your <span className="text-gradient-gold">Learning Path</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Elevate your journey with our elite tier system. Higher tiers include all previous packages for FREE!
          </p>
          
          {/* Income Types Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20">
            <Gift className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Every tier unlocks 7 Income Streams!</span>
          </div>
        </div>

        {/* Plans Grid - Horizontal scroll on mobile */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2">
            {packages.map((plan, index) => (
              <div key={plan.name} className="snap-center flex-shrink-0 w-[85%] sm:w-[48%]">
                <PlanCard plan={plan} index={index} />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            ← Swipe to see all tiers →
          </p>
        </div>

        {/* Plans Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-5">
          {packages.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Income Opportunities Section */}
        <div className="mt-16 glass-card-premium p-6 lg:p-8 rounded-3xl border border-border/30">
          <div className="text-center mb-6 lg:mb-8">
            <h3 className="text-xl lg:text-2xl font-bold font-display mb-2">
              <Sparkles className="w-5 h-5 inline mr-2 text-primary" />
              7 Income Streams Unlocked
              <Sparkles className="w-5 h-5 inline ml-2 text-primary" />
            </h3>
            <p className="text-muted-foreground text-sm lg:text-base">
              Click on any income type to learn more
            </p>
          </div>
          
          {/* Income Types Grid - Interactive Accordion */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 lg:gap-4">
            {incomeTypes.map((income) => {
              const IconComponent = incomeIcons[income.icon];
              const isExpanded = expandedIncome === income.name;
              
              return (
                <button 
                  key={income.name}
                  onClick={() => setExpandedIncome(isExpanded ? null : income.name)}
                  className={`text-center p-4 glass-card rounded-2xl transition-all duration-300 group relative ${
                    income.upcoming ? 'opacity-70 border border-dashed border-primary/30' : 'hover:-translate-y-1'
                  } ${isExpanded ? 'ring-2 ring-primary shadow-glow-gold' : ''}`}
                >
                  <div className={`w-10 h-10 mx-auto mb-2 rounded-xl ${
                    income.upcoming 
                      ? 'bg-gradient-to-br from-primary/20 to-gold-dark/20' 
                      : 'bg-gradient-to-br from-primary to-gold-dark'
                  } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    {IconComponent && <IconComponent className={`w-5 h-5 ${income.upcoming ? 'text-primary/50' : 'text-primary-foreground'}`} />}
                  </div>
                  <h4 className="font-bold text-xs lg:text-sm leading-tight">{income.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity">
                    {income.description}
                  </p>
                  {income.upcoming && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">Soon</span>
                  )}
                  
                  {/* Expanded details */}
                  {isExpanded && income.details && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-card border border-border rounded-xl shadow-elevated z-10 text-left">
                      <p className="text-xs text-foreground">{income.details}</p>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Future-Ready Earnings Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-electric/5 via-accent/5 to-electric/5 rounded-2xl border border-electric/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-electric flex items-center justify-center shadow-glow-electric">
                <Zap className="w-5 h-5 text-background" />
              </div>
              <div>
                <h4 className="font-bold font-display text-sm lg:text-base">Ecosystem Expansion</h4>
                <p className="text-xs text-muted-foreground">Future-Ready Earning Methods</p>
              </div>
              <span className="ml-auto px-3 py-1 bg-electric/20 text-electric rounded-full text-xs font-bold animate-pulse">
                COMING SOON
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {futureIncomeTypes.map((income) => {
                const IconComponent = incomeIcons[income.icon];
                return (
                  <div 
                    key={income.name}
                    className="flex items-center gap-3 p-3 bg-card/50 backdrop-blur-sm rounded-xl border border-border/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
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
          
          <p className="text-center text-xs text-muted-foreground mt-6 opacity-70">
            * More innovative income streams will be added as our ecosystem grows!
          </p>
        </div>

        {/* Comparison Table - Desktop */}
        <div className="mt-12 hidden lg:block">
          <div className="glass-card-premium rounded-3xl p-6 overflow-hidden border border-border/30">
            <h3 className="text-xl font-bold font-display text-center mb-6">Tier Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">What's Included</th>
                    {packages.map(p => (
                      <th key={p.name} className="text-center py-3 px-2">
                        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-br ${p.color} text-white font-tier`}>
                          {p.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Editing Assets (100GB+)</td>
                    {packages.map((p, i) => (
                      <td key={p.name} className="text-center">
                        <Check className="w-5 h-5 text-emerald mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Social Media Courses</td>
                    {packages.map((p, i) => (
                      <td key={p.name} className="text-center">
                        {i >= 1 ? <Check className="w-5 h-5 text-emerald mx-auto" /> : <span className="text-muted-foreground">-</span>}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Business & E-commerce</td>
                    {packages.map((p, i) => (
                      <td key={p.name} className="text-center">
                        {i >= 2 ? <Check className="w-5 h-5 text-emerald mx-auto" /> : <span className="text-muted-foreground">-</span>}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Digital Marketing Pro</td>
                    {packages.map((p, i) => (
                      <td key={p.name} className="text-center">
                        {i >= 3 ? <Check className="w-5 h-5 text-emerald mx-auto" /> : <span className="text-muted-foreground">-</span>}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 px-4">Financial Trading</td>
                    {packages.map((p, i) => (
                      <td key={p.name} className="text-center">
                        {i >= 4 ? <Check className="w-5 h-5 text-emerald mx-auto" /> : <span className="text-muted-foreground">-</span>}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold">7 Income Streams</td>
                    {packages.map(p => (
                      <td key={p.name} className="text-center">
                        <Check className="w-5 h-5 text-emerald mx-auto" />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
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
  
  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col ${
        isPopular 
          ? "neon-border glass-card-premium scale-[1.02] lg:scale-105 shadow-glow-gold" 
          : "glass-card hover:-translate-y-2"
      }`}
      style={{ 
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* Popular ribbon */}
      {isPopular && (
        <div className="absolute -right-12 top-6 rotate-45 px-12 py-1 bg-gradient-gold text-sm font-bold text-primary-foreground z-10">
          BEST VALUE
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}
             style={{ boxShadow: `0 8px 24px ${plan.glowColor}40` }}>
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-tier tracking-wider" style={{ color: plan.glowColor }}>{plan.name}</h3>
        </div>
        <p className="text-xs text-accent mb-1">{plan.tagline}</p>
        <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground w-fit mb-2">
          {plan.level}
        </span>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
          {plan.shortDesc}
        </p>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display">₹{plan.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            <span className="inline-block px-2 py-0.5 rounded bg-emerald/10 text-emerald text-xs font-medium">
              Save {Math.round((1 - plan.price / plan.mrp) * 100)}%
            </span>
          </div>
        </div>

        {/* Included Packages */}
        {plan.includes.length > 0 && (
          <div className="mb-3 p-2 bg-primary/5 rounded-xl border border-primary/20">
            <p className="text-xs text-primary font-medium mb-1">✨ FREE: ₹{plan.savings.toLocaleString()}+ value</p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              Includes: {plan.includes.join(", ")}
            </p>
          </div>
        )}

        {/* Features */}
        <ul className="space-y-1.5 mb-4 flex-1">
          {plan.features.slice(0, 4).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs">
              <Check className="w-3.5 h-3.5 text-emerald mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
          {plan.features.length > 4 && (
            <li className="text-xs text-muted-foreground pl-5">
              +{plan.features.length - 4} more
            </li>
          )}
        </ul>

        {/* CTA */}
        <Link to={`/register?plan=${plan.name}`} className="block mt-auto">
          <Button
            variant={isPopular ? "hero" : "outline"}
            className={`w-full micro-bounce ${isPopular ? 'shadow-glow-gold' : ''}`}
            size="sm"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PlansSection;
