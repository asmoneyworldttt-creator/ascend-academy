import { Link } from "react-router-dom";
import { Check, Crown, Star, Gem, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    icon: Star,
    price: 500,
    mrp: 999,
    period: "one-time",
    description: "Perfect for beginners exploring digital skills",
    features: [
      "5 Beginner Courses",
      "Email Support",
      "Mobile & Web Access",
      "Course Completion Certificate",
      "Community Forum Access",
    ],
    color: "from-slate to-secondary",
    popular: false,
    level: "Beginner",
  },
  {
    name: "Silver",
    icon: Sparkles,
    price: 1000,
    mrp: 1999,
    period: "one-time",
    description: "Ideal for those ready to level up their skills",
    features: [
      "10+ Basic Courses",
      "Priority Email Support",
      "All Starter Features",
      "Live Q&A Sessions",
      "Resource Downloads",
    ],
    color: "from-zinc-400 to-zinc-600",
    popular: false,
    level: "Intermediate",
  },
  {
    name: "Gold",
    icon: Crown,
    price: 2500,
    mrp: 4999,
    period: "one-time",
    description: "Unlimited access with premium support",
    features: [
      "All Courses Unlocked",
      "Priority 24/7 Support",
      "All Silver Features",
      "1-on-1 Mentorship Sessions",
      "Income Opportunity Training",
      "Exclusive Webinars",
    ],
    color: "from-primary to-gold-dark",
    popular: true,
    level: "Advanced",
  },
  {
    name: "Diamond",
    icon: Gem,
    price: 5000,
    mrp: 9999,
    period: "one-time",
    description: "Career transformation with personal guidance",
    features: [
      "Everything in Gold",
      "Career Mentorship",
      "Job Placement Assistance",
      "VIP Community Access",
      "Weekly Strategy Calls",
      "Premium Toolkit Access",
    ],
    color: "from-accent to-teal-dark",
    popular: false,
    level: "Expert",
  },
  {
    name: "Platinum",
    icon: Trophy,
    price: 10000,
    mrp: 19999,
    period: "lifetime",
    description: "Ultimate package for serious earners",
    features: [
      "Everything in Diamond",
      "Lifetime VIP Support",
      "Exclusive Mastermind Group",
      "Personal Brand Building",
      "Revenue Share Opportunities",
      "Direct Mentor Access",
      "Priority New Course Access",
    ],
    color: "from-secondary to-navy",
    popular: false,
    level: "Master",
  },
];

