import { Link } from "react-router-dom";
import { ArrowRight, Zap, Target, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const EarningEcosystemSection = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Learn & Earn Simultaneously",
      description: "Start generating income while you're still learning. Apply skills in real-time projects.",
    },
    {
      icon: Target,
      title: "Multiple Income Streams",
      description: "Unlock diverse revenue channels through freelancing, affiliate programs, and digital products.",
    },
    {
      icon: Users,
      title: "Referral Rewards",
      description: "Earn 10-30% commission by sharing knowledge and inviting others to join the community.",
    },
    {
      icon: TrendingUp,
      title: "Passive Income Potential",
      description: "Build systems that generate income even when you're not actively working.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-premium" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/15 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-secondary-foreground">
            <h2 className="text-3xl lg:text-5xl font-bold font-display mb-6">
              The <span className="text-primary">Earning</span> Ecosystem
            </h2>
            <p className="text-lg text-secondary-foreground/80 mb-8 leading-relaxed">
              At Skill Learners, we believe education should be an investment that pays dividends. 
              Our unique ecosystem allows you to start earning while you're still learning, 
              creating a sustainable path to financial independence.
            </p>

            <div className="space-y-4 mb-10">
              <p className="text-secondary-foreground/90 leading-relaxed">
                By mastering in-demand digital skills like AI, e-commerce, and digital marketing, 
                you position yourself at the forefront of the modern economy. Our students don't 
                just learn—they build businesses, land high-paying freelance gigs, and create 
                multiple streams of passive income.
              </p>
              <p className="text-secondary-foreground/90 leading-relaxed">
                Through our affiliate mastery program, you can also earn by sharing your success 
                story and inviting others to join this transformative journey. It's a win-win 
                ecosystem where knowledge sharing is rewarded.
              </p>
            </div>

            <Link to="/register">
              <Button variant="hero" size="lg" className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right Content - Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-gold flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold font-display mb-2 text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Future Ready Section */}
        <div className="mt-20 glass-card p-8 lg:p-12 rounded-3xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold font-display text-foreground mb-4">
              🚀 Future-Ready Education for the AI Economy
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-foreground/80">
            <p className="leading-relaxed">
              The world is rapidly evolving with AI, automation, and Web 3.0 technologies reshaping 
              every industry. At Skill Learners, we're committed to preparing you for this future. 
              Our curriculum is constantly updated to include the latest trends, tools, and 
              technologies that employers and clients are actively seeking.
            </p>
            <p className="leading-relaxed">
              From understanding AI prompt engineering to mastering blockchain basics, from 
              building e-commerce empires to creating viral digital marketing campaigns—we 
              equip you with the skills that will remain relevant and profitable for decades 
              to come. Don't get left behind in the old economy; step into the future with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningEcosystemSection;
