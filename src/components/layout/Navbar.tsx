import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Plans", href: "/#plans" },
  { name: "Courses", href: "/#courses" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { isAdmin } = useAdminCheck();

  // Check if on index page (public)
  const isIndexPage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Check current theme for logo styling
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains("dark");

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#")) {
      const id = href.substring(2);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-card/90 backdrop-blur-xl shadow-lg border-b border-border/50"
            : "bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Clean minimal design */}
            <Link to="/" className="flex items-center gap-2 group relative">
              {/* Subtle shadow for visibility in light mode */}
              <img
                src={logo}
                alt="Skill Learners"
                className={`relative h-12 md:h-14 w-auto transition-all duration-300 group-hover:scale-105 ${
                  isDark 
                    ? 'drop-shadow-[0_2px_12px_rgba(251,191,36,0.5)]' 
                    : 'drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] filter brightness-105'
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-foreground/80 hover:text-foreground font-medium transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Actions - Different for index vs logged in pages */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle variant="icon" />
              
              {/* Only show Admin button if user is admin AND not on index page */}
              {isAdmin && !isIndexPage && (
                <Link to="/admin">
                  <Button variant="outline" size="default" className="gap-2 border-red-500/30 text-red-500 hover:bg-red-500/10">
                    <Shield className="w-4 h-4" />
                    Admin
                  </Button>
                </Link>
              )}
              
              {user ? (
                <Link to="/user-home">
                  <Button variant="hero" size="default">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="default" className="border-primary/30 hover:bg-primary/10">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="hero" size="default">
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <ThemeToggle variant="icon" />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-foreground relative z-[60]"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Top-down dropdown */}
      <div
        className={`lg:hidden fixed left-0 right-0 top-20 z-[55] transition-all duration-400 ease-out origin-top ${
          isOpen 
            ? "opacity-100 visible scale-y-100 translate-y-0" 
            : "opacity-0 invisible scale-y-95 -translate-y-2"
        }`}
      >
        {/* Menu Content - Compact dropdown */}
        <div className="mx-4 rounded-xl bg-card/98 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden">
          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 px-3 py-2.5 rounded-lg transition-all duration-200"
                style={{ 
                  animationDelay: `${index * 30}ms`,
                  animation: isOpen ? 'fadeSlideDown 0.3s ease-out forwards' : 'none'
                }}
              >
                {link.name}
              </button>
            ))}
          </nav>
          
          {/* Divider */}
          <div className="h-px bg-border/50 mx-3" />
          
          {/* Action Buttons - Compact */}
          <div className="p-3 flex gap-2">
            {user ? (
              <Link to="/user-home" onClick={() => setIsOpen(false)} className="flex-1">
                <Button variant="hero" size="sm" className="w-full">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full border-primary/30">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button variant="hero" size="sm" className="w-full">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Backdrop */}
        <div 
          className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </>
  );
};

export default Navbar;