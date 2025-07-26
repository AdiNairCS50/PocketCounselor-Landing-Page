import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import "../../styles/components/shared/Header.scss";
// Logo is served from public folder
const logoUrl = "/images/PC-WhiteBackground.png";

interface HeaderProps {
  onGetStarted?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleGetStarted = () => {
    setIsMenuOpen(false);
    if (onGetStarted) {
      onGetStarted();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    // Set initial state based on the class on <html>
    setIsDarkMode(root.classList.contains("dark"));

    // Observe class changes on the root element (<html>)
    const observer = new MutationObserver(() => {
      setIsDarkMode(root.classList.contains("dark"));
    });

    // Start observing
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  const handleLogoError = () => {
    setLogoError(true);
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <div className="header-inner">
          {/* Logo */}
          <a href="#hero" className="header-logo">
            <div className="header-logo__icon">
              {!logoError ? (
                <img
                  src={logoUrl}
                  alt="PC"
                  className="header-logo__image"
                  onError={handleLogoError}
                />
              ) : (
                <span className="header-logo__fallback">PC</span>
              )}
            </div>
            <span
              className={`header-logo__text ${
                isDarkMode ? "text-color-white" : "text-color-gray-900"
              }`}
            >
              PocketCounselor
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`${
                  isDarkMode
                    ? "text-color-white-90 hover-text-white"
                    : "text-color-gray-900 hover-text-purple-600"
                }`}
              >
                {link.name}
              </a>
            ))}
            <ThemeToggle />
            <button
              className={`btn-desktop-primary ${
                !isDarkMode ? "text-color-gray-900" : ""
              }`}
              onClick={handleGetStarted}
            >
              Join Waitlist
            </button>
          </nav>

          {/* Mobile menu button and theme toggle */}
          <div className="mobile-menu-toggle">
            <ThemeToggle />
            <button
              className={`menu-toggle-btn ${
                isDarkMode ? "text-color-white" : "text-color-gray-900"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="icon" /> : <Menu className="icon" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <nav className="mobile-nav__links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              className={`btn-mobile-primary ${
                !isDarkMode ? "text-color-gray-900" : ""
              }`}
              onClick={handleGetStarted}
            >
              Join Waitlist
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
