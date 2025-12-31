import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Trophy, 
  ClipboardList, 
  User,
  TrendingUp,
  Layers,
  PieChart,
  CheckSquare,
  Zap,
  ArrowDownRight,
  Crown,
  ChevronRight,
  X,
  Menu,
  BookOpen
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const sidebarLinks = [
  { 
    icon: LayoutDashboard, 
    label: "Dashboard", 
    href: "/dashboard/affiliate",
    description: "Overview & stats"
  },
  { 
    icon: Users, 
    label: "Learners/Students", 
    href: "/dashboard/learners",
    description: "Your referred users"
  },
  {
    label: "Income Reports",
    isHeader: true,
    children: [
      { icon: TrendingUp, label: "Direct Referral", href: "/dashboard/income/referral" },
      { icon: Layers, label: "Level Income", href: "/dashboard/income/level" },
      { icon: ArrowDownRight, label: "Spillover", href: "/dashboard/income/spillover" },
      { icon: PieChart, label: "Revenue Share", href: "/dashboard/income/revenue" },
      { icon: CheckSquare, label: "Task Income", href: "/dashboard/income/task" },
      { icon: Zap, label: "Auto Upgrade", href: "/dashboard/income/auto-upgrade" },
      { icon: Crown, label: "Royal Bonus", href: "/dashboard/income/royal" },
    ]
  },
  { 
    icon: Wallet, 
    label: "Wallet Management", 
    href: "/dashboard/wallet",
    description: "Withdraw & history"
  },
  { 
    icon: Trophy, 
    label: "Leaderboard", 
    href: "/dashboard/leaderboard",
    description: "Top earners"
  },
  { 
    icon: ClipboardList, 
    label: "Tasks", 
    href: "/dashboard/tasks",
    description: "Earn by completing"
  },
  { 
    icon: BookOpen, 
    label: "Submit Your Course", 
    href: "/dashboard/submit-course",
    description: "Become a creator"
  },
  { 
    icon: User, 
    label: "Profile", 
    href: "/dashboard/profile",
    description: "Manage account"
  },
];

interface AffiliateSidebarProps {
  children: React.ReactNode;
}

const AffiliateSidebar = ({ children }: AffiliateSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("Income Reports");
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const isIncomeActive = () => location.pathname.includes("/dashboard/income/");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-card/95 backdrop-blur-xl border-r border-border z-50
        transform transition-transform duration-300 ease-in-out overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Skill Honors" className="h-10 w-auto drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]" />
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((item, index) => {
            if ('isHeader' in item && item.isHeader) {
              return (
                <div key={index} className="pt-4">
                  <button
                    onClick={() => setExpandedSection(expandedSection === item.label ? null : item.label)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isIncomeActive() ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${expandedSection === item.label ? 'rotate-90' : ''}`} />
                  </button>
                  
                  {expandedSection === item.label && item.children && (
                    <div className="mt-1 ml-3 space-y-1 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                            isActive(child.href)
                              ? 'bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20'
                              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          <child.icon className="w-4 h-4" />
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                to={item.href!}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive(item.href!)
                    ? 'bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {'icon' in item && item.icon && <item.icon className="w-5 h-5" />}
                <div className="flex-1">
                  <span className="block">{item.label}</span>
                  {'description' in item && item.description && (
                    <span className={`text-xs ${isActive(item.href!) ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {item.description}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="p-4 mt-auto border-t border-border">
          <div className="glass-card p-4 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5">
            <p className="text-xs text-muted-foreground mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-gradient-gold">₹45,000</p>
            <Button variant="outline" size="sm" className="w-full mt-3" asChild>
              <Link to="/dashboard/wallet">Withdraw Now</Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <Link to="/">
              <img src={logo} alt="Skill Honors" className="h-8 w-auto" />
            </Link>
            <Link to="/dashboard/profile">
              <div className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">J</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AffiliateSidebar;
