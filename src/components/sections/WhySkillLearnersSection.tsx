import { Clock, Users, Lightbulb, TrendingUp, Shield, Headphones, GraduationCap, Briefcase, Target, Sparkles } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Advanced Skill Training",
    description: "Unlike basic courses, we provide in-depth, expert-level training that prepares you for real-world challenges. Master skills that are in high demand across industries.",
    color: "from-primary to-gold-dark",
  },
  {
    icon: Clock,
    title: "Lifetime Access",
    description: "Learn at your own pace with forever-access to course materials. No expiration dates, no rush—your education, your timeline. Get free updates as content evolves.",
    color: "from-accent to-teal-dark",
  },
  {
    icon: Headphones,
    title: "24/7 Mentorship Support",
    description: "Get round-the-clock guidance from industry experts to clear your doubts. Our mentors provide personalized advice and real-time problem-solving assistance.",
    color: "from-emerald to-emerald-light",
  },
  {
    icon: Lightbulb,
    title: "Practical Learning",
    description: "Not just theory—hands-on projects that build real-world skills. Apply what you learn immediately through assignments, case studies, and live projects.",
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: TrendingUp,
    title: "Path to Financial Freedom",
    description: "We don't just teach skills—we provide a complete roadmap to financial independence. Learn to monetize your skills through freelancing, business, and passive income.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Briefcase,
    title: "Future Job Opportunities",
    description: "We're building partnerships to provide direct job placements for skilled graduates. Your training today opens doors to employment opportunities tomorrow.",
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Thriving Community",
    description: "Join a network of 10,000+ like-minded learners. Collaborate, share opportunities, get referrals, and grow together in our supportive ecosystem.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "Certified Excellence",
    description: "Earn industry-recognized certificates that boost your credibility. Showcase your verified skills to employers, clients, and on LinkedIn.",
    color: "from-amber-500 to-orange-500",
  },
];

const comparisonPoints = [
  {
    others: "Generic video courses",
    us: "Expert-led training with mentorship"
  },
  {
    others: "Learn and leave",
    us: "Complete earning ecosystem"
  },
  {
    others: "No income support",
    us: "7 built-in income opportunities"
  },
  {
    others: "Limited community",
    us: "Active 10,000+ member network"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            The SkillHonors Difference
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Why Choose <span className="text-gradient-gold">SkillHonors</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're not just another e-learning platform. We're your partner in building a successful career 
            and achieving financial independence. Here's what makes us different:
          </p>
        </div>

        {/* Comparison Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-card rounded-2xl p-6 lg:p-8">
            <h3 className="text-xl font-bold font-display text-center mb-6">
              Others vs <span className="text-gradient-gold">SkillHonors</span>
            </h3>
            <div className="space-y-3">
              {comparisonPoints.map((point, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <span className="text-destructive text-lg">✗</span>
                    <span className="text-sm text-muted-foreground">{point.others}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald/10 border border-emerald/20">
                    <span className="text-emerald text-lg">✓</span>
                    <span className="text-sm text-foreground font-medium">{point.us}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative glass-card p-6 rounded-2xl hover:-translate-y-2 transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-14 h-14 mb-5 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold font-display mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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

        {/* Bottom CTA Message */}
        <div className="text-center mt-16">
          <div className="glass-card inline-block p-6 lg:p-8 rounded-2xl max-w-2xl">
            <Target className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold font-display mb-2">Your Success is Our Mission</h3>
            <p className="text-muted-foreground">
              We believe in your potential. With the right skills and our support system, 
              you can achieve anything. Take freelance projects, build your business, or secure employment—
              we're here to guide you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySkillLearnersSection;
