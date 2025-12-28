import { Clock, Users, Lightbulb, TrendingUp, Shield, Headphones } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Learn at your own pace with forever-access to course materials. No expiration dates, no rush—your education, your timeline.",
    color: "from-primary to-gold-dark",
  },
  {
    icon: Headphones,
    title: "24/7 Mentorship Support",
    description: "Get round-the-clock guidance from industry experts to clear your doubts. Our mentors are always just a message away.",
    color: "from-accent to-teal-dark",
  },
  {
    icon: Lightbulb,
    title: "Practical Learning",
    description: "Not just theory—hands-on projects that build real-world skills. Apply what you learn immediately to see real results.",
    color: "from-emerald to-emerald-light",
  },
  {
    icon: TrendingUp,
    title: "High-Income Mastery",
    description: "Focus on skills that actually pay, like AI, Digital Ads, and Automation. Learn what the market demands today and tomorrow.",
    color: "from-secondary to-navy",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Join a thriving community of 10,000+ learners. Collaborate, network, and grow together with like-minded individuals.",
    color: "from-primary to-accent",
  },
  {
    icon: Shield,
    title: "Certified Excellence",
    description: "Earn industry-recognized certificates that boost your credibility. Showcase your skills to employers and clients worldwide.",
    color: "from-gold-dark to-primary",
  },
];

const WhySkillLearnersSection = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Why Choose <span className="text-gradient-gold">Skill Learners</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're not just another e-learning platform. We're your partner in building a successful career and achieving financial independence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative glass-card p-8 rounded-3xl hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} opacity-20 blur-xl`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhySkillLearnersSection;
