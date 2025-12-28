import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    role: "Digital Marketing Freelancer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    review: "Skill Learners completely transformed my career. Within 3 months of completing the Digital Marketing course, I landed my first freelance client and now earn more than my previous full-time job!",
    earnings: "₹45,000/month",
  },
  {
    name: "Rahul Verma",
    role: "E-commerce Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    review: "The E-commerce course gave me the confidence to start my own dropshipping business. The step-by-step guidance and community support were invaluable. Highly recommended!",
    earnings: "₹1.2L/month",
  },
  {
    name: "Ananya Patel",
    role: "AI Content Creator",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    review: "The AI & Prompt Engineering course opened doors I never knew existed. I now help businesses automate their content creation and command premium rates for my services.",
    earnings: "₹60,000/month",
  },
  {
    name: "Vikram Singh",
    role: "Full-Stack Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    review: "Coming from a non-tech background, I was skeptical. But the Web Development Bootcamp is so well-structured that I went from zero to landing a remote job in just 6 months!",
    earnings: "₹80,000/month",
  },
  {
    name: "Meera Krishnan",
    role: "Crypto Investor & Educator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    rating: 5,
    review: "The Cryptocurrency course helped me understand the market properly. I not only invested wisely but now also teach others through my YouTube channel that I monetized!",
    earnings: "₹35,000/month",
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Success <span className="text-gradient-gold">Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real students, real transformations. See how Skill Learners has changed lives.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Review Card */}
            <div className="glass-card p-8 lg:p-12 rounded-3xl">
              <Quote className="w-12 h-12 text-primary/30 mb-6" />
              
              <p className="text-xl lg:text-2xl text-foreground leading-relaxed mb-8">
                "{reviews[currentIndex].review}"
              </p>

              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={reviews[currentIndex].avatar}
                    alt={reviews[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg">{reviews[currentIndex].name}</h4>
                      <CheckCircle className="w-5 h-5 text-emerald" />
                    </div>
                    <p className="text-muted-foreground">{reviews[currentIndex].role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="glass-card px-6 py-3 rounded-xl">
                  <p className="text-sm text-muted-foreground">Current Earnings</p>
                  <p className="text-xl font-bold text-emerald">{reviews[currentIndex].earnings}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 rounded-full bg-card shadow-elevated flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 rounded-full bg-card shadow-elevated flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mini Reviews Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4">
          {reviews.map((review, index) => (
            <button
              key={review.name}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentIndex(index);
              }}
              className={`p-4 rounded-xl transition-all duration-300 ${
                index === currentIndex
                  ? "glass-card ring-2 ring-primary"
                  : "bg-muted/50 hover:bg-muted"
              }`}
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-12 h-12 rounded-full mx-auto mb-2 object-cover"
              />
              <p className="text-sm font-medium truncate">{review.name}</p>
              <p className="text-xs text-muted-foreground truncate">{review.role}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
