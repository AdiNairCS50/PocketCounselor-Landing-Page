import React from "react";
import "../../styles/components/landing/AppDemoSection.scss";

const AppDemoSection: React.FC = () => {
  return (
    <section className="app-demo-section" id="demo">
      <div className="content-container">
        <div className="section-header">
          <h2 className="section-header__title">
            See PocketCounselor in Action
          </h2>
          <p className="section-header__description">
            PocketCounselor is cross-platform and available on the web, iOS, and Android devices. Watch the demo video below to see how it works!
          </p>
        </div>

        <div className="iphone-mockup">
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