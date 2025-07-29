import React, { useEffect, useRef, useState } from "react";
import "../../styles/components/landing/AppDemoSection.scss";

const AppDemoSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="app-demo-section" id="demo" ref={sectionRef}>
      <div className="content-container">
        <div className="section-header">
          <h2
            className={`section-header__title ${
              isVisible ? "animate-fade-in-up" : ""
            }`}
          >
            See PocketCounselor in Action
          </h2>
          <p
            className={`section-header__description ${
              isVisible ? "animate-fade-in-up animation-delay-200" : ""
            }`}
          >
            PocketCounselor is cross-platform and available on the web, iOS, and
            Android devices. Watch the demo video below to see how it works!
          </p>
        </div>

        <div
          className={`iphone-mockup ${
            isVisible ? "animate-fade-in-up animation-delay-400" : ""
          }`}
        >
          <div className="iphone-mockup__notch"></div>
          <div className="iphone-mockup__screen">
            <div className="video-container">
              <iframe
                className="demo-video"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&modestbranding=1"
                title="App Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDemoSection;
