import React, { useEffect, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import Header from "./components/shared/Header";
import HeroSection from "./components/landing/HeroSection";
import FeaturesSection from "./components/landing/FeaturesSection";
// import AppDemoSection from "./components/landing/AppDemoSection";
// import TestimonialsSection from "./components/landing/TestimonialsSection";
import ContactSection from "./components/landing/ContactSection";
import FooterSection from "./components/landing/FooterSection";
import "./styles/LandingPage.scss";
import "./styles/LandingPageAnimations.css";

interface LandingPageProps {
  onGetStarted?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };
  useEffect(() => {
    // Store original title to restore later
    const originalTitle = document.title;
    document.title = "PocketCounselor";

    const oldScrollFixStyle = document.getElementById(
      "landing-page-scroll-fix"
    );
    if (oldScrollFixStyle) {
      oldScrollFixStyle.remove();
    }

    // Store original body position to restore later
    const originalBodyPosition = document.body.style.position;
    document.body.style.position = "static";

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.hash && anchor.hash.startsWith("#")) {
        e.preventDefault();
        const targetId = anchor.hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const ionContentElement = targetElement.closest(
            "ion-content"
          ) as HTMLIonContentElement | null;
          if (ionContentElement) {
            ionContentElement.scrollToPoint(
              0,
              targetElement.offsetTop - 80,
              500
            );
          } else {
            window.scrollTo({
              top:
                targetElement.getBoundingClientRect().top + window.scrollY - 80,
              behavior: "smooth",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      // Restore original title and body position
      document.title = originalTitle;
      document.body.style.position = originalBodyPosition || "";

      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <IonPage id="landing-page-ionic" className="landing-page">
      <IonContent fullscreen scrollY={true} className="landing-page-content">
        <Header
          onGetStarted={onGetStarted}
          isTypingComplete={isTypingComplete}
        />
        <main>
          <HeroSection
            onGetStarted={onGetStarted}
            onTypingComplete={handleTypingComplete}
          />
          <FeaturesSection />
          {/* <AppDemoSection />
          <TestimonialsSection /> */}
          <ContactSection />
        </main>
        <FooterSection />
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
