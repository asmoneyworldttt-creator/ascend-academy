import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, Play, Sparkles } from "lucide-react";
import { VerifiedBadge } from "@/components/ui/PremiumIcons";

const reviews = [
  {
    name: "Priya Sharma",
    role: "Digital Marketing Freelancer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    rating: 5,
    review: "SkillHonors completely transformed my career. Within 3 months of completing the Digital Marketing course, I landed my first freelance client and now earn more than my previous full-time job!",
    earnings: "₹45,000/month",
    course: "Digital Marketing Mastery",
    verified: true,
  },
  {
    name: "Rahul Verma",
    role: "E-commerce Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    rating: 5,
    review: "The E-commerce course gave me the confidence to start my own dropshipping business. The step-by-step guidance and community support were invaluable. Highly recommended!",
    earnings: "₹1.2L/month",
    course: "E-commerce & Dropshipping",
    verified: true,
  },
  {
    name: "Ananya Patel",
    role: "AI Content Creator",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    rating: 5,
    review: "The AI & Prompt Engineering course opened doors I never knew existed. I now help businesses automate their content creation and command premium rates for my services.",
    earnings: "₹60,000/month",
    course: "AI & Prompt Engineering",
    verified: true,
  },
  {
    name: "Vikram Singh",
    role: "Full-Stack Developer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    rating: 5,
    review: "Coming from a non-tech background, I was skeptical. But the Web Development Bootcamp is so well-structured that I went from zero to landing a remote job in just 6 months!",
    earnings: "₹80,000/month",
    course: "Web Development Bootcamp",
    verified: true,
  },
  {
    name: "Meera Krishnan",
    role: "Crypto Investor & Educator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    rating: 5,
    review: "The Cryptocurrency course helped me understand the market properly. I not only invested wisely but now also teach others through my YouTube channel that I monetized!",
    earnings: "₹35,000/month",
    course: "Cryptocurrency Fundamentals",
    verified: true,
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 text-sm font-medium text-emerald mb-6">
            <BadgeCheck className="w-4 h-4" />
            Verified Success Stories
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold font-display mb-4">
            Success <span className="text-gradient-gold">Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real students, real transformations. See how SkillHonors has changed lives.
          </p>
        </div>

        {/* Mobile Cards - Enhanced Swipeable */}
        <div className="lg:hidden" ref={scrollRef}>
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
            {reviews.map((review, index) => (
              <div
                key={review.name}
                className="snap-center flex-shrink-0 w-[85vw] max-w-[350px]"
              >
                <div className="glass-card p-6 rounded-2xl h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30"
                      />
                      {review.verified && (
                        <div className="absolute -bottom-1 -right-1">
                          <VerifiedBadge className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{review.name}</h4>
                      <p className="text-muted-foreground text-xs">{review.role}</p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <Quote className="w-8 h-8 text-primary/20 mb-2" />
                  <p className="text-foreground leading-relaxed text-sm flex-1 mb-4">
                    "{review.review}"
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass-card p-3 rounded-xl bg-muted/30">
                      <p className="text-xs text-muted-foreground mb-0.5">Course</p>
                      <p className="text-xs font-semibold text-foreground line-clamp-1">{review.course}</p>
                    </div>
                    <div className="glass-card p-3 rounded-xl bg-emerald/10 border border-emerald/20">
                      <p className="text-xs text-muted-foreground mb-0.5">Earnings</p>
                      <p className="text-lg font-bold text-emerald">{review.earnings}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Dots */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {reviews.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-primary"
                    : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            ← Swipe to see more stories →
          </p>
        </div>

        {/* Desktop Slider */}
        <div className="hidden lg:block relative">
          <div className="grid lg:grid-cols-5 gap-6 mb-8">
            {reviews.map((review, index) => {
              const isCurrent = index === currentIndex;
              
              return (
                <button
                  key={review.name}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`relative group transition-all duration-500 ${
                    isCurrent 
                      ? 'lg:col-span-3 z-20' 
                      : 'lg:col-span-1 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div 
                    className={`glass-card rounded-3xl overflow-hidden transition-all duration-500 ${
                      isCurrent 
                        ? 'shadow-elevated ring-2 ring-primary/30' 
                        : 'hover:shadow-lg'
                    }`}
                  >
                    {isCurrent ? (
                      <div className="p-8">
                        <Quote className="w-10 h-10 text-primary/30 mb-4" />
                        
                        <p className="text-lg lg:text-xl text-foreground leading-relaxed mb-6">
                          "{review.review}"
                        </p>

                        <div className="flex items-center justify-between flex-wrap gap-6">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img
                                src={review.avatar}
                                alt={review.name}
                                className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
                              />
                              {review.verified && (
                                <div className="absolute -bottom-1 -right-1">
                                  <VerifiedBadge className="w-6 h-6" />
                                </div>
                              )}
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-lg">{review.name}</h4>
                              <p className="text-muted-foreground text-sm">{review.role}</p>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="glass-card px-4 py-2 rounded-xl text-left">
                              <p className="text-xs text-muted-foreground">Course</p>
                              <p className="text-sm font-medium text-foreground">{review.course}</p>
                            </div>
                            <div className="glass-card px-4 py-2 rounded-xl bg-emerald/10 border border-emerald/20">
                              <p className="text-xs text-muted-foreground">Earnings</p>
                              <p className="text-lg font-bold text-emerald">{review.earnings}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 h-full flex flex-col items-center justify-center text-center min-h-[200px]">
                        <div className="relative mb-3">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-14 h-14 rounded-full object-cover ring-2 ring-muted"
                          />
                          {review.verified && (
                            <div className="absolute -bottom-1 -right-1">
                              <VerifiedBadge className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <p className="font-medium text-sm mb-1">{review.name}</p>
                        <div className="flex items-center gap-0.5 mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                          ))}
                        </div>
                        <p className="text-xs text-emerald font-bold">{review.earnings}</p>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors border border-border"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
