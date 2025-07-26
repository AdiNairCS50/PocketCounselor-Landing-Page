import React, { useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";
import Header from "./components/shared/Header";
import HeroSection from "./components/landing/HeroSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import ContactSection from "./components/landing/ContactSection";
import FooterSection from "./components/landing/FooterSection";

import "./styles/LandingPage.scss";

interface LandingPageProps {
  onGetStarted?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  useEffect(() => {
    document.title = "PocketCounselor - Expert Guidance in Your Pocket";

    console.log(
      "🔧 LandingPage: Applying scrolling fix (Ionic version - simplified)..."
    );

    const oldScrollFixStyle = document.getElementById(
      "landing-page-scroll-fix"
    );
    if (oldScrollFixStyle) {
      oldScrollFixStyle.remove();
    }

    document.body.style.position = "static";

    console.log("✅ LandingPage: Body position set to static.");

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
      document.body.style.removeProperty("position");

      document.removeEventListener("click", handleAnchorClick);
      console.log(
        "🔄 LandingPage: Scrolling fix cleanup (Ionic version - simplified)"
      );
    };
  }, []);

  return (
    <IonPage id="landing-page-ionic">
      <IonContent fullscreen scrollY={true} className="landing-page-content">
        <Header onGetStarted={onGetStarted} />
        <main>
          <HeroSection onGetStarted={onGetStarted} />
          <FeaturesSection />
          <ContactSection />
        </main>
        <FooterSection />
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
