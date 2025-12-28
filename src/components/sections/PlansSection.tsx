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
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Choose Your <span className="text-gradient-gold">Learning Path</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Invest in yourself today. Every plan includes lifetime access to purchased content and our supportive community.
          </p>
        </div>

        {/* Plans Grid - Horizontal scroll on mobile */}
        <div className="lg:hidden plans-scroll">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Plans Grid - Desktop */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-6">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        {/* Bonus Section */}
        <div className="mt-16 glass-card p-8 rounded-3xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-display mb-2">
              🎁 Special Bonuses with Every Plan
            </h3>
            <p className="text-muted-foreground">All plans include these exclusive perks</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📚", title: "Free E-books", desc: "Digital marketing & AI guides" },
              { icon: "👥", title: "Community Access", desc: "Connect with 10,000+ learners" },
              { icon: "🎥", title: "Weekly Live Q&A", desc: "Direct expert interaction" },
              { icon: "📱", title: "Mobile App", desc: "Learn on the go" },
            ].map((bonus) => (
              <div key={bonus.title} className="text-center p-4">
                <span className="text-4xl mb-3 block">{bonus.icon}</span>
                <h4 className="font-bold mb-1">{bonus.title}</h4>
                <p className="text-sm text-muted-foreground">{bonus.desc}</p>
              </div>
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
      className={`relative glass-card rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
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
        <Link to="/register" className="block">
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

export default PlansSection;
