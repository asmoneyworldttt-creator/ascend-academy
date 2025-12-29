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
  Crown,
  Gem,
  Trophy,
  Sparkles,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { packages } from "@/data/packages";
import CourseViewer from "@/components/CourseViewer";
import CourseQuiz from "@/components/CourseQuiz";
import CourseCertificate from "@/components/CourseCertificate";

// Sample course data with episodes
const courseData = {
  "Digital Marketing Mastery": {
    id: "dm-001",
    title: "Digital Marketing Mastery",
    description: "Master SEO, Social Media, Paid Ads & Analytics",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    duration: "50 hours",
    students: 4100,
    rating: 4.9,
    progress: 75,
    enrolled: true,
    episodes: [
      { id: "ep1", title: "Introduction to Digital Marketing", description: "Learn the fundamentals of digital marketing.", duration: "15 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", links: [{ label: "Course Notes", url: "#" }], completed: true },
      { id: "ep2", title: "SEO Fundamentals", description: "Master search engine optimization basics.", duration: "25 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", links: [], completed: true },
      { id: "ep3", title: "Social Media Strategy", description: "Build effective social media campaigns.", duration: "30 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", links: [], completed: false },
      { id: "ep4", title: "Paid Advertising", description: "Learn Google Ads and Facebook Ads.", duration: "35 min", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", links: [], completed: false },
    ],
    quiz: [
      { id: "q1", question: "What does SEO stand for?", options: ["Search Engine Optimization", "Social Engine Optimization", "Search Email Optimization", "Site Engine Optimization"], correctIndex: 0 },
      { id: "q2", question: "Which platform is best for B2B marketing?", options: ["TikTok", "LinkedIn", "Snapchat", "Pinterest"], correctIndex: 1 },
      { id: "q3", question: "What is a CTA?", options: ["Click Through Action", "Call To Action", "Content To Audience", "Campaign Target Analysis"], correctIndex: 1 },
      { id: "q4", question: "What is the ideal email open rate?", options: ["5-10%", "15-25%", "50-60%", "80-90%"], correctIndex: 1 },
      { id: "q5", question: "Which metric measures ad effectiveness?", options: ["CTR", "URL", "HTML", "CSS"], correctIndex: 0 },
    ]
  }
};

const planIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "Creator Pack": Star,
  "Social Media Mastery": Sparkles,
  "Business & Commerce": Crown,
  "Digital Marketing Pro": Gem,
  "Financial Trading Expert": Trophy,
};

const UserCourses = () => {
  const [activeTab, setActiveTab] = useState<"enrolled" | "all">("enrolled");
  const [viewingCourse, setViewingCourse] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState<string | null>(null);
  const navigate = useNavigate();

  const courses = [
    { ...courseData["Digital Marketing Mastery"] },
    { title: "AI & Prompt Engineering", description: "Leverage AI tools like ChatGPT & Midjourney", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop", duration: "25 hours", students: 1800, rating: 4.9, progress: 45, enrolled: true },
    { title: "E-commerce & Dropshipping", description: "Build and scale your online store", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop", duration: "45 hours", students: 2900, rating: 4.7, progress: 90, enrolled: true },
    { title: "Web Development Bootcamp", description: "Learn HTML, CSS, JavaScript & modern frameworks", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop", duration: "40 hours", students: 2500, rating: 4.9, progress: 0, enrolled: false },
  ];

  const enrolledCourses = courses.filter(c => c.enrolled);
  const displayCourses = activeTab === "enrolled" ? enrolledCourses : courses;

  const handleCourseComplete = (courseId: string) => {
    setViewingCourse(null);
    setShowQuiz(courseId);
  };

  const handleQuizPass = () => {
    setShowQuiz(null);
    setShowCertificate("Digital Marketing Mastery");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Course Viewer */}
      {viewingCourse && courseData[viewingCourse as keyof typeof courseData] && (
        <CourseViewer
          course={courseData[viewingCourse as keyof typeof courseData]}
          onClose={() => setViewingCourse(null)}
          onComplete={handleCourseComplete}
        />
      )}

      {/* Quiz */}
      {showQuiz && courseData["Digital Marketing Mastery"] && (
        <CourseQuiz
          courseTitle="Digital Marketing Mastery"
          questions={courseData["Digital Marketing Mastery"].quiz}
          passingScore={60}
          onPass={handleQuizPass}
          onClose={() => setShowQuiz(null)}
        />
      )}

      {/* Certificate */}
      {showCertificate && (
        <CourseCertificate
          studentName="John Doe"
          courseName={showCertificate}
          completionDate={new Date().toLocaleDateString()}
          certificateId={`SH-${Date.now()}`}
          onClose={() => setShowCertificate(null)}
        />
      )}

      {/* Header */}
      <header className="bg-card/50 backdrop-blur-lg border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/user-home")} className="p-2 rounded-full hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link to="/"><img src={logo} alt="Skill Learners" className="h-12 w-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]" /></Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/user-home" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <Link to="/dashboard/courses" className="text-primary font-medium">Courses</Link>
            <Link to="/dashboard/affiliate" className="text-muted-foreground hover:text-foreground transition-colors">Affiliate</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Premium Combo Packs */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold font-display mb-4">
              Unlock <span className="text-gradient-gold">Financial Freedom</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Premium Skill & Income Combo Packs</p>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-5 lg:gap-5">
            {packages.map((plan) => {
              const Icon = planIcons[plan.name] || Star;
              return (
                <div key={plan.name} className={`snap-center flex-shrink-0 w-72 lg:w-auto glass-card rounded-3xl p-5 ${plan.popular ? "ring-2 ring-primary shadow-glow-gold" : ""}`}>
                  {plan.popular && <span className="inline-block px-2 py-0.5 bg-gradient-gold text-primary-foreground text-xs font-bold rounded-full mb-2">Best Value</span>}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold">₹{plan.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{plan.mrp.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{plan.shortDesc}</p>
                  <Link to={`/register?plan=${plan.name}`}>
                    <Button variant={plan.popular ? "hero" : "outline"} size="sm" className="w-full">Enroll Now</Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Individual Courses */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold font-display">Expert-Led Courses</h2>
            <div className="flex gap-2">
              <Button variant={activeTab === "enrolled" ? "hero" : "outline"} size="sm" onClick={() => setActiveTab("enrolled")}>My Courses</Button>
              <Button variant={activeTab === "all" ? "hero" : "outline"} size="sm" onClick={() => setActiveTab("all")}>All Courses</Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCourses.map((course) => (
              <div key={course.title} className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    {course.enrolled ? <CheckCircle className="w-5 h-5 text-emerald" /> : <Lock className="w-5 h-5 text-muted-foreground" />}
                    <span className="text-sm font-medium text-white">{course.enrolled ? "Enrolled" : "Locked"}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-primary fill-primary" />{course.rating}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{course.students.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
                  </div>
                  {course.enrolled ? (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm"><span>Progress</span><span className="text-primary font-medium">{course.progress}%</span></div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-gold rounded-full" style={{ width: `${course.progress}%` }} />
                      </div>
                      <Button variant="hero" className="w-full" onClick={() => setViewingCourse(course.title)}>
                        <Play className="w-4 h-4" />{course.progress > 0 ? "Continue" : "Start"} Learning
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" className="w-full"><Lock className="w-4 h-4" />Unlock Course</Button>
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
