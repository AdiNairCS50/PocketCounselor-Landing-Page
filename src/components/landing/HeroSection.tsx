import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Typewriter from "../shared/Typewriter";
import "../../styles/components/landing/HeroSection.scss";
import "../../styles/components/shared/Typewriter.scss";

interface HeroSectionProps {
  onGetStarted?: () => void;
  onTypingComplete?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onTypingComplete,
}) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
    if (onTypingComplete) {
      onTypingComplete();
    }
  };

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
        <div className="content-box animate-fade-in-up">
          <div
            className={`hero-badge ${
              isTypingComplete ? "animate-fade-in-up animation-delay-800" : ""
            }`}
          >
            <Sparkles size={16} className="hero-badge__sparkles" />
            Limited Early Access
          </div>
          <h1 className="hero-title">
            <Typewriter
              text="Your Future Starts Here"
              speed={80}
              delay={1000}
              className="typewriter-text"
              onComplete={handleTypingComplete}
              highlightWord="Here"
            />
          </h1>
          <p
            className={`hero-description ${
              isTypingComplete ? "animate-fade-in-up animation-delay-1500" : ""
            }`}
          >
            Find AI-powered opportunities and resources tailored to you.
            <br />
            No more guesswork. No more wasted time. Just results.
          </p>
          <div className="hero-buttons">
            <a
              href="#features"
              className={`btn-secondary ${
                isTypingComplete
                  ? "animate-fade-in-up animation-delay-2000"
                  : ""
              }`}
            >
              Why PocketCounselor?
            </a>
            <button
              className={`btn-primary ${
                isTypingComplete
                  ? "animate-fade-in-up animation-delay-2500"
                  : ""
              }`}
              onClick={handleGetStarted}
            >
              Start Now
              <ArrowRight className="arrow-icon" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`scroll-indicator ${
          isTypingComplete ? "animate-fade-in-up animation-delay-1400" : ""
        }`}
      >
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
