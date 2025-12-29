import { useState } from "react";
import { 
  ClipboardList, 
  MessageCircle, 
  Download, 
  Gift,
  Play,
  Upload,
  CheckCircle2,
  Clock,
  ExternalLink,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AffiliateSidebar from "@/components/layout/AffiliateSidebar";

const whatsappTasks = [
  { id: "WA001", title: "Share Daily Promotional Video", reward: 25, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", status: "available" },
  { id: "WA002", title: "Post Success Story", reward: 50, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", status: "completed" },
  { id: "WA003", title: "Share Referral Offer Video", reward: 30, videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", status: "pending" },
];

const appTasks = [
  { id: "APP001", title: "Install Trading App", reward: 100, appLink: "https://play.google.com/store", instructions: "Install the app and register with your phone number", status: "available" },
  { id: "APP002", title: "Download Learning App", reward: 75, appLink: "https://play.google.com/store", instructions: "Install and complete the first lesson", status: "available" },
];

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState<"whatsapp" | "app" | "bonus">("whatsapp");
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Bonus form
  const [bonusForm, setBonusForm] = useState({
    userId: "3T123456",
    name: "John Doe",
    mobile: "",
    description: "",
    file: null as File | null,
  });
  
  const { toast } = useToast();

  const handleTaskSubmit = async (taskId: string) => {
    if (!uploadedFile) {
      toast({ title: "Error", description: "Please upload a screenshot", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSelectedTask(null);
    setUploadedFile(null);
    
    toast({ 
      title: "Task Submitted!", 
      description: "Your submission is under review. Reward will be credited upon approval." 
    });
  };

  const handleBonusSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    
    toast({ 
      title: "Application Submitted!", 
      description: "We'll review your submission and credit the reward if approved." 
    });
    setBonusForm({ ...bonusForm, mobile: "", description: "", file: null });
  };

  return (
    <AffiliateSidebar>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="glass-card p-6 rounded-3xl mb-6 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-gold-dark flex items-center justify-center shadow-lg">
              <ClipboardList className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold font-display">Tasks</h1>
              <p className="text-muted-foreground">Complete tasks to earn extra income</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button 
            variant={activeTab === "whatsapp" ? "hero" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("whatsapp")}
            className="gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Tasks
          </Button>
          <Button 
            variant={activeTab === "app" ? "hero" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("app")}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            App Tasks
          </Button>
          <Button 
            variant={activeTab === "bonus" ? "hero" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("bonus")}
            className="gap-2"
          >
            <Gift className="w-4 h-4" />
            More Income
          </Button>
        </div>

        {/* WhatsApp Tasks */}
        {activeTab === "whatsapp" && (
          <div className="space-y-4">
            <div className="bg-emerald/10 border border-emerald/20 rounded-xl p-4 mb-6">
              <p className="text-sm">
                <strong>How it works:</strong> Watch the video, share it on your WhatsApp status, take a screenshot showing views, and submit for approval.
              </p>
            </div>
            
            {whatsappTasks.map((task) => (
              <div key={task.id} className="glass-card p-5 rounded-2xl">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      task.status === 'completed' ? 'bg-emerald/10' :
                      task.status === 'pending' ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      {task.status === 'completed' ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald" />
                      ) : task.status === 'pending' ? (
                        <Clock className="w-6 h-6 text-primary" />
                      ) : (
                        <MessageCircle className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">Reward: <span className="text-emerald font-medium">₹{task.reward}</span></p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full md:w-auto">
                    {task.status === 'available' && (
                      <>
                        <Button variant="outline" size="sm" className="flex-1 md:flex-initial" asChild>
                          <a href={task.videoUrl} target="_blank" rel="noopener noreferrer">
                            <Play className="w-4 h-4 mr-1" />
                            Watch
                          </a>
                        </Button>
                        <Button variant="hero" size="sm" className="flex-1 md:flex-initial" onClick={() => setSelectedTask(task.id)}>
                          <Upload className="w-4 h-4 mr-1" />
                          Submit
                        </Button>
                      </>
                    )}
                    {task.status === 'pending' && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">Under Review</span>
                    )}
                    {task.status === 'completed' && (
                      <span className="px-3 py-1 bg-emerald/10 text-emerald rounded-full text-sm font-medium">Completed ✓</span>
                    )}
                  </div>
                </div>

                {/* Upload Section */}
                {selectedTask === task.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <Label className="text-sm font-medium mb-2 block">Upload Screenshot</Label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                          className="hidden"
                          id={`upload-${task.id}`}
                        />
                        <label
                          htmlFor={`upload-${task.id}`}
                          className="flex items-center justify-center gap-2 h-10 px-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors"
                        >
                          <Upload className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {uploadedFile ? uploadedFile.name : "Choose file"}
                          </span>
                        </label>
                      </div>
                      <Button 
                        variant="hero" 
                        onClick={() => handleTaskSubmit(task.id)}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* App Tasks */}
        {activeTab === "app" && (
          <div className="space-y-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
              <p className="text-sm">
                <strong>How it works:</strong> Install the app using our link, complete the required action, take a screenshot, and submit for verification.
              </p>
            </div>
            
            {appTasks.map((task) => (
              <div key={task.id} className="glass-card p-5 rounded-2xl">
                <div className="flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Download className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-bold">{task.title}</h3>
                        <p className="text-sm text-muted-foreground">Reward: <span className="text-emerald font-medium">₹{task.reward}</span></p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {task.instructions}
                  </p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" asChild>
                      <a href={task.appLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open App Store
                      </a>
                    </Button>
                    <Button variant="hero" size="sm" className="flex-1" onClick={() => setSelectedTask(task.id)}>
                      <Upload className="w-4 h-4 mr-1" />
                      Submit Proof
                    </Button>
                  </div>
                  
                  {/* Upload Section */}
                  {selectedTask === task.id && (
                    <div className="pt-4 border-t border-border">
                      <Label className="text-sm font-medium mb-2 block">Upload Proof Screenshot</Label>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                            className="hidden"
                            id={`upload-${task.id}`}
                          />
                          <label
                            htmlFor={`upload-${task.id}`}
                            className="flex items-center justify-center gap-2 h-10 px-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors"
                          >
                            <Upload className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {uploadedFile ? uploadedFile.name : "Choose file"}
                            </span>
                          </label>
                        </div>
                        <Button 
                          variant="hero" 
                          onClick={() => handleTaskSubmit(task.id)}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* More Income / Bonus Tasks */}
        {activeTab === "bonus" && (
          <div className="glass-card p-6 rounded-3xl">
            <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-primary" />
              Apply for Bonus Income
            </h2>
            <p className="text-muted-foreground mb-6">
              Complete special offers and submit your application for additional income opportunities.
            </p>
            
            <form onSubmit={handleBonusSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">User ID</Label>
                  <Input value={bonusForm.userId} disabled className="bg-muted" />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Full Name</Label>
                  <Input value={bonusForm.name} disabled className="bg-muted" />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Mobile Number *</Label>
                <Input
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={bonusForm.mobile}
                  onChange={(e) => setBonusForm({ ...bonusForm, mobile: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Describe Task Completion *</Label>
                <Textarea
                  placeholder="Explain what task you completed and provide any relevant details..."
                  value={bonusForm.description}
                  onChange={(e) => setBonusForm({ ...bonusForm, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Upload Proof</Label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setBonusForm({ ...bonusForm, file: e.target.files?.[0] || null })}
                  className="hidden"
                  id="bonus-upload"
                />
                <label
                  htmlFor="bonus-upload"
                  className="flex items-center justify-center gap-2 h-24 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {bonusForm.file ? bonusForm.file.name : "Click to upload screenshot or document"}
                  </span>
                </label>
              </div>
              
              <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </AffiliateSidebar>
  );
};

export default TasksPage;
