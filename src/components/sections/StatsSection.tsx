import { useEffect, useState, useRef } from "react";
import { Users, UserCheck, BookOpen, Trophy } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Total Students",
    color: "from-primary to-gold-dark",
  },
  {
    icon: UserCheck,
    value: 5000,
    suffix: "+",
    label: "Active Members",
    color: "from-emerald to-emerald-light",
  },
  {
    icon: BookOpen,
    value: 50,
    suffix: "+",
    label: "Expert Courses",
    color: "from-accent to-teal-light",
  },
  {
    icon: Trophy,
    value: 100,
    suffix: "K+",
    label: "Earnings Distributed",
    color: "from-primary to-accent",
  },
];

const useCountUp = (end: number, duration: number = 2000, isInView: boolean) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return count;
};

const StatCard = ({ stat, index, isInView }: { stat: typeof stats[0]; index: number; isInView: boolean }) => {
  const count = useCountUp(stat.value, 2000, isInView);
  const Icon = stat.icon;

  return (
    <div
      className="glass-card p-8 rounded-3xl text-center group hover:-translate-y-2 transition-all duration-500"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-10 h-10 text-primary-foreground" />
      </div>
      <h3 className="text-4xl lg:text-5xl font-bold font-display text-foreground mb-2">
        {count.toLocaleString()}{stat.suffix}
      </h3>
      <p className="text-muted-foreground font-medium">{stat.label}</p>
    </div>
  );
};

const StatsSection = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Our <span className="text-gradient-gold">Impact</span> in Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful learners who have transformed their careers and achieved financial independence.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
