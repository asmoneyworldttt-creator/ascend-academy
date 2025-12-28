import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  BookOpen,
  Play,
  Star,
  Clock,
  Users,
  CheckCircle,
  Lock,
  ChevronRight,
  Crown,
  Gem,
  Trophy,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

// Plans Data
const plans = [
  { name: "Starter", icon: Star, price: 500, mrp: 999, features: 5, color: "from-slate to-secondary" },
  { name: "Silver", icon: Sparkles, price: 1000, mrp: 1999, features: 10, color: "from-zinc-400 to-zinc-600" },
  { name: "Gold", icon: Crown, price: 2500, mrp: 4999, features: 15, color: "from-primary to-gold-dark", popular: true },
  { name: "Diamond", icon: Gem, price: 5000, mrp: 9999, features: 20, color: "from-accent to-teal-dark" },
  { name: "Platinum", icon: Trophy, price: 10000, mrp: 19999, features: 25, color: "from-secondary to-navy" },
];

// Individual Courses
const courses = [
  {
    title: "Digital Marketing Mastery",
    description: "Master SEO, Social Media, Paid Ads & Analytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    duration: "50 hours",
    students: 4100,
    rating: 4.9,
    progress: 75,
    enrolled: true,
  },
  {
    title: "AI & Prompt Engineering",
    description: "Leverage AI tools like ChatGPT & Midjourney",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    duration: "25 hours",
    students: 1800,
    rating: 4.9,
    progress: 45,
    enrolled: true,
  },
  {
    title: "E-commerce & Dropshipping",
    description: "Build and scale your online store",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    duration: "45 hours",
    students: 2900,
    rating: 4.7,
    progress: 90,
    enrolled: true,
  },
  {
    title: "Web Development Bootcamp",
    description: "Learn HTML, CSS, JavaScript & modern frameworks",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    duration: "40 hours",
    students: 2500,
    rating: 4.9,
    progress: 0,
    enrolled: false,
  },
  {
    title: "Python for Beginners",
    description: "Master Python programming from scratch",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
    duration: "35 hours",
    students: 3200,
    rating: 4.8,
    progress: 0,
    enrolled: false,
  },
  {
    title: "Cryptocurrency Fundamentals",
    description: "Understand blockchain, trading & DeFi",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
    duration: "30 hours",
    students: 1500,
    rating: 4.6,
    progress: 0,
    enrolled: false,
  },
];

const UserCourses = () => {
  const [activeTab, setActiveTab] = useState<"enrolled" | "all">("enrolled");
  const navigate = useNavigate();

  const enrolledCourses = courses.filter(c => c.enrolled);
  const displayCourses = activeTab === "enrolled" ? enrolledCourses : courses;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/user-home")} className="p-2 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link to="/">
              <img src={logo} alt="Skill Learners" className="h-10 w-auto" />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/user-home" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/dashboard/courses" className="text-primary font-medium">Courses</Link>
            <Link to="/dashboard/affiliate" className="text-muted-foreground hover:text-foreground transition-colors">Affiliate</Link>
            <Link to="/dashboard/wallet" className="text-muted-foreground hover:text-foreground transition-colors">Wallet</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Premium Combo Packs Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold font-display mb-4">
              Unlock <span className="text-gradient-gold">Financial Freedom</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium Skill & Income Combo Packs - Get both courses AND income-earning opportunities
            </p>
          </div>

          {/* Plans Carousel - Horizontal scroll on mobile */}
          <div className="lg:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.name}
                    className={`snap-center flex-shrink-0 w-72 glass-card rounded-3xl p-6 ${
                      plan.popular ? "ring-2 ring-primary shadow-glow-gold" : ""
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-gold rounded-full text-xs font-bold text-primary-foreground">
                        MOST POPULAR
                      </div>
                    )}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold">₹{plan.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{plan.features}+ Courses Included</p>
                    <Button variant={plan.popular ? "hero" : "outline"} className="w-full">
                      Enroll Now
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative glass-card rounded-3xl p-6 hover:-translate-y-2 transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-primary shadow-glow-gold" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-gold rounded-full text-xs font-bold text-primary-foreground whitespace-nowrap">
                      MOST POPULAR
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold">₹{plan.price.toLocaleString()}</span>
                  </div>
                  <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
                  <p className="text-sm text-muted-foreground mt-3 mb-4">{plan.features}+ Premium Courses</p>
                  <Button variant={plan.popular ? "hero" : "outline"} className="w-full">
                    Enroll Now
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Individual Courses Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold font-display">
                Enhance Your Skills: <span className="text-gradient-teal">Expert-Led Courses</span>
              </h2>
              <p className="text-muted-foreground mt-2">Learn specific skills from industry experts</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === "enrolled" ? "hero" : "outline"}
                size="sm"
                onClick={() => setActiveTab("enrolled")}
              >
                My Courses
              </Button>
              <Button
                variant={activeTab === "all" ? "hero" : "outline"}
                size="sm"
                onClick={() => setActiveTab("all")}
              >
                All Courses
              </Button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCourses.map((course) => (
              <div
                key={course.title}
                className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  
                  {course.enrolled ? (
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald" />
                      <span className="text-sm font-medium text-white">Enrolled</span>
                    </div>
                  ) : (
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-white">Locked</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Progress or CTA */}
                  {course.enrolled ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-primary">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-gold rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <Button variant="hero" className="w-full">
                        <Play className="w-4 h-4" />
                        {course.progress > 0 ? "Continue" : "Start"} Learning
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full">
                      <Lock className="w-4 h-4" />
                      Unlock Course
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserCourses;
