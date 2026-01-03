import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, ShoppingBag, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import roadmapImage from "@/assets/roadmap-ecommerce.png";

const EcommerceRoadmapSection = () => {
  const milestones = [
    { 
      title: "Website Launch", 
      description: "Set up your professional e-commerce store with optimized design and seamless checkout.",
      icon: Target,
    },
    { 
      title: "Product & Supplier Integration", 
      description: "Source winning products and build reliable supplier relationships.",
      icon: ShoppingBag,
    },
    { 
      title: "Marketing & Logistics", 
      description: "Master digital marketing, customer support, and efficient shipping systems.",
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-sm font-medium text-emerald-500 mb-5">
            <ShoppingBag className="w-4 h-4" />
            Coming Soon
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold font-display mb-4">
            E-commerce <span className="text-gradient-teal">Business Roadmap</span>
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive e-commerce program is launching soon. Build your online business empire with expert guidance.
          </p>
        </div>

        {/* Roadmap Image */}
        <div className="relative max-w-5xl mx-auto mb-12">
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-emerald-500/10 rounded-3xl blur-xl" />
          <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
            <img 
              src={roadmapImage} 
              alt="E-commerce Business Roadmap - Coming June" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Milestones Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div 
                key={milestone.title}
                className="glass-card p-5 rounded-xl border border-border/50 hover:border-emerald-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 glass-card p-6 rounded-2xl border border-emerald-500/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">Be the first to access our E-commerce program</span>
            </div>
            <Link to="/register">
              <Button variant="teal" className="group">
                Join Waitlist
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcommerceRoadmapSection;
