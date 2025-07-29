import React, { useEffect, useRef, useState } from "react";
import { IonCard, IonCardContent } from "@ionic/react";
import {
  Building2Icon,
  UsersIcon,
  BriefcaseBusinessIcon,
  MailIcon,
} from "lucide-react";
import "../../styles/components/landing/FeaturesSection.scss";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible?: boolean;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  isVisible = false,
  delay = 0,
}) => {
  return (
    <IonCard
      className={`feature-card ${
        isVisible ? "feature-card--visible" : "feature-card--hidden"
      }`}
      style={{ animationDelay: `${delay}ms` }}
      button={false}
    >
      <div className="feature-card__icon">{icon}</div>
      <IonCardContent>
        <h3 className="feature-card__title">{title}</h3>
        <p className="feature-card__desc">{description}</p>
      </IonCardContent>
    </IonCard>
  );
};

const FeaturesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      icon: <BriefcaseBusinessIcon size={32} />, // 2rem
      title: "Internships",
      description:
        "Discover internships perfectly matched to your background, interests, and career goals. Our AI analyzes thousands of opportunities to find your ideal fit.",
    },
    {
      icon: <UsersIcon size={32} />, // 2rem
      title: "Volunteer Opportunities",
      description:
        "Coming soon! Find volunteer opportunities that match your skills and interests. Make a positive impact while building your resume.",
    },
    {
      icon: <MailIcon size={32} />, // 2rem
      title: "Course Selections",
      description:
        "Coming soon! Get personalized AI-powered course recommendations based on your academic profile and career goals.",
    },
    {
      icon: <Building2Icon size={32} />, // 2rem
      title: "College Suggestions",
      description:
        "Coming soon! AI analyzes your academic data to predict optimal college matches and career paths that align with your unique potential.",
    },
  ];

  useEffect(() => {
    // Mobile-friendly settings
    const isMobile = window.innerWidth <= 768;
    const threshold = isMobile ? 0.2 : 0.4; // Lower threshold for mobile
    const rootMargin = isMobile ? "0px 0px -100px 0px" : "0px 0px -200px 0px"; // Less margin for mobile

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold, rootMargin }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback scroll listener for mobile
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.8; // Trigger when 80% down viewport

      if (rect.top < triggerPoint) {
        setIsVisible(true);
      }
    };

    if (isMobile) {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("touchmove", handleScroll);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (isMobile) {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("touchmove", handleScroll);
      }
    };
  }, []);

  return (
    <section className="features-section" id="features" ref={sectionRef}>
      <div className="features-container">
        <div className="features-header">
          <h2
            className={`features-header__title ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            Why Choose PocketCounselor?
          </h2>
          <p
            className={`features-header__description ${
              isVisible ? "animate-fade-in-up animation-delay-200" : ""
            }`}
          >
            Our AI-powered platform discovers and matches you with the perfect
            opportunities. No more endless searching - we find exactly what you
            need:
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              isVisible={isVisible}
              delay={index * 250} // Stagger animation by 250ms per card
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
