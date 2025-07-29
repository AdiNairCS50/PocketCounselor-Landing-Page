import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Typewriter from "../shared/Typewriter";
import "../../styles/components/landing/HeroSection.scss";
import "../../styles/components/shared/Typewriter.scss";

interface HeroSectionProps {
  onGetStarted?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    }
  };

  return (
    <section className="hero-section" id="hero">
      {/* Background gradient */}
      <div className="bg-gradient-overlay animate-fade-in"></div>

      {/* Abstract shapes */}
      <div className="abstract-shapes-overlay">
        <div className="shape-top-left animate-fade-in animation-delay-100"></div>
        <div className="shape-bottom-right animate-fade-in animation-delay-200"></div>
        <div className="shape-center animate-fade-in animation-delay-300"></div>
      </div>

      <div className="hero-container">
        <div className="content-box">
          <div className="hero-badge animate-fade-in-up">
            <Sparkles size={16} className="hero-badge__sparkles" />
            AI-powered
          </div>
          <h1 className="hero-title">
            <Typewriter
              text="Your Counselor in Your Pocket"
              speed={80}
              delay={500}
              className="typewriter-text"
            />
          </h1>
          <p className="hero-description animate-fade-in-up animation-delay-200">
            Your one stop solution for all your high school needs. Find
            AI-powered and enhanced opportunities, and much more!
          </p>
          <div className="hero-buttons animate-fade-in-up animation-delay-400">
            <button className="btn-primary" onClick={handleGetStarted}>
              Join Waitlist
              <ArrowRight className="arrow-icon" />
            </button>
            <a href="#features" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator animate-fade-in-up animation-delay-600">
        <a href="#features" aria-label="Scroll to features section">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="scroll-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
