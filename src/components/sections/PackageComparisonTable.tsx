import { useRef, useEffect, useState } from "react";
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

// Reduced to key features only
const features = [
  { name: "Course Access", tiers: ["Basic", "Advanced", "Full", "Full", "Full"] },
  { name: "Community Access", tiers: [true, true, true, "VIP", "VIP"] },
  { name: "Support Response", tiers: ["48h", "24h", "Priority", "Priority", "Instant"] },
  { name: "Mentor Sessions", tiers: [false, false, "Monthly", "Unlimited", "Unlimited"] },
  { name: "Live Q&A & Webinars", tiers: [false, true, true, true, true] },
  { name: "Job Placement Help", tiers: [false, false, true, true, true] },
  { name: "Business Coaching", tiers: [false, false, false, true, true] },
  { name: "Revenue Sharing", tiers: [false, false, false, true, true] },
  { name: "Personal Success Manager", tiers: [false, false, false, false, true] },
  { name: "VIP Events & Profit Share", tiers: [false, false, false, false, true] },
];

const PackageComparisonTable = () => {
  const tableRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLTableSectionElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [visibleRows, setVisibleRows] = useState<boolean[]>(new Array(features.length).fill(false));

  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current || !headerRef.current) return;
      
      const tableRect = tableRef.current.getBoundingClientRect();
      const headerHeight = 80;
      
      // Make header sticky when table is in view but header would scroll out
      setIsSticky(tableRect.top < headerHeight && tableRect.bottom > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection observer for row animations
  useEffect(() => {
    const rows = document.querySelectorAll('.comparison-row');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && !isNaN(index)) {
            setVisibleRows(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    rows.forEach(row => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <h3 className="text-xl lg:text-2xl font-bold font-display mb-2">
          Compare <span className="text-gradient-gold">Packages</span>
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Quick overview of what's included in each tier
        </p>
      </div>

      {/* Desktop Table - Compact & Premium */}
      <div 
        ref={tableRef}
        className="hidden lg:block max-w-4xl mx-auto rounded-xl border border-border/40 bg-card/80 backdrop-blur-sm shadow-lg overflow-hidden"
      >
        {/* Sticky Header */}
        <div 
          className={`transition-all duration-300 ${
            isSticky 
              ? 'fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-4xl w-full rounded-t-xl shadow-xl border-x border-t border-border/40' 
              : ''
          }`}
          style={{ width: isSticky ? tableRef.current?.offsetWidth : undefined }}
        >
          <table className="w-full">
            <thead ref={headerRef} className="bg-card/95 backdrop-blur-md">
              <tr className="border-b border-border/40">
                <th className="text-left py-3 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground w-[160px]">
                  Feature
                </th>
                {tiers.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <th key={tier.name} className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-sm`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold text-foreground">{tier.name}</span>
                        <span className="text-[10px] text-muted-foreground">{tier.price}</span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
          </table>
        </div>

        {/* Spacer when header is sticky */}
        {isSticky && <div className="h-[88px]" />}

        {/* Table Body */}
        <table className="w-full">
          <tbody>
            {features.map((feature, idx) => (
              <tr 
                key={feature.name}
                data-index={idx}
                className={`comparison-row border-b border-border/20 transition-all duration-500 ${
                  idx % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'
                } hover:bg-primary/5 ${
                  visibleRows[idx] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <td className="py-2.5 px-4 text-sm font-medium text-foreground w-[160px]">
                  {feature.name}
                </td>
                {feature.tiers.map((value, tierIdx) => (
                  <td key={tierIdx} className="py-2.5 px-2 text-center">
                    {value === true ? (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald/15">
                        <Check className="w-3 h-3 text-emerald" />
                      </div>
                    ) : value === false ? (
                      <div className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-muted/30">
                        <X className="w-3 h-3 text-muted-foreground/40" />
                      </div>
                    ) : (
                      <span className="text-[10px] font-semibold text-primary px-1.5 py-0.5 rounded bg-primary/10 whitespace-nowrap">
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

      {/* Mobile Cards - Compact */}
      <div className="lg:hidden space-y-2 px-2">
        {tiers.map((tier, tierIdx) => {
          const Icon = tier.icon;
          const includedCount = features.filter(f => f.tiers[tierIdx] !== false).length;
          
          return (
            <details key={tier.name} className="group rounded-xl border border-border/40 bg-card/80 overflow-hidden">
              <summary className="flex items-center gap-3 p-3 cursor-pointer list-none">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tier.gradient} flex items-center justify-center shadow-sm flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-foreground">{tier.name}</h4>
                    <span className="text-[10px] text-muted-foreground">{tier.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{includedCount}/{features.length} features</p>
                </div>
                <div className="w-5 h-5 rounded-full bg-muted/50 flex items-center justify-center transition-transform group-open:rotate-180">
                  <svg className="w-3 h-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="px-3 pb-3 pt-2 border-t border-border/20">
                <ul className="space-y-1.5">
                  {features.map((feature, idx) => {
                    const value = feature.tiers[tierIdx];
                    return (
                      <li key={idx} className="flex items-center gap-2 text-xs">
                        {value === true ? (
                          <div className="w-4 h-4 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0">
                            <Check className="w-2.5 h-2.5 text-emerald" />
                          </div>
                        ) : value === false ? (
                          <div className="w-4 h-4 rounded-full bg-muted/30 flex items-center justify-center flex-shrink-0">
                            <X className="w-2.5 h-2.5 text-muted-foreground/40" />
                          </div>
                        ) : (
                          <span className="text-[9px] font-semibold text-primary px-1 py-0.5 rounded bg-primary/10 flex-shrink-0 min-w-[40px] text-center">
                            {value}
                          </span>
                        )}
                        <span className={`${value === false ? 'text-muted-foreground/40 line-through' : 'text-muted-foreground'}`}>
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
