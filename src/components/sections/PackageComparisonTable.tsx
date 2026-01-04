import { Check, X, Crown, Compass, Flame, Eye, TrendingUp } from "lucide-react";

const tiers = [
  { 
    name: "Explorer", 
    icon: Compass, 
    gradient: "from-amber-600 to-orange-500",
    price: "₹999"
  },
  { 
    name: "Catalyst", 
    icon: Flame, 
    gradient: "from-slate-400 to-zinc-300",
    price: "₹2,999"
  },
  { 
    name: "Visionary", 
    icon: Eye, 
    gradient: "from-yellow-400 to-amber-400",
    price: "₹5,999"
  },
  { 
    name: "Innovator", 
    icon: TrendingUp, 
    gradient: "from-cyan-400 to-teal-400",
    price: "₹9,999"
  },
  { 
    name: "Legend", 
    icon: Crown, 
    gradient: "from-violet-400 to-purple-500",
    price: "₹14,999"
  },
];

const features = [
  { name: "Foundational Courses", tiers: [true, true, true, true, true] },
  { name: "Community Forum Access", tiers: [true, true, true, true, true] },
  { name: "Email Support", tiers: ["48h", "24h", "Priority", "Priority", "Priority"] },
  { name: "Downloadable Materials", tiers: [true, true, true, true, true] },
  { name: "Progress Tracking", tiers: [true, true, true, true, true] },
  { name: "Completion Certificate", tiers: [true, true, true, true, true] },
  { name: "Advanced Course Library", tiers: [false, true, true, true, true] },
  { name: "Live Q&A Sessions", tiers: [false, true, true, true, true] },
  { name: "Exclusive Webinars", tiers: [false, true, true, true, true] },
  { name: "Networking Community", tiers: [false, true, true, true, true] },
  { name: "Complete Course Catalog", tiers: [false, false, true, true, true] },
  { name: "1-on-1 Mentor Sessions", tiers: [false, false, "Monthly", "Unlimited", "Unlimited"] },
  { name: "VIP Membership", tiers: [false, false, true, true, true] },
  { name: "Job Placement Assistance", tiers: [false, false, true, true, true] },
  { name: "Business Coaching", tiers: [false, false, false, true, true] },
  { name: "Mastermind Group", tiers: [false, false, false, true, true] },
  { name: "Revenue Sharing", tiers: [false, false, false, true, true] },
  { name: "Direct Founder Access", tiers: [false, false, false, true, true] },
  { name: "Personal Success Manager", tiers: [false, false, false, false, true] },
  { name: "Profit-Sharing Program", tiers: [false, false, false, false, true] },
  { name: "VIP Event Invitations", tiers: [false, false, false, false, true] },
  { name: "Brand Ambassador Program", tiers: [false, false, false, false, true] },
];

const PackageComparisonTable = () => {
  return (
    <div className="mt-16 overflow-hidden">
      <div className="text-center mb-10">
        <h3 className="text-2xl lg:text-3xl font-bold font-display mb-3">
          Compare All <span className="text-gradient-gold">Features</span>
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto">
          See exactly what's included in each tier
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/60">
              <th className="text-left p-4 font-semibold text-foreground min-w-[200px]">
                Features
              </th>
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <th key={tier.name} className="p-4 text-center min-w-[140px]">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-md`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-foreground">{tier.name}</span>
                      <span className="text-xs text-muted-foreground">{tier.price}</span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr 
                key={feature.name} 
                className={`border-b border-border/30 transition-colors hover:bg-muted/30 ${
                  idx % 2 === 0 ? 'bg-transparent' : 'bg-muted/10'
                }`}
              >
                <td className="p-4 text-sm font-medium text-foreground">
                  {feature.name}
                </td>
                {feature.tiers.map((value, tierIdx) => (
                  <td key={tierIdx} className="p-4 text-center">
                    {value === true ? (
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald/15">
                        <Check className="w-4 h-4 text-emerald" />
                      </div>
                    ) : value === false ? (
                      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-destructive/10">
                        <X className="w-4 h-4 text-destructive/60" />
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-primary px-2 py-1 rounded-full bg-primary/10">
                        {value}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Accordion View */}
      <div className="lg:hidden space-y-3">
        {tiers.map((tier, tierIdx) => {
          const Icon = tier.icon;
          const tierFeatures = features.filter(f => f.tiers[tierIdx] !== false);
          
          return (
            <details key={tier.name} className="group rounded-2xl border border-border/60 bg-card/80 overflow-hidden">
              <summary className="flex items-center gap-4 p-4 cursor-pointer list-none">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{tier.name}</h4>
                  <p className="text-sm text-muted-foreground">{tier.price} • {tierFeatures.length} features</p>
                </div>
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center transition-transform group-open:rotate-180">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="px-4 pb-4 pt-2 border-t border-border/30">
                <ul className="space-y-2">
                  {features.map((feature, idx) => {
                    const value = feature.tiers[tierIdx];
                    return (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        {value === true ? (
                          <div className="w-5 h-5 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-emerald" />
                          </div>
                        ) : value === false ? (
                          <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                            <X className="w-3 h-3 text-destructive/60" />
                          </div>
                        ) : (
                          <span className="text-[10px] font-semibold text-primary px-1.5 py-0.5 rounded bg-primary/10 flex-shrink-0">
                            {value}
                          </span>
                        )}
                        <span className={value === false ? 'text-muted-foreground/50 line-through' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
};

export default PackageComparisonTable;
