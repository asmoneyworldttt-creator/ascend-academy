import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdminCheck } from "@/hooks/useAdminCheck";
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
  const [isDark, setIsDark] = useState(true);
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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
      if (!savedTheme) localStorage.setItem("theme", "dark");
    }
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

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

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
            {/* Logo with professional glow for light mode visibility */}
            <Link to="/" className="flex items-center gap-2 group relative">
              {/* Professional glow background for light mode */}
              <div className={`absolute -inset-2 rounded-xl transition-all duration-500 ${
                isDark 
                  ? 'opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-lg' 
                  : 'opacity-100 bg-gradient-to-br from-amber-100/80 via-yellow-50/60 to-orange-100/50 shadow-[0_0_30px_rgba(251,191,36,0.3)]'
              }`} />
              <img
                src={logo}
                alt="Skill Learners"
                className="relative h-14 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(251,191,36,0.4)]"
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
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5 text-secondary-foreground" />
                )}
              </button>
              
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
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-muted/50"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-primary" />
                ) : (
                  <Moon className="w-5 h-5 text-secondary-foreground" />
                )}
              </button>
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

      {/* Mobile Menu Overlay - Full Screen */}
      <div
        className={`lg:hidden fixed inset-0 z-[55] transition-all duration-500 ease-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/95 backdrop-blur-xl transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Content */}
        <div 
          className={`relative h-full flex flex-col pt-24 px-6 pb-8 transition-all duration-500 ease-out ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          {/* Navigation Links */}
          <nav className="flex-1 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-2xl font-semibold text-foreground/90 hover:text-primary py-4 border-b border-border/30 transition-all duration-300 hover:pl-2"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? 'slideInRight 0.4s ease-out forwards' : 'none'
                }}
              >
                {link.name}
              </button>
            ))}
          </nav>
          
          {/* Action Buttons - Register/Login for public, Dashboard for logged in */}
          <div className="space-y-4 pt-6">
            {user ? (
              <Link to="/user-home" onClick={() => setIsOpen(false)} className="block">
                <Button variant="hero" className="w-full h-14 text-lg">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                  <Button variant="outline" className="w-full h-14 text-lg border-primary/30">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="block">
                  <Button variant="hero" className="w-full h-14 text-lg">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;