const PlansSection = () => {
  return (
    <section id="plans" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Choose Your <span className="text-gradient-gold">Learning Path</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Invest in yourself today. Every plan includes lifetime access to purchased content and our supportive community.
          </p>
        </div>

        {/* Plans Grid - Horizontal scroll on mobile with 2-column hint */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-2">
            {plans.map((plan, index) => (
              <div key={plan.name} className="snap-center flex-shrink-0 w-[75%] sm:w-[45%]">
                <PlanCard plan={plan} index={index} />
              </div>
            ))}
          </div>
          {/* Scroll hint */}
          <p className="text-center text-sm text-muted-foreground mt-2">
            ← Swipe to see all plans →
          </p>
        </div>

        {/* Plans Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Bonus Section - Horizontal Swipeable on Mobile */}
        <div className="mt-16 glass-card p-6 lg:p-8 rounded-3xl">
          <div className="text-center mb-6 lg:mb-8">
            <h3 className="text-xl lg:text-2xl font-bold font-display mb-2">
              Special Bonuses with Every Plan
            </h3>
            <p className="text-muted-foreground text-sm lg:text-base">All plans include these exclusive perks</p>
          </div>
          
          {/* Mobile horizontal scroll */}
          <div className="lg:hidden">
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {bonuses.map((bonus) => (
                <div key={bonus.title} className="snap-center flex-shrink-0 w-[70%] sm:w-[45%]">
                  <BonusCard bonus={bonus} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {bonuses.map((bonus) => (
              <BonusCard key={bonus.title} bonus={bonus} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ plan, index }: { plan: typeof plans[0]; index: number }) => {
  const Icon = plan.icon;
  
  return (
    <div
      className={`relative glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full ${
        plan.popular ? "ring-2 ring-primary shadow-glow-gold" : ""
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Popular ribbon */}
      {plan.popular && (
        <div className="absolute -right-12 top-6 rotate-45 px-12 py-1 bg-gradient-gold text-sm font-bold text-primary-foreground">
          Most Popular
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className={`w-14 h-14 mb-4 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xl font-bold font-display">{plan.name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            {plan.level}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {plan.description}
        </p>

        {/* Pricing */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-display">₹{plan.price.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
          </div>
          <span className="text-xs text-muted-foreground">{plan.period}</span>
          <div className="mt-1">
            <span className="inline-block px-2 py-0.5 rounded bg-emerald/10 text-emerald text-xs font-medium">
              Save {Math.round((1 - plan.price / plan.mrp) * 100)}%
            </span>
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {plan.features.slice(0, 5).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check className="w-4 h-4 text-emerald mt-0.5 flex-shrink-0" />
              <span className="text-foreground/80">{feature}</span>
            </li>
          ))}
          {plan.features.length > 5 && (
            <li className="text-sm text-muted-foreground pl-6">
              +{plan.features.length - 5} more features
            </li>
          )}
        </ul>

        {/* CTA */}
        <Link to={`/register?plan=${plan.name}`} className="block">
          <Button
            variant={plan.popular ? "hero" : "outline"}
            className="w-full"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Premium SVG Icons for bonuses
const bonuses = [
  { 
    icon: () => (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="8" y="6" width="32" height="36" rx="4" fill="url(#book-fill)" />
        <rect x="12" y="10" width="24" height="28" rx="2" fill="white" opacity="0.9" />
        <path d="M16 16h16M16 22h12M16 28h8" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="book-fill" x1="8" y1="6" x2="40" y2="42">
            <stop stopColor="#FBBF24" /><stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Free E-books", 
    desc: "Digital marketing & AI guides" 
  },
  { 
    icon: () => (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <circle cx="24" cy="18" r="8" fill="url(#comm-fill)" />
        <circle cx="12" cy="26" r="6" fill="url(#comm-fill)" opacity="0.7" />
        <circle cx="36" cy="26" r="6" fill="url(#comm-fill)" opacity="0.7" />
        <path d="M24 26c8 0 14 6 14 14H10c0-8 6-14 14-14z" fill="url(#comm-fill)" />
        <defs>
          <linearGradient id="comm-fill" x1="10" y1="10" x2="38" y2="40">
            <stop stopColor="#14B8A6" /><stop offset="1" stopColor="#0D9488" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Community Access", 
    desc: "Connect with 10,000+ learners" 
  },
  { 
    icon: () => (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="6" y="12" width="36" height="24" rx="4" fill="url(#vid-fill)" />
        <polygon points="20,18 20,30 32,24" fill="white" />
        <defs>
          <linearGradient id="vid-fill" x1="6" y1="12" x2="42" y2="36">
            <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Weekly Live Q&A", 
    desc: "Direct expert interaction" 
  },
  { 
    icon: () => (
      <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
        <rect x="14" y="4" width="20" height="40" rx="4" fill="url(#mob-fill)" />
        <rect x="18" y="8" width="12" height="28" rx="2" fill="white" opacity="0.9" />
        <circle cx="24" cy="40" r="2" fill="white" opacity="0.9" />
        <defs>
          <linearGradient id="mob-fill" x1="14" y1="4" x2="34" y2="44">
            <stop stopColor="#22C55E" /><stop offset="1" stopColor="#16A34A" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: "Mobile App", 
    desc: "Learn on the go" 
  },
];

const BonusCard = ({ bonus }: { bonus: typeof bonuses[0] }) => (
  <div className="text-center p-4 glass-card rounded-2xl hover:-translate-y-1 transition-all duration-300">
    <div className="flex justify-center mb-3">{bonus.icon()}</div>
    <h4 className="font-bold mb-1">{bonus.title}</h4>
    <p className="text-sm text-muted-foreground">{bonus.desc}</p>
  </div>
);

export default PlansSection;
