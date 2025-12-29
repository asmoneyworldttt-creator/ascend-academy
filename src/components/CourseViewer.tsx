import { useState } from "react";
import { 
  X, 
  Play, 
  Pause, 
  CheckCircle, 
  ChevronRight, 
  Clock, 
  Award,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  links?: { label: string; url: string }[];
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  episodes: Episode[];
}

interface CourseViewerProps {
  course: Course;
  onClose: () => void;
  onComplete: (courseId: string) => void;
}

const CourseViewer = ({ course, onClose, onComplete }: CourseViewerProps) => {
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [completedEpisodes, setCompletedEpisodes] = useState<Set<string>>(
    new Set(course.episodes.filter(e => e.completed).map(e => e.id))
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const episode = course.episodes[currentEpisode];
  const progress = Math.round((completedEpisodes.size / course.episodes.length) * 100);
  const allCompleted = completedEpisodes.size === course.episodes.length;

  const markComplete = () => {
    const newCompleted = new Set(completedEpisodes);
    newCompleted.add(episode.id);
    setCompletedEpisodes(newCompleted);

    // Auto-advance to next episode if available
    if (currentEpisode < course.episodes.length - 1) {
      setTimeout(() => setCurrentEpisode(currentEpisode + 1), 1000);
    }
  };

  const handleCompleteAll = () => {
    onComplete(course.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-lg line-clamp-1">{course.title}</h1>
              <p className="text-xs text-muted-foreground">Episode {currentEpisode + 1} of {course.episodes.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="font-bold text-primary">{progress}%</p>
            </div>
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden hidden sm:block">
              <div 
                className="h-full bg-gradient-gold rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="relative bg-secondary aspect-video w-full max-h-[60vh]">
            <video 
              src={episode.videoUrl}
              className="w-full h-full object-contain"
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={markComplete}
            />
          </div>

          {/* Episode Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold font-display mb-2">{episode.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {episode.duration}
                    </span>
                    {completedEpisodes.has(episode.id) && (
                      <span className="flex items-center gap-1 text-emerald">
                        <CheckCircle className="w-4 h-4" />
                        Completed
                      </span>
                    )}
                  </div>
                </div>
                {!completedEpisodes.has(episode.id) && (
                  <Button variant="hero" onClick={markComplete}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{episode.description}</p>

              {/* Resources/Links */}
              {episode.links && episode.links.length > 0 && (
                <div className="glass-card p-4 rounded-xl">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Resources & Links
                  </h3>
                  <div className="space-y-2">
                    {episode.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                      >
                        <span className="font-medium text-sm">{link.label}</span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete Course CTA */}
              {allCompleted && (
                <div className="mt-6 glass-card p-6 rounded-2xl text-center border-2 border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10">
                  <Award className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-bold font-display mb-2">Congratulations! 🎉</h3>
                  <p className="text-muted-foreground mb-4">You've completed all episodes in this course!</p>
                  <Button variant="hero" onClick={handleCompleteAll}>
                    <Award className="w-4 h-4 mr-2" />
                    Take Assessment & Get Certificate
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Episode List Sidebar */}
        <div className="hidden lg:block w-80 border-l border-border bg-card overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold">Course Content</h3>
            <p className="text-xs text-muted-foreground">{completedEpisodes.size}/{course.episodes.length} completed</p>
          </div>
          <div className="p-2">
            {course.episodes.map((ep, idx) => {
              const isCompleted = completedEpisodes.has(ep.id);
              const isCurrent = idx === currentEpisode;
              return (
                <button
                  key={ep.id}
                  onClick={() => setCurrentEpisode(idx)}
                  className={`w-full text-left p-3 rounded-xl mb-1 transition-colors ${
                    isCurrent 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isCompleted 
                        ? 'bg-emerald/10 text-emerald' 
                        : isCurrent 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : isCurrent ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <span className="text-sm font-medium">{idx + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm line-clamp-2 ${isCurrent ? 'text-primary' : ''}`}>
                        {ep.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{ep.duration}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
