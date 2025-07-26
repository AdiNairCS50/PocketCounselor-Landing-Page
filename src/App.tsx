import React, { useState } from "react";
import LandingPage from "./LandingPage";
import WaitlistModal from "./components/WaitlistModal";

// Import global styles
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/ionic-minimal.css";

const App: React.FC = () => {
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  const handleOpenWaitlist = () => {
    setIsWaitlistModalOpen(true);
  };

  const handleCloseWaitlist = () => {
    setIsWaitlistModalOpen(false);
  };

  return (
    <div className="App">
      <LandingPage onGetStarted={handleOpenWaitlist} />
      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={handleCloseWaitlist}
      />
    </div>
  );
};

export default App;